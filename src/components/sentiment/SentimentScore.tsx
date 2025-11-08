import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Smile, Frown, Minus } from "lucide-react";
import { SentimentResult } from "@/pages/Index";

interface SentimentScoreProps {
  result: SentimentResult;
}

export const SentimentScore = ({ result }: SentimentScoreProps) => {
  const getSentimentIcon = () => {
    switch (result.sentiment) {
      case 'positive':
        return <Smile className="h-8 w-8 text-green-500" />;
      case 'negative':
        return <Frown className="h-8 w-8 text-red-500" />;
      default:
        return <Minus className="h-8 w-8 text-gray-500" />;
    }
  };

  const getSentimentColor = () => {
    switch (result.sentiment) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getScoreColor = (score: number) => {
    if (score > 0.6) return 'bg-green-500';
    if (score < -0.6) return 'bg-red-500';
    return 'bg-gray-500';
  };

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle>Sentiment Score</CardTitle>
        <CardDescription>Overall sentiment analysis result</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Sentiment */}
        <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg">
          {getSentimentIcon()}
          <div>
            <p className="text-sm text-muted-foreground">Sentiment</p>
            <p className={`text-3xl font-bold capitalize ${getSentimentColor()}`}>
              {result.sentiment}
            </p>
          </div>
        </div>

        {/* Score Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Score</span>
            <span className="text-sm font-bold">{result.score.toFixed(2)}</span>
          </div>
          <div className="relative h-4 bg-secondary rounded-full overflow-hidden">
            <div
              className={`absolute h-full transition-all ${getScoreColor(result.score)}`}
              style={{ 
                width: `${Math.abs(result.score) * 100}%`,
                left: result.score < 0 ? 'auto' : '50%',
                right: result.score < 0 ? '50%' : 'auto',
              }}
            />
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border" />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Negative (-1)</span>
            <span>Neutral (0)</span>
            <span>Positive (+1)</span>
          </div>
        </div>

        {/* Detailed Scores */}
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Positive</span>
              <span className="font-medium">{(result.positive_score * 100).toFixed(1)}%</span>
            </div>
            <Progress value={result.positive_score * 100} className="h-2 bg-secondary [&>div]:bg-green-500" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Neutral</span>
              <span className="font-medium">{(result.neutral_score * 100).toFixed(1)}%</span>
            </div>
            <Progress value={result.neutral_score * 100} className="h-2 bg-secondary [&>div]:bg-gray-500" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Negative</span>
              <span className="font-medium">{(result.negative_score * 100).toFixed(1)}%</span>
            </div>
            <Progress value={result.negative_score * 100} className="h-2 bg-secondary [&>div]:bg-red-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};