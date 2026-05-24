import React, { useState } from 'react';
import KanbanBoard from '../components/kanban/KanbanBoard';
import DashboardLayout from '../components/layout/DashboardLayout';

const initialColumns = {
  todo: {
    name: 'To Do',
    tasks: [
      { id: '1', title: 'Task 1', description: 'Description for Task 1' },
      { id: '2', title: 'Task 2', description: 'Description for Task 2' },
    ],
  },
  inProgress: {
    name: 'In Progress',
    tasks: [
      { id: '3', title: 'Task 3', description: 'Description for Task 3' },
    ],
  },
  done: {
    name: 'Done',
    tasks: [
      { id: '4', title: 'Task 4', description: 'Description for Task 4' },
    ],
  },
};

const KanbanPage = () => {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const [removed] = sourceColumn.tasks.splice(source.index, 1);

    destColumn.tasks.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  };

  return (
    <DashboardLayout>
      <KanbanBoard columns={columns} onDragEnd={onDragEnd} />
    </DashboardLayout>
  );
};

export default KanbanPage;