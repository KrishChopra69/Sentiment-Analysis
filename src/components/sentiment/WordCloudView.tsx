import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud } from "lucide-react";
import { useMemo } from "react";

interface WordCloudViewProps {
  text: string;
}

export const WordCloudView = ({ text }: WordCloudViewProps) => {
  const wordData = useMemo(() => {
    // Remove common stop words
    const stopWords = new Set([
      'the', 'is', 'at', 'which', 'on', 'a', 'an', 'as', 'are', 'was', 'were',
      'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
      'would', 'could', 'should', 'may', 'might', 'must', 'can', 'of', 'to', 'in',
      'for', 'with', 'and', 'or', 'but', 'not', 'this', 'that', 'these', 'those',
      'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'who', 'when', 'where'
    ]);

    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.has(word));

    const frequency = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word, count]) => ({ word, count }));
  }, [text]);

  const maxCount = Math.max(...wordData.map(d => d.count), 1);

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          Word Cloud
        </CardTitle>
        <CardDescription>Most frequent words in the analyzed text</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 justify-center items-center min-h-[200px] p-4">
          {wordData.length === 0 ? (
            <p className="text-muted-foreground text-center">
              No significant words found
            </p>
          ) : (
            wordData.map(({ word, count }) => {
              const size = 12 + (count / maxCount) * 32;
              const opacity = 0.5 + (count / maxCount) * 0.5;
              
              return (
                <span
                  key={word}
                  className="font-bold text-primary transition-all hover:scale-110 cursor-default"
                  style={{
                    fontSize: `${size}px`,
                    opacity,
                  }}
                  title={`Appears ${count} time${count > 1 ? 's' : ''}`}
                >
                  {word}
                </span>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};