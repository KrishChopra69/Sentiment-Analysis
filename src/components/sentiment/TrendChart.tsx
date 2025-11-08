import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface TrendChartProps {
  refreshTrigger: number;
}

export const TrendChart = ({ refreshTrigger }: TrendChartProps) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrendData = async () => {
      const { data, error } = await supabase
        .from('sentiment_analyses')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(20);

      if (error) {
        console.error('Error fetching trend data:', error);
        return;
      }

      const formattedData = data.map((item, index) => ({
        index: index + 1,
        time: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        score: parseFloat(String(item.score)),
        positive: parseFloat(String(item.positive_score)),
        negative: parseFloat(String(item.negative_score)),
        neutral: parseFloat(String(item.neutral_score)),
      }));

      setChartData(formattedData);
    };

    fetchTrendData();
  }, [refreshTrigger]);

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Sentiment Trends
        </CardTitle>
        <CardDescription>Recent sentiment analysis over time</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No trend data available yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis 
                dataKey="time" 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                domain={[-1, 1]}
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Overall Score"
                dot={{ fill: 'hsl(var(--primary))' }}
              />
              <Line 
                type="monotone" 
                dataKey="positive" 
                stroke="#22c55e" 
                strokeWidth={2}
                name="Positive"
                dot={{ fill: '#22c55e' }}
              />
              <Line 
                type="monotone" 
                dataKey="negative" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Negative"
                dot={{ fill: '#ef4444' }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};