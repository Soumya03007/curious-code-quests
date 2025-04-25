
import React, { useState } from 'react';
import Header from '@/components/Header';
import AICharacter from '@/components/AICharacter';
import ConceptInput from '@/components/ConceptInput';
import ExplanationResult from '@/components/ExplanationResult';
import { useToast } from '@/components/ui/use-toast';

// This would eventually come from an actual API
const mockExplanations = (concept: string) => {
  // Simplified mock API response
  const examples: Record<string, { explanation: string, story: string }> = {
    'api': {
      explanation: "An API (Application Programming Interface) is like a menu in a restaurant. It lists what services are available for you to use, without you needing to know how the kitchen works.",
      story: "Imagine you're at a restaurant. You don't go into the kitchen to make your own meal—instead, you look at a menu (the API) that tells you what you can order. You place your order through a waiter (make an API call), and the kitchen (the server) prepares what you asked for and sends it back. The menu is the interface between you and the restaurant's services, just like an API is the interface between your app and a service's functionality."
    },
    'algorithm': {
      explanation: "An algorithm is a step-by-step procedure for solving a problem or accomplishing a task. It's like a cooking recipe that tells you exactly what to do in what order.",
      story: "Think of Sarah, who loves to bake cookies. She follows a recipe that says: '1) Preheat oven to 350°F, 2) Mix butter and sugar, 3) Add eggs and vanilla, 4) Stir in dry ingredients...' This recipe is her algorithm—a clear set of instructions that, when followed correctly, consistently produces delicious cookies. Computer algorithms work the same way, but instead of making cookies, they might sort data, find routes, or recommend videos you might like."
    },
    'cloud computing': {
      explanation: "Cloud computing means using computer services (like storage, servers, databases) over the internet instead of owning and maintaining the physical hardware yourself.",
      story: "Remember the old days when everyone had DVD collections at home? You needed physical space to store them, had to organize them, and replace them if damaged. Then came Netflix—suddenly, all those movies lived 'in the cloud.' You didn't need physical DVDs anymore; you just accessed what you wanted, when you wanted, through the internet. That's like cloud computing: instead of buying and maintaining your own servers and storage, you rent what you need from companies that manage it all for you."
    }
  };

  // Default response for terms not in our examples
  const defaultResponse = {
    explanation: `${concept} is a technology term that refers to a specific concept in computing or digital technology. It helps solve particular problems in the tech world.`,
    story: `Let me tell you about Alex who needed to understand ${concept}. At first, it seemed complex and technical. But then Alex realized it's actually similar to something familiar - like how we organize our kitchen cabinets. When you put things in logical places and have a system, it becomes much easier to find what you need when cooking. That's essentially what ${concept} does in the tech world - creates systems that make complex things more manageable and efficient.`
  };

  return examples[concept.toLowerCase()] || defaultResponse;
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState<{ 
    term: string; 
    explanation: string; 
    story: string; 
  } | null>(null);
  const { toast } = useToast();

  const handleSubmit = (concept: string) => {
    setIsLoading(true);
    setSearchTerm(concept);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        const response = mockExplanations(concept);
        
        setResult({
          term: concept,
          explanation: response.explanation,
          story: response.story
        });
        
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast({
          title: "Oops! Something went wrong",
          description: "We couldn't process your request. Please try again.",
          variant: "destructive"
        });
      }
    }, 1500); // Simulate API delay
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
