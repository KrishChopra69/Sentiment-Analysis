import { useState } from "react";
import { AnalysisInput } from "@/components/sentiment/AnalysisInput";
import { SentimentScore } from "@/components/sentiment/SentimentScore";
import { WordCloudView } from "@/components/sentiment/WordCloudView";
import { TrendChart } from "@/components/sentiment/TrendChart";
import { AnalysisHistory } from "@/components/sentiment/AnalysisHistory";
import { SampleDatasets } from "@/components/sentiment/SampleDatasets";

export interface SentimentResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  positive_score: number;
  negative_score: number;
  neutral_score: number;
}

const Index = () => {
  const [currentResult, setCurrentResult] = useState<SentimentResult | null>(null);
  const [currentText, setCurrentText] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAnalysisComplete = (result: SentimentResult, text: string) => {
    setCurrentResult(result);
    setCurrentText(text);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Sentiment Analysis Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Analyze text sentiment with AI-powered insights, visualizations, and trends
          </p>
        </header>

        {/* Sample Datasets */}
        <SampleDatasets />

        {/* Input Section */}
        <AnalysisInput onAnalysisComplete={handleAnalysisComplete} />

        {/* Results Section */}
        {currentResult && (
          <div className="space-y-6 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sentiment Score */}
              <SentimentScore result={currentResult} />

              {/* Word Cloud */}
              <WordCloudView text={currentText} />
            </div>

            {/* Trend Chart */}
            <TrendChart refreshTrigger={refreshTrigger} />

            {/* Analysis History */}
            <AnalysisHistory refreshTrigger={refreshTrigger} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;