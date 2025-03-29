
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Task, TaskStatus, Column } from '../types/task';
import { useToast } from '@/components/ui/use-toast';

interface TaskContextProps {
  columns: Column[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  moveTask: (dragIndex: number, hoverIndex: number, sourceColumn: TaskStatus, targetColumn: TaskStatus) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: '1',
        title: 'Research competitors',
        description: 'Analyze competitor products and identify opportunities for improvement',
        priority: 'medium',
        status: 'todo',
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        title: 'Design user flow',
        description: 'Map out the key user journeys through the application',
        priority: 'high',
        status: 'todo',
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      {
        id: '3',
        title: 'Develop UI components',
        description: 'Create reusable component library for the application',
        priority: 'high',
        status: 'in-progress',
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ],
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      {
        id: '4',
        title: 'Review marketing plan',
        description: 'Check the marketing materials and provide feedback',
        priority: 'low',
        status: 'review',
        createdAt: new Date().toISOString(),
      }
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: '5',
        title: 'Setup project repository',
        description: 'Create GitHub repository and configure CI/CD',
        priority: 'medium',
        status: 'done',
        createdAt: new Date().toISOString(),
      }
    ],
  }
];

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const { toast } = useToast();

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedColumns = localStorage.getItem('taskColumns');
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('taskColumns', JSON.stringify(columns));
  }, [columns]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    setColumns(prevColumns => 
      prevColumns.map(column => 
        column.id === task.status
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );

    toast({
      title: "Task added",
      description: `"${task.title}" has been added to ${task.status}`,
    });
  };

  const updateTask = (updatedTask: Task) => {
    setColumns(prevColumns => {
      // Find and remove the task from its original column
      const sourceColumn = prevColumns.find(col => 
        col.tasks.some(task => task.id === updatedTask.id)
      );

      if (!sourceColumn) return prevColumns;

      const updatedColumns = prevColumns.map(column => ({
        ...column,
        tasks: column.tasks.filter(task => task.id !== updatedTask.id)
      }));

      // Add the task to its new column
      return updatedColumns.map(column => 
        column.id === updatedTask.status
          ? { ...column, tasks: [...column.tasks, updatedTask] }
          : column
      );
    });

    toast({
      title: "Task updated",
      description: `"${updatedTask.title}" has been updated`,
    });
  };

  const deleteTask = (id: string) => {
    setColumns(prevColumns => 
      prevColumns.map(column => ({
        ...column,
        tasks: column.tasks.filter(task => task.id !== id)
      }))
    );

    toast({
      title: "Task deleted",
      description: "The task has been removed",
      variant: "destructive",
    });
  };

  const moveTask = (dragIndex: number, hoverIndex: number, sourceColumn: TaskStatus, targetColumn: TaskStatus) => {
    setColumns(prevColumns => {
      // Find source and target columns
      const sourceCol = prevColumns.find(col => col.id === sourceColumn);
      const targetCol = prevColumns.find(col => col.id === targetColumn);

      if (!sourceCol || !targetCol) return prevColumns;

      // Create new arrays to avoid mutation
      const newColumns = [...prevColumns];
      const sourceColIndex = newColumns.findIndex(col => col.id === sourceColumn);
      const targetColIndex = newColumns.findIndex(col => col.id === targetColumn);

      // Same column reordering
      if (sourceColumn === targetColumn) {
        const newTasks = [...sourceCol.tasks];
        const [movedTask] = newTasks.splice(dragIndex, 1);
        newTasks.splice(hoverIndex, 0, movedTask);
        
        newColumns[sourceColIndex] = {
          ...sourceCol,
          tasks: newTasks
        };
      } else {
        // Moving between columns
        const sourceTasks = [...sourceCol.tasks];
        const [movedTask] = sourceTasks.splice(dragIndex, 1);
        
        // Update the task's status
        const updatedTask = {
          ...movedTask,
          status: targetColumn
        };
        
        const targetTasks = [...targetCol.tasks];
        targetTasks.splice(hoverIndex, 0, updatedTask);
        
        newColumns[sourceColIndex] = {
          ...sourceCol,
          tasks: sourceTasks
        };
        
        newColumns[targetColIndex] = {
          ...targetCol,
          tasks: targetTasks
        };
      }

      return newColumns;
    });
  };

  return (
    <TaskContext.Provider value={{ columns, addTask, updateTask, deleteTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
