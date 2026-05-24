import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProjectCard from '../components/project/ProjectCard';
import './ProjectDashboard.css';

const projects = [
  { id: 1, name: 'Project Alpha', description: 'Description of Project Alpha', status: 'In Progress' },
  { id: 2, name: 'Project Beta', description: 'Description of Project Beta', status: 'Completed' },
  { id: 3, name: 'Project Gamma', description: 'Description of Project Gamma', status: 'Not Started' },
];

const ProjectDashboard = () => {
  return (
    <DashboardLayout>
      <div className="project-dashboard">
        <h1>Project Dashboard</h1>
        <div className="project-list">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDashboard;