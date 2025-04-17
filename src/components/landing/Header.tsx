
import React from 'react';

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-8 text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="mr-2 text-accent">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-10 w-10 animate-float"
          >
            <path d="M12 2 L22 8.5 L22 15.5 L12 22 L2 15.5 L2 8.5 L12 2" />
            <path d="M12 22 L12 15.5" />
            <path d="M22 8.5 L12 15.5 L2 8.5" />
            <path d="M2 15.5 L12 8.5 L22 15.5" />
            <path d="M12 2 L12 8.5" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">TaskTide</h1>
      </div>
      <p className="text-muted-foreground max-w-xl mx-auto">
        Streamline your workflow, boost productivity, and stay organized with our
        comprehensive task management solution.
      </p>
    </header>
  );
};

export default Header;
