import cn from "classnames";

import {TaskPriority} from "src/entities/Task";

import s from "../ui/TaskPrioritySelect.module.scss";

export const getPriorityClassName = (priority: TaskPriority) => cn(s.taskPrioritySelect, {
  [s.taskPrioritySelect_urgent]: priority === TaskPriority.urgent,
  [s.taskPrioritySelect_hight]: priority === TaskPriority.high,
  [s.taskPrioritySelect_medium]: priority === TaskPriority.medium,
  [s.taskPrioritySelect_low]: priority === TaskPriority.low,
  [s.taskPrioritySelect_none]: priority === TaskPriority.none,
});