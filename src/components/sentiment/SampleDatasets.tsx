import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sampleTexts = [
  {
    title: "Positive Product Review",
    text: "This product exceeded all my expectations! The quality is outstanding, and the customer service was incredibly helpful. I would definitely recommend this to anyone looking for a reliable solution. Best purchase I've made this year!",
  },
  {
    title: "Negative Customer Feedback",
    text: "Very disappointed with this service. The delivery was late, the product arrived damaged, and customer support was unresponsive. I will not be ordering from here again. Waste of money and time.",
  },
  {
    title: "Neutral News Article",
    text: "The company announced its quarterly results today, showing steady performance in most sectors. The CEO stated that they will continue to focus on operational efficiency while exploring new market opportunities. Analysts remain cautiously optimistic about future growth.",
  },
  {
    title: "Mixed Social Media Post",
    text: "The new update has some great features like the improved interface and faster loading times. However, I'm not a fan of the new layout and some bugs need to be fixed. Overall, it's okay but could be better.",
  },
];

export const SampleDatasets = () => {
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Sample text copied to clipboard",
    });
  };

  return (
    <Card className="mb-6 border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Sample Datasets
        </CardTitle>
        <CardDescription>
          Try these sample texts to see sentiment analysis in action
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleTexts.map((sample, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm">{sample.title}</h4>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleCopy(sample.text)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {sample.text}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};