import React from "react";
import cn from "classnames";

import {TITLE_MAX_LENGTH} from "../constants/constants";
import {useChangeSubTaskValue, useChangeTaskValue} from "../lib/hooks";

import type {ITask} from "../model/types";

import s from "./Title.module.scss";

interface IProps {
  task: ITask,
  className?: string,
}

export const Title = ({task, className}: IProps) => {
  const {changeTaskValue} = useChangeTaskValue();
  const {changeSubTaskValue} = useChangeSubTaskValue();

  const {id, title} = task;
  const classNames = cn(s.title__container, className)

  const titleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, task: ITask) => {
    const newValue = e.currentTarget.value;

    if (newValue.length > TITLE_MAX_LENGTH) return;

    task.mainTask ? changeSubTaskValue({valueName: 'title', task, value: newValue}) : changeTaskValue({valueName: 'title', task, value: newValue})
  }

  const onTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => titleChange(e, task);

  return <div className={classNames}>
    <div className={s.title__number}>{`${id} - `} </div>
    <textarea className={s.title__textarea} spellCheck={false} value={title} onChange={onTitleChange}/>
  </div>
}