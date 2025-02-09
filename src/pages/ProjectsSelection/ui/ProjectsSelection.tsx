import React, {useContext} from 'react';

import ProjectCard from "./ProjectCard";

import s from './ProjectsSelection.module.scss';
import {ProjectsContext} from "../../../app/model/appHelper";

const ProjectsSelection = () => {
  const { projects } = useContext(ProjectsContext);

  return <div className={s.projectSelection} >
    <h1 className={s.projectSelection__title} >Projects Selection Dashboard</h1>
    <ul className={s.projectSelection__list}>
      { projects.map((project) => {
        const { id, status, title, description, imageSrc } = project;

        return <ProjectCard id={id} imageSrc={imageSrc} description={description} status={status} title={title} key={id} />
      })}
    </ul>
  </div>;
}

export default ProjectsSelection;
