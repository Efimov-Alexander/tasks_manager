import React, {useContext} from 'react';

import {ProjectsContext} from "src/entities/Project";

import {ProjectCard} from "src/entities/Project";

import s from './ProjectsSelection.module.scss';

const ProjectsSelection = () => {
  const { projects } = useContext(ProjectsContext);

  return <div className={s.projectSelection} >
    <h1 className={s.projectSelection__title} >Projects Selection Dashboard</h1>
    <ul className={s.projectSelection__list}>
      {projects ? projects.map((project) => <ProjectCard project={project} key={project.id} /> ) : null}
    </ul>
  </div>;
}

export default ProjectsSelection;
