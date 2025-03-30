
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Filter, ListFilter, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TodoProvider, useTodoContext, TodoPriority } from '../contexts/TodoContext';
import TodoItem from '../components/TodoItem';
import { TodoModal } from '../components/TodoModal';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TodoList = () => {
  const { 
    filteredTodos, 
    filterStatus, 
    setFilterStatus, 
    filterPriority, 
    setFilterPriority 
  } = useTodoContext();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const displayedTodos = searchQuery
    ? filteredTodos.filter(todo => 
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (todo.description && todo.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredTodos;

  const completedCount = filteredTodos.filter(todo => todo.completed).length;
  const totalCount = filteredTodos.length;
  const completionPercentage = totalCount > 0 
    ? Math.round((completedCount / totalCount) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select 
            value={filterPriority} 
            onValueChange={(value) => setFilterPriority(value as TodoPriority | 'all')}
          >
            <SelectTrigger className="w-[130px]">
              <ListFilter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Add Task
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-medium">Progress</h3>
            <p className="text-sm text-muted-foreground">
              {completedCount} of {totalCount} tasks completed
            </p>
          </div>
          <div className="text-2xl font-bold">{completionPercentage}%</div>
        </div>
        
        <div className="w-full bg-secondary rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </Card>

      <Tabs defaultValue="all" value={filterStatus} onValueChange={(v) => setFilterStatus(v as 'all' | 'active' | 'completed')}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={filterStatus} className="mt-4">
          <div className="space-y-4">
            {displayedTodos.length > 0 ? (
              displayedTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No tasks found</p>
                <Button 
                  variant="link" 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="mt-2"
                >
                  Create a new task
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <TodoModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        mode="create"
      />
    </div>
  );
};

const Todos = () => {
  return (
    <TodoProvider>
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
          </div>
        </header>
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <TodoList />
        </main>
      </div>
    </TodoProvider>
  );
};

export default Todos;
