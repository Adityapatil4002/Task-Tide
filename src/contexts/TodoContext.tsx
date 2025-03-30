
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TodoPriority;
  createdAt: string;
  dueDate?: string;
}

interface TodoContextProps {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  filteredTodos: Todo[];
  filterStatus: 'all' | 'active' | 'completed';
  setFilterStatus: (status: 'all' | 'active' | 'completed') => void;
  filterPriority: TodoPriority | 'all';
  setFilterPriority: (priority: TodoPriority | 'all') => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

const initialTodos: Todo[] = [
  {
    id: '1',
    title: 'Create project presentation',
    description: 'Prepare slides for the quarterly review meeting',
    completed: false,
    priority: 'high',
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Review code changes',
    description: 'Go through pull requests and provide feedback',
    completed: false,
    priority: 'medium',
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Update documentation',
    description: 'Add missing details to the API documentation',
    completed: true,
    priority: 'low',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [filterPriority, setFilterPriority] = useState<TodoPriority | 'all'>('all');
  const { toast } = useToast();

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      setTodos(initialTodos);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Filter todos based on status and priority
  const filteredTodos = todos.filter(todo => {
    const statusMatch = 
      filterStatus === 'all' || 
      (filterStatus === 'active' && !todo.completed) || 
      (filterStatus === 'completed' && todo.completed);
    
    const priorityMatch = 
      filterPriority === 'all' || 
      todo.priority === filterPriority;
    
    return statusMatch && priorityMatch;
  });

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
    toast({
      title: "Todo added",
      description: `"${todo.title}" has been added to your list`,
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    const todoTitle = todos.find(todo => todo.id === id)?.title;
    toast({
      title: "Status updated",
      description: `"${todoTitle}" marked as ${todos.find(todo => todo.id === id)?.completed ? 'active' : 'completed'}`,
    });
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    );
    toast({
      title: "Todo updated",
      description: `"${updatedTodo.title}" has been updated`,
    });
  };

  const deleteTodo = (id: string) => {
    const todoTitle = todos.find(todo => todo.id === id)?.title;
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    toast({
      title: "Todo deleted",
      description: `"${todoTitle}" has been removed`,
      variant: "destructive",
    });
  };

  return (
    <TodoContext.Provider value={{ 
      todos, 
      addTodo, 
      toggleTodo, 
      updateTodo, 
      deleteTodo,
      filteredTodos,
      filterStatus,
      setFilterStatus,
      filterPriority,
      setFilterPriority
    }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
