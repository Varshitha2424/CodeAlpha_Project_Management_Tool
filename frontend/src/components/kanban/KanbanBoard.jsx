import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from '../task/TaskCard';
import './KanbanBoard.css';

const KanbanBoard = ({ columns, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {Object.entries(columns).map(([columnId, column]) => (
          <div key={columnId} className="kanban-column">
            <h3>{column.name}</h3>
            <Droppable droppableId={columnId}>
              {(provided) => (
                <div
                  className="kanban-column-tasks"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {column.tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;