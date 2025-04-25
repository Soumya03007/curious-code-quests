
import React from 'react';
import { BookOpenText, MessageSquare, BookOpen } from 'lucide-react';
import ExplanationCard from './ExplanationCard';

interface ExplanationResultProps {
  term: string;
  explanation: string;
  story: string;
  className?: string;
}

const ExplanationResult: React.FC<ExplanationResultProps> = ({ 
  term, 
  explanation, 
  story,
  className 
}) => {
  return (
    <div className={className}>
      <h2 className="text-center text-2xl font-display font-bold mb-6 gradient-text">
        Here's Your Explanation
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ExplanationCard 
          title="Term You Entered" 
          icon={<BookOpenText className="h-5 w-5 text-purple-600" />}
        >
          <p className="font-medium text-lg">{term}</p>
        </ExplanationCard>
        
        <ExplanationCard 
          title="Simplified Explanation" 
          icon={<MessageSquare className="h-5 w-5 text-teal-600" />}
        >
          <p className="leading-relaxed">{explanation}</p>
        </ExplanationCard>
        
        <ExplanationCard 
          title="Story Time with AI" 
          icon={<BookOpen className="h-5 w-5 text-amber-600" />}
          className="md:col-span-2 lg:col-span-1"
        >
          <div className="prose prose-purple">
            <p className="leading-relaxed">{story}</p>
          </div>
        </ExplanationCard>
      </div>
    </div>
  );
};

export default ExplanationResult;
