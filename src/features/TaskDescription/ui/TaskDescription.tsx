import React, {useState} from "react";

import {DescriptionModal} from "./DescriptionModal";

import type {ITask} from "src/entities/Task";

import s from './TaskDescription.module.scss';

interface IProps {
  task: ITask,
}

export const TaskDescription = ({task}: IProps) => {
  const [modal, setModal] = useState<boolean>(false);

  return <>
    <div className={s.taskDescription__note}>
    Description:
      <div onClick={() => setModal(true)} className={s.taskDescription__description} dangerouslySetInnerHTML={{__html: task.description}}/>
    </div>

    {modal ? <DescriptionModal task={task} setModal={setModal}/> : null }
  </>
}