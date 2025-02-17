import React, {useState} from "react";

import {ITask, TaskPriority, useChangeSubTaskValue, useChangeTaskValue} from "src/entities/Task";

import {getPriorityClassName} from "../lib/helpers";

import s from "./TaskPrioritySelect.module.scss";

interface IProps {
  selectedValue: TaskPriority,
  task: ITask,
}

const priorities = Object.values(TaskPriority)

export const TaskPrioritySelect = ({ selectedValue, task }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {changeSubTaskValue} = useChangeSubTaskValue();
  const {changeTaskValue} = useChangeTaskValue();

  const onOpen = (e: React.MouseEvent<HTMLElement>) => setIsOpen(!isOpen)

  const onPriorityChange = (priority: TaskPriority) => {
    'mainTask' in task ?
      changeSubTaskValue({valueName: 'priority', task, value: priority})
      : changeTaskValue({valueName: 'priority', task, value: priority})

    setIsOpen(!isOpen)
  }

  return <>
    {isOpen ? <div className={s.taskPrioritySelect__outer} onClick={() => setIsOpen(false)}/> : null}
    <div className={s.taskPrioritySelect__wrapper}>

      <div onClick={onOpen} className={getPriorityClassName(selectedValue)}>{selectedValue}</div>

      {isOpen ? <div className={s.taskPrioritySelect__priorities}>
        {priorities.map((priority) => <div key={priority} className={getPriorityClassName(priority)} onClick={() => onPriorityChange(priority)}>{priority}</div>)}
      </div> : null}
    </div>
  </>
}