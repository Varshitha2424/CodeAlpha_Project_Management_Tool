import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskCard;