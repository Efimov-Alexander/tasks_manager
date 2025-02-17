import React from "react";

import {TITLE_MAX_LENGTH} from "../constants/constants";
import {useChangeSubTaskValue, useChangeTaskValue} from "../lib/hooks";

import type {ITask} from "../model/types";

import s from "./Title.module.scss";

interface IProps {
  task: ITask,
}

export const Title = ({task}: IProps) => {
  const {changeTaskValue} = useChangeTaskValue();
  const {changeSubTaskValue} = useChangeSubTaskValue();

  const {id, title} = task;

  const titleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, task: ITask) => {
    const newValue = e.currentTarget.value;
    const isSubTask = 'mainTask' in task;

    if (newValue.length > TITLE_MAX_LENGTH) return;

    isSubTask ? changeSubTaskValue({valueName: 'title', task, value: newValue}) : changeTaskValue({valueName: 'title', task, value: newValue})
  }

  const onTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => titleChange(e, task);

  return <div className={s.title__container}>
    <div className={s.title__number}>{`${id} - `} </div>
    <textarea className={s.title__textarea} spellCheck={false} value={title} onChange={onTitleChange}/>
  </div>
}