
import React, { useState } from 'react';
import { TaskProvider } from '../contexts/TaskContext';
import Board from '../components/Board';
import Header from '../components/Header';
import TaskDialog from '../components/TaskDialog';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const backend = isMobile ? TouchBackend : HTML5Backend;

  return (
    <TaskProvider>
      <div className="min-h-screen flex flex-col">
        <div className="animated-background"></div>
        <Header onAddTask={() => setIsDialogOpen(true)}>
          <Link to="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </Header>
        <main className="flex-1 overflow-hidden">
          <DndProvider backend={backend}>
            <Board />
          </DndProvider>
        </main>
        
        <TaskDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </TaskProvider>
  );
};

export default Projects;
