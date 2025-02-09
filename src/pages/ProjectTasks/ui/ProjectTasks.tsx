import React, {useContext} from 'react';
import {useParams} from "react-router-dom";
import {TasksColumn} from "./TasksColumn";
import { TaskStatus} from "src/entities/Task";

import s from './ProjectTasks.module.scss'
import {getFilteredTasks, getProjectById, useAddTask} from "../model/projectTasksHelper";
import { ProjectsContext} from "../../../app/model/appHelper";
import {Button} from "../../../shared/ui/Button";
import {ROUTES} from "../../../app/constants/routes";


const columns = Object.values(TaskStatus);

function ProjectTasks() {
  const { projectId } = useParams();
  const { projects } = useContext(ProjectsContext);
  const { addTask } = useAddTask();

  if (!projectId) return null;

  const project = getProjectById({ projects, id: parseInt(projectId) });
  const filteredTasks = getFilteredTasks(project);

  const onAddTask = (status: TaskStatus) => addTask({project, status})

  return <div className={s.projectTasks}>
    <div className={s.projectTasks__columnsContainer}>
      { filteredTasks ? columns.map((column) => <TasksColumn onAddTask={onAddTask} key={column} title={column} tasks={filteredTasks[column]}/>) : null}
    </div>
    <Button isRouterLink url={ROUTES.tasks_manager.index} className={s.projectTasks__backButton}>⬅</Button>
  </div>;
}

export default ProjectTasks;
