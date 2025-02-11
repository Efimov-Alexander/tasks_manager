import {format} from "date-fns";
import {TaskPriority} from "./types";
import cn from "classnames";
import s from "../ui/PrioritySelect.module.scss";

export const monthYearTimeFormat = (date: Date | undefined) => date ? `${format(date, "MMM d, yyyy")} at ${format(date, "HH:m")}` : '';

export const getPriorityClassName = (priority: TaskPriority) => cn(s.prioritySelect, {
  [s.prioritySelect_urgent]: priority === TaskPriority.urgent,
  [s.prioritySelect_hight]: priority === TaskPriority.high,
  [s.prioritySelect_medium]: priority === TaskPriority.medium,
  [s.prioritySelect_low]: priority === TaskPriority.low,
  [s.prioritySelect_none]: priority === TaskPriority.none,
});