
import React, { useState } from 'react';
import { Todo, TodoPriority, useTodoContext } from '../contexts/TodoContext';
import { Check, Edit, Trash, Clock } from 'lucide-react';
import { formatDistanceToNow, isAfter } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TodoModal } from './TodoModal';

interface TodoItemProps {
  todo: Todo;
}

const priorityColors: Record<TodoPriority, string> = {
  low: 'bg-green-500/10 text-green-500 border-green-500/20',
  medium: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  high: 'bg-red-500/10 text-red-500 border-red-500/20'
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodoContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isOverdue = todo.dueDate && !todo.completed && isAfter(new Date(), new Date(todo.dueDate));

  return (
    <>
      <Card className={cn(
        "p-4 transition-all duration-200",
        todo.completed ? "opacity-60" : "",
        isOverdue ? "border-red-300" : ""
      )}>
        <div className="flex items-start gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className={cn("h-6 w-6 shrink-0 rounded-full", 
              todo.completed ? "bg-primary text-primary-foreground" : ""
            )}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.completed && <Check className="h-3 w-3" />}
          </Button>
          
          <div className="grid gap-1 flex-1">
            <div className="flex items-start justify-between">
              <h3 className={cn(
                "font-medium",
                todo.completed ? "line-through text-muted-foreground" : ""
              )}>
                {todo.title}
              </h3>
              
              <Badge className={priorityColors[todo.priority]}>
                {todo.priority}
              </Badge>
            </div>
            
            {todo.description && (
              <p className="text-sm text-muted-foreground">
                {todo.description}
              </p>
            )}
            
            {todo.dueDate && (
              <div className={cn(
                "text-xs flex items-center gap-1 mt-1",
                isOverdue ? "text-red-500" : "text-muted-foreground"
              )}>
                <Clock className="h-3 w-3" />
                <span>
                  {isOverdue 
                    ? `Overdue by ${formatDistanceToNow(new Date(todo.dueDate))}` 
                    : `Due ${formatDistanceToNow(new Date(todo.dueDate))} from now`
                  }
                </span>
              </div>
            )}
          </div>
          
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-destructive hover:text-destructive"
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
      
      <TodoModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        initialTodo={todo}
        mode="edit"
      />
    </>
  );
};

export default TodoItem;
