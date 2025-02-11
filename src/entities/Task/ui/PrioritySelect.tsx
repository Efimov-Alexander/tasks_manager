import React, {useState} from "react";
import s from "./PrioritySelect.module.scss";
import { TaskPriority, TTaskOrSubTask} from "../model/types";
import { useChangeSubTaskValue, useChangeTaskValue} from "../model/hooks";
import {getPriorityClassName} from "../model/taskHelper";

interface IProps {
  selectedValue: TaskPriority,
  task: TTaskOrSubTask,
}

const priorities = Object.values(TaskPriority)

export const PrioritySelect = ({ selectedValue, task }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {changeSubTaskValue} = useChangeSubTaskValue();
  const {changeTaskValue} = useChangeTaskValue();

  const onOpen = (e: React.MouseEvent<HTMLElement>) => setIsOpen(!isOpen)

  const onPriorityChange = (priority: TaskPriority) => {
    console.log('change')
    'mainTask' in task ?
      changeSubTaskValue({valueName: 'priority', task, value: priority})
      : changeTaskValue({valueName: 'priority', task, value: priority})

    setIsOpen(!isOpen)
  }

  return <div className={s.prioritySelect__wrapper}>
    <div onClick={onOpen} className={getPriorityClassName(selectedValue)}>{selectedValue}</div>

    { isOpen ? <>
      <div className={s.prioritySelect__priorities}>
        {priorities.map((priority) => <div key={priority} className={getPriorityClassName(priority)} onClick={() => onPriorityChange(priority)}>{priority}</div>)}
      </div>
      <div className={s.prioritySelect__outer} onClick={() => setIsOpen(false)} />
    </> : null}
  </div>
}