import React, { useContext} from 'react';
import {useParams} from "react-router-dom";

import {ROUTES, Button} from "src/shared";
import {TasksSearch} from "src/features/TasksSearch";
import {TasksColumnsList} from "src/widgets/TasksColumnsList";
import {ProjectsContext, getProjectById} from "src/entities/Project";

import s from './ProjectTasks.module.scss'

function ProjectTasks() {
  const { projectId } = useParams();
  const { projects } = useContext(ProjectsContext);

  const project = getProjectById({ projects, id: projectId });

  return <div className={s.projectTasks}>
    { project ? <>
      <TasksSearch project={project}/>
      <TasksColumnsList project={project} />
      <Button isRouterLink url={ROUTES.tasks_manager.index} className={s.projectTasks__backButton}>⬅</Button>
    </> : null }
  </div>;
}

export default ProjectTasks;
