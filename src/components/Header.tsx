
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface HeaderProps {
  onAddTask: () => void;
}

const Header = ({ onAddTask }: HeaderProps) => {
  return (
    <header className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-2 text-accent">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-6 w-6"
            >
              <path d="M12 2 L22 8.5 L22 15.5 L12 22 L2 15.5 L2 8.5 L12 2" />
              <path d="M12 22 L12 15.5" />
              <path d="M22 8.5 L12 15.5 L2 8.5" />
              <path d="M2 15.5 L12 8.5 L22 15.5" />
              <path d="M12 2 L12 8.5" />
            </svg>
          </div>
          <h1 className="text-xl font-bold">TaskTide</h1>
        </div>
        <Button onClick={onAddTask} size="sm" className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>
    </header>
  );
};

export default Header;
