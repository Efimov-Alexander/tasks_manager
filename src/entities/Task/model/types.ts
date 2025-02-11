import {IComment} from "../../Comment/model/types";

export enum TaskStatus {
  queue = 'Queue',
  development = 'Development',
  done = 'Done',
}

export enum TaskPriority {
  urgent = 'Urgent',
  high = 'High',
  medium = 'Medium',
  low = 'Low',
  none = 'None'
}

export interface ISubtask extends Omit<ITask, 'subTasks'>{
  mainTask: {
    id: ITask['id'],
    title: ITask['title']
  }
}

export interface ITask {
  id: number,
  title: string,
  description: string,
  priority: TaskPriority,
  status: TaskStatus,
  createdAt: Date,
  endedAt?: Date,
  subTasks?: ISubtask[],
  files?: any[],
  comments?: IComment[],
}

export type TTaskOrSubTask = ITask | ISubtask