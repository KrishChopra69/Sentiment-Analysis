import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { History } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AnalysisHistoryProps {
  refreshTrigger: number;
}

export const AnalysisHistory = ({ refreshTrigger }: AnalysisHistoryProps) => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from('sentiment_analyses')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching history:', error);
        return;
      }

      setHistory(data || []);
    };

    fetchHistory();
  }, [refreshTrigger]);

  const getSentimentBadge = (sentiment: string) => {
    const variants: Record<string, "default" | "destructive" | "outline"> = {
      positive: "default",
      negative: "destructive",
      neutral: "outline",
    };

    return (
      <Badge variant={variants[sentiment] || "outline"} className="capitalize">
        {sentiment}
      </Badge>
    );
  };

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Analysis History
        </CardTitle>
        <CardDescription>Recent sentiment analysis results</CardDescription>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No analysis history yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Text</TableHead>
                  <TableHead className="text-center">Sentiment</TableHead>
                  <TableHead className="text-center">Score</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="max-w-md">
                      <p className="truncate">{item.text}</p>
                    </TableCell>
                    <TableCell className="text-center">
                      {getSentimentBadge(item.sentiment)}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {parseFloat(item.score).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {new Date(item.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};