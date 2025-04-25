
import React from 'react';
import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

type AICharacterProps = {
  isThinking?: boolean;
  className?: string;
};

const AICharacter = ({ isThinking = false, className }: AICharacterProps) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn(
        "relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-teal-500",
        isThinking ? "animate-pulse-gentle" : "animate-bounce-subtle",
        "shadow-soft"
      )}>
        <Lightbulb className="h-8 w-8 text-white" />
        {isThinking && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500">
            <span className="animate-ping absolute h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative block h-3 w-3 rounded-full bg-amber-500"></span>
          </span>
        )}
      </div>
      <h3 className="mt-2 text-center font-display font-medium text-purple-700">
        Questy
      </h3>
    </div>
  );
};

export default AICharacter;
