
import React, { forwardRef } from 'react';
import { Task } from '../types/task';
import { MoreHorizontal, Trash2, Edit, Calendar } from 'lucide-react';
import { useTaskContext } from '../contexts/TaskContext';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  isDragging: boolean;
}

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
  ({ task, index, onEdit, isDragging }, ref) => {
    const { deleteTask } = useTaskContext();
    const { title, description, priority, dueDate } = task;

    const priorityColors = {
      high: 'bg-taskPriority-high',
      medium: 'bg-taskPriority-medium',
      low: 'bg-taskPriority-low',
    };

    const formattedDueDate = dueDate ? format(new Date(dueDate), 'MMM d, yyyy') : null;

    return (
      <Card
        ref={ref}
        className={`task-card ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        data-task-id={task.id}
      >
        <CardHeader className="p-3 pb-0 flex flex-row items-start justify-between">
          <div className="flex items-center">
            <span className={`priority-indicator ${priorityColors[priority]}`}></span>
            <h3 className="font-medium text-sm">{title}</h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => deleteTask(task.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
        {formattedDueDate && (
          <CardFooter className="p-3 pt-0 flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {formattedDueDate}
          </CardFooter>
        )}
      </Card>
    );
  }
);

TaskCard.displayName = 'TaskCard';

export default TaskCard;
