
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projectMembersData } from '@/utils/mockStatsData';

interface ProjectStatsProps {
  projectName?: string;
}

const ProjectStats: React.FC<ProjectStatsProps> = ({ projectName = "All Projects" }) => {
  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <h2 className="text-lg font-semibold mb-2">{projectName} Members</h2>
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Members</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {projectMembersData.map((member, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {member.projectsInvolved} projects • {member.tasksCompleted} tasks
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">
                  {Math.round(member.tasksCompleted / 40 * 100)}% completed
                </div>
                <div className="w-24 h-2 bg-muted rounded-full mt-1">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${Math.round(member.tasksCompleted / 40 * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="active" className="text-center p-8 text-muted-foreground">
          <p>4 active members</p>
        </TabsContent>
        
        <TabsContent value="pending" className="text-center p-8 text-muted-foreground">
          <p>No pending members</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectStats;
