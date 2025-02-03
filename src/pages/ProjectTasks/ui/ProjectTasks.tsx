import React, {useContext} from 'react';
import {useParams} from "react-router-dom";
import {TasksColumn} from "./TasksColumn";
import { TaskStatus} from "src/features/Task";

import s from './ProjectTasks.module.scss'
import {ProjectsContext} from "../../../app/ui/App";


const columns = Object.values(TaskStatus);

function ProjectTasks() {
  const { projectId } = useParams();
  const { projects } = useContext(ProjectsContext);

  if (!projectId) return null;

  const project = projects.find((project) => project.id === parseInt(projectId));

  return <div className={s.projectTasks}>
    <div className={s.projectTasks__columnsContainer}>
      {columns.map((column) => <TasksColumn key={column} title={column} tasks={project?.tasks[column]}/>)}
    </div>
  </div>;
}

export default ProjectTasks;
