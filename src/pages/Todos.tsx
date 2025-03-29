
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Todos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="animated-background"></div>
      
      <header className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-xl font-bold">To-Do List</h1>
          </div>
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            We're working on a simple yet powerful to-do list management tool. 
            Check back soon for updates!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Todos;
