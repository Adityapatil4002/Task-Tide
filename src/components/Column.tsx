
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Column as ColumnType, Task, TaskStatus } from '../types/task';
import TaskCard from './TaskCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useDrag, useDrop as useDropItem } from 'react-dnd';

interface ColumnProps {
  column: ColumnType;
  onAddTask: (status: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  moveTask: (dragIndex: number, hoverIndex: number, sourceColumn: TaskStatus, targetColumn: TaskStatus) => void;
}

type DragItem = {
  index: number;
  id: string;
  status: TaskStatus;
  type: string;
};

const ITEM_TYPE = 'TASK';

const DraggableTaskCard = ({ 
  task, 
  index, 
  onEdit, 
  moveTask 
}: { 
  task: Task; 
  index: number; 
  onEdit: (task: Task) => void;
  moveTask: (dragIndex: number, hoverIndex: number, sourceColumn: TaskStatus, targetColumn: TaskStatus) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { 
      id: task.id, 
      index, 
      status: task.status 
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDropItem<DragItem>({
    accept: ITEM_TYPE,
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      const sourceColumn = item.status;
      const targetColumn = task.status;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex && sourceColumn === targetColumn) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      
      if (!clientOffset) {
        return;
      }

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveTask(dragIndex, hoverIndex, sourceColumn, targetColumn);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
      item.status = targetColumn;
    },
  });

  drag(drop(ref));

  return (
    <TaskCard
      ref={ref}
      task={task}
      index={index}
      onEdit={onEdit}
      isDragging={isDragging}
    />
  );
};

const Column = ({ column, onAddTask, onEditTask, moveTask }: ColumnProps) => {
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: () => ({ name: column.id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} className="task-column">
      <div className="task-column-header">
        <h2>{column.title} ({column.tasks.length})</h2>
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-7 w-7 p-0" 
          onClick={() => onAddTask(column.id)}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add Task</span>
        </Button>
      </div>

      <div className="space-y-3 flex-grow">
        {column.tasks.map((task, index) => (
          <DraggableTaskCard
            key={task.id}
            task={task}
            index={index}
            onEdit={onEditTask}
            moveTask={moveTask}
          />
        ))}
        {column.tasks.length === 0 && (
          <div className="flex items-center justify-center h-24 border border-dashed border-border rounded-lg">
            <p className="text-xs text-muted-foreground">Drop tasks here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
