import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className="project-status">Status: {project.status}</div>
    </div>
  );
};

export default ProjectCard;