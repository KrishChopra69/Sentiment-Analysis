-- Create sentiment_analyses table to store analysis history
CREATE TABLE IF NOT EXISTS public.sentiment_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  sentiment VARCHAR(20) NOT NULL,
  score DECIMAL(5, 4) NOT NULL,
  positive_score DECIMAL(5, 4) NOT NULL,
  negative_score DECIMAL(5, 4) NOT NULL,
  neutral_score DECIMAL(5, 4) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.sentiment_analyses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read analyses (for public dashboard)
CREATE POLICY "Anyone can view sentiment analyses"
  ON public.sentiment_analyses
  FOR SELECT
  USING (true);

-- Create policy to allow anyone to insert analyses
CREATE POLICY "Anyone can create sentiment analyses"
  ON public.sentiment_analyses
  FOR INSERT
  WITH CHECK (true);

-- Create index for better query performance on created_at
CREATE INDEX idx_sentiment_analyses_created_at ON public.sentiment_analyses(created_at DESC);