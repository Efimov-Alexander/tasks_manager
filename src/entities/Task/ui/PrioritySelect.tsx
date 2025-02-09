import React from "react";
import cn from "classnames";
import s from "./PrioritySelect.module.scss";
import {TaskPriority} from "../model/types";

interface IProps {
  selectedValue: TaskPriority,
}

export const PrioritySelect = ({ selectedValue }: IProps) => {

  const priorityClassname = cn(s.prioritySelect, {
    [s.prioritySelect_urgent]: selectedValue === TaskPriority.urgent,
    [s.prioritySelect_hight]: selectedValue === TaskPriority.high,
    [s.prioritySelect_medium]: selectedValue === TaskPriority.medium,
    [s.prioritySelect_low]: selectedValue === TaskPriority.low,
    [s.prioritySelect_none]: selectedValue === TaskPriority.none,
  });

  const onPriorityChange = () => {

  }

  return <div onClick={onPriorityChange} className={priorityClassname}>{selectedValue}</div>
}