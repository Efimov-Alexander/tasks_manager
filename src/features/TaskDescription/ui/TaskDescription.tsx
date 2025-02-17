import React, {useState} from "react";
import cn from "classnames";

import {DescriptionModal} from "./DescriptionModal";

import type {ITask} from "src/entities/Task";

import s from './TaskDescription.module.scss';

interface IProps {
  task: ITask,
  className?: string,
}

export const TaskDescription = ({task, className}: IProps) => {
  const [modal, setModal] = useState<boolean>(false);

  const classNames = cn(s.taskDescription, className)

  return <div className={classNames}>
    <div className={s.taskDescription__note}>
    Description:
      <div onClick={() => setModal(true)} className={s.taskDescription__description} dangerouslySetInnerHTML={{__html: task.description}}/>
    </div>

    {modal ? <DescriptionModal task={task} setModal={setModal}/> : null }
  </div>
}