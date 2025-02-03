import React from "react";
import cn from "classnames";
import s from "./Task.module.scss";
import {TaskPriority} from "../model/types";

interface IProps {
  selectedValue: TaskPriority,
}

export const PrioritySelect = ({ selectedValue }: IProps) => {

  const priorityClassname = cn(s.task__priority, {
    [s.task__priority_urgent]: selectedValue === TaskPriority.urgent,
    [s.task__priority_hight]: selectedValue === TaskPriority.high,
    [s.task__priority_medium]: selectedValue === TaskPriority.medium,
    [s.task__priority_low]: selectedValue === TaskPriority.low,
  });

  const onPriorityChange = () => {

  }

  return <div onClick={onPriorityChange} className={priorityClassname}>{selectedValue}</div>
}