import React from "react";

import {IProject} from "src/entities/Project";
import {TaskStatus} from "src/entities/Task";

import {TasksColumn} from "./TasksColumn";
import {getFilteredTasks} from "../lib/helpers";

import s from "./TasksColumnsList.module.scss";

interface IProps {
  project: IProject,
}

const columns = Object.values(TaskStatus);

export const TasksColumnsList = ({project}: IProps) => {
  const filteredTasks = getFilteredTasks(project);

  return <div className={s.tasksColumnsList__container}>
    {filteredTasks ? columns.map((column) => <TasksColumn projectId={project.id} key={column} title={column} tasks={filteredTasks[column]}/>) : null}
  </div>
}