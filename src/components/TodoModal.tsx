
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Todo, TodoPriority, useTodoContext } from '../contexts/TodoContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const todoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high'] as const),
  dueDate: z.string().optional(),
});

type TodoFormValues = z.infer<typeof todoSchema>;

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTodo?: Todo;
  mode: 'create' | 'edit';
}

export const TodoModal: React.FC<TodoModalProps> = ({ 
  isOpen, 
  onClose, 
  initialTodo,
  mode 
}) => {
  const { addTodo, updateTodo } = useTodoContext();

  const defaultValues: TodoFormValues = {
    title: initialTodo?.title || '',
    description: initialTodo?.description || '',
    priority: initialTodo?.priority || 'medium',
    dueDate: initialTodo?.dueDate ? new Date(initialTodo.dueDate).toISOString().split('T')[0] : '',
  };

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues,
  });

  const onSubmit = (values: TodoFormValues) => {
    if (mode === 'create') {
      addTodo({
        title: values.title,
        description: values.description,
        priority: values.priority as TodoPriority,
        completed: false,
        dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : undefined,
      });
    } else if (initialTodo) {
      updateTodo({
        ...initialTodo,
        title: values.title,
        description: values.description,
        priority: values.priority as TodoPriority,
        dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : undefined,
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create new task' : 'Edit task'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter task description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-2"
                    >
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="low" id="low" />
                        </FormControl>
                        <FormLabel htmlFor="low" className="cursor-pointer text-green-500">Low</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="medium" id="medium" />
                        </FormControl>
                        <FormLabel htmlFor="medium" className="cursor-pointer text-blue-500">Medium</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="high" id="high" />
                        </FormControl>
                        <FormLabel htmlFor="high" className="cursor-pointer text-red-500">High</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due date (optional)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {mode === 'create' ? 'Create task' : 'Save changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
