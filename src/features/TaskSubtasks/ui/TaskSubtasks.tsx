import React from "react";
import cn from "classnames";

import {ITask, onFindTask} from "src/entities/Task";
import {Button} from "src/shared";

import { useAddSubtask} from "../lib/hooks";

import s from "./TaskSubtasks.module.scss";

interface IProps {
  task: ITask
  className?: string,
}

export const TaskSubtasks = ({className, task}: IProps) => {
  const {addSubtask} = useAddSubtask();

  const classNames = cn(s.taskSubtasks, className)

  const onAddSubtask = () => addSubtask({task})
  const renderSubTasks = (tasks: ITask[]) => tasks.map((task) => <div onClick={() => onFindTask(task.id)} className={s.taskSubtasks__subtasksItem}>{task.id} - {task.title}</div>)
  const handleFindTask = () => task.mainTask ? onFindTask(task.mainTask.id) : null

  return <div className={classNames}>
    {task.mainTask ? <div className={s.taskSubtasks__subtasksList}>
      Main Task:
      <div className={s.taskSubtasks__subtasksItem} onClick={handleFindTask}>{task.mainTask.id} - {task.mainTask.title}</div>
    </div> : null }

    {task.subTasks ? <>
      <div className={s.taskSubtasks__subtasksList}>
        Subtasks:
        {renderSubTasks(task.subTasks)}
      </div>
      <Button onClick={onAddSubtask}>Add subtask</Button>
    </>: null}
  </div>
}