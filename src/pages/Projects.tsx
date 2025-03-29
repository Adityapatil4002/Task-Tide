
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
import { ArrowLeft, Users, Briefcase, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StatsCard from '@/components/StatsCard';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface ProjectFormValues {
  projectName: string;
  members: number;
  deadline: string;
}

const Projects = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [projectDetails, setProjectDetails] = useState<ProjectFormValues | null>(null);
  const backend = isMobile ? TouchBackend : HTML5Backend;

  const form = useForm<ProjectFormValues>({
    defaultValues: {
      projectName: '',
      members: 1,
      deadline: ''
    }
  });

  const onSubmit = (data: ProjectFormValues) => {
    setProjectDetails(data);
    setShowForm(false);
  };

  const resetForm = () => {
    setProjectDetails(null);
    setShowForm(true);
    form.reset();
  };

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
        
        {showForm ? (
          <div className="container mx-auto p-4 max-w-md">
            <Card className="bg-card/70 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Project Details</h2>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input 
                      id="projectName"
                      placeholder="Enter project name"
                      {...form.register('projectName', { required: true })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="members">Number of Team Members</Label>
                    <Input 
                      id="members"
                      type="number"
                      min="1"
                      {...form.register('members', { 
                        required: true,
                        valueAsNumber: true,
                        min: 1
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Project Deadline</Label>
                    <Input 
                      id="deadline"
                      type="date"
                      {...form.register('deadline', { required: true })}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">Start Project Board</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{projectDetails?.projectName || 'Project'}</h2>
              <Button variant="outline" onClick={resetForm}>Change Project</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <StatsCard 
                title="Team Members" 
                value={projectDetails?.members || 0} 
                icon={<Users className="h-5 w-5" />}
              />
              <StatsCard 
                title="Project Name" 
                value={projectDetails?.projectName || ''} 
                icon={<Briefcase className="h-5 w-5" />}
              />
              <StatsCard 
                title="Deadline" 
                value={projectDetails?.deadline ? new Date(projectDetails.deadline).toLocaleDateString() : 'N/A'} 
                icon={<Calendar className="h-5 w-5" />}
                description={projectDetails?.deadline ? `${Math.ceil((new Date(projectDetails.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining` : ''}
              />
            </div>
            
            <main className="flex-1 overflow-hidden">
              <DndProvider backend={backend}>
                <Board />
              </DndProvider>
            </main>
          </div>
        )}
        
        <TaskDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </TaskProvider>
  );
};

export default Projects;
