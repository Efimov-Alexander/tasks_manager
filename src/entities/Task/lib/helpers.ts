import {format} from "date-fns";

import type {ITask} from "../model/types";

export const onFindTask = (id: ITask['id']) => {
  const task = document.getElementById(`${id}`);

  if (!task) return

  task.scrollIntoView({
    behavior: 'smooth',
    block: 'end'
  } as ScrollIntoViewOptions);

  task.classList.add('finded-task')
  setTimeout(() => {task.classList.remove('finded-task')}, 3000);
}

export const monthYearTimeFormat = (date?: Date) => date ? `${format(date, "MMM d, yyyy")} at ${format(date, "HH:m")}` : '';
