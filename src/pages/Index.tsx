import React, { useState } from 'react';
import Header from '@/components/Header';
import AICharacter from '@/components/AICharacter';
import ConceptInput from '@/components/ConceptInput';
import ExplanationResult from '@/components/ExplanationResult';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState<{
    term: string;
    explanation: string;
    story: string;
  } | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (concept: string) => {
    setIsLoading(true);
    setSearchTerm(concept);

    try {
      // Make the API call to the backend
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ concept }),
      });

      if (!response.ok) {
        throw new Error('Backend error');
      }

      const data = await response.json();
      
      // Set the result with explanation and story from the backend
      setResult({
        term: concept,
        explanation: data.explanation,
        story: data.story,
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: 'Oops! Something went wrong',
        description: "We couldn't process your request. Please try again.",
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-start">
        <Header />
        
        <div className="w-full max-w-6xl mx-auto mt-8 flex flex-col items-center">
          <AICharacter isThinking={isLoading} className="mb-8" />
          
          <ConceptInput onSubmit={handleSubmit} isLoading={isLoading} />
          
          <div className="mt-16 w-full animate-fade-in">
            {result && !isLoading && (
              <ExplanationResult 
                term={result.term}
                explanation={result.explanation}
                story={result.story}
                className="mt-8"
              />
            )}
            
            {!result && !isLoading && (
              <div className="text-center p-8 bg-white/50 rounded-2xl shadow-soft max-w-2xl mx-auto">
                <p className="text-lg text-muted-foreground">
                  Enter a tech concept above to get a friendly explanation and story that makes it easy to understand!
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {['API', 'Algorithm', 'Cloud Computing'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSubmit(suggestion)}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <footer className="py-6 border-t border-purple-100 bg-white mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Curious Code Quests — Making tech concepts simple through stories</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
