import {useDrag} from "react-dnd";
import cn from "classnames";
import React from "react";

import {TaskPrioritySelect} from "src/features/TaskPrioritySelect";
import {TaskDescription} from "src/features/TaskDescription";
import {TaskDropzone} from "src/features/TaskDropzone";
import {TaskSubtasks} from "src/features/TaskSubtasks";
import {TaskComments} from "src/features/TaskComments";
import {Title, ITask, TaskStatus, Dates} from "src/entities/Task";

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

  const taskClassName = cn(s.task, {
    [s.task_done]: task.status === TaskStatus.done,
  })

  return <div id={`${id}`} ref={drag} className={taskClassName}>
    <Title task={task} />

    <div className={s.task__characteristicBLock}>
      <Dates createdAt={createdAt} endedAt={endedAt}/>
      <TaskPrioritySelect key={task.id} task={task} selectedValue={priority}/>
    </div>

    <TaskSubtasks task={task} className={s.task__subtasks} />
    <TaskDescription task={task}/>
    <TaskDropzone task={task}/>
    <TaskComments task={task}/>
  </div>;
};
