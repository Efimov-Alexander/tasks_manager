import React from "react";
import {ITask} from "../../../entities/Task";

import s from './SearchedTask.module.scss'
import {onFindTask} from "../model/projectTasksHelper";

interface IProps {
  task: ITask,
}

export const SearchedTask = ({task}: IProps) => {
  const title = `${task.id} - ${task.title}`;

  return <div className={s.searchedTask} onClick={() => onFindTask(task.id)}>{title}</div>
}