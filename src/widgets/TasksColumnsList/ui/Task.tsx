import {useDrag} from "react-dnd";
import cn from "classnames";
import React from "react";

import {TaskPrioritySelect} from "src/features/TaskPrioritySelect";
import {TaskDescription} from "src/features/TaskDescription";
import {TaskDropzone} from "src/features/TaskDropzone";
import {TaskSubtasks} from "src/features/TaskSubtasks";
import {TaskComments} from "src/features/TaskComments";
import {Title, ITask, Dates} from "src/entities/Task";

import s from './Task.module.scss'

type IProps = {
  task: ITask
}

export const ItemTypes = {
  task: 'task'
}

export const Task = ({task}: IProps) => {
  const [_, drag] = useDrag({ type: ItemTypes.task, item: task })
  const { priority, id, createdAt, endedAt} = task;

  return <div id={`${id}`} ref={drag} className={s.task}>
    <Title task={task} className={s.task__title} />

    <div className={s.task__characteristicBLock}>
      <Dates createdAt={createdAt} endedAt={endedAt}/>
      <TaskPrioritySelect key={task.id} task={task} selectedValue={priority}/>
    </div>

    <TaskSubtasks task={task} className={s.task__subtasks} />
    <TaskDescription task={task} className={s.task__description}/>
    <TaskDropzone task={task} className={s.task__dropzone}/>
    <TaskComments task={task}/>
  </div>;
};
