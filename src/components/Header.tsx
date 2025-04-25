
import React from 'react';

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 gradient-text">
          Curious Code Quests
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Demystifying tech concepts through simple explanations and friendly stories.
          Ask about any technology term and let our AI guide make it easy to understand!
        </p>
      </div>
    </header>
  );
};

export default Header;
