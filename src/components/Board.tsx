
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useTaskContext } from '../contexts/TaskContext';
import Column from './Column';
import TaskDialog from './TaskDialog';
import { Task, TaskStatus } from '../types/task';
import { isMobile } from 'react-device-detect';

const Board = () => {
  const { columns, moveTask } = useTaskContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus | undefined>(undefined);

  const handleAddTask = (status: TaskStatus) => {
    setCurrentTask(undefined);
    setDefaultStatus(status);
    setIsDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setDefaultStatus(undefined);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentTask(undefined);
    setDefaultStatus(undefined);
  };

  const backend = isMobile ? TouchBackend : HTML5Backend;

  return (
    <>
      <DndProvider backend={backend}>
        <div className="board-container p-4">
          <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                moveTask={moveTask}
              />
            ))}
          </div>
        </div>
      </DndProvider>

      <TaskDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        task={currentTask}
        defaultStatus={defaultStatus}
      />
    </>
  );
};

export default Board;
