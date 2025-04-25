
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ConceptInputProps {
  onSubmit: (concept: string) => void;
  isLoading: boolean;
}

const ConceptInput: React.FC<ConceptInputProps> = ({ onSubmit, isLoading }) => {
  const [concept, setConcept] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (concept.trim()) {
      onSubmit(concept.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <Input
          type="text"
          placeholder="What tech concept is puzzling you today?"
          className="pl-10 py-6 text-lg rounded-2xl shadow-soft input-glow"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          disabled={isLoading}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Button 
          type="submit" 
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl button-bounce bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600"
          disabled={isLoading || !concept.trim()}
        >
          {isLoading ? 'Thinking...' : 'Explain'}
        </Button>
      </div>
    </form>
  );
};

export default ConceptInput;
