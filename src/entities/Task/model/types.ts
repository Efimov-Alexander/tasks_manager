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

export interface ITask {
  id: number,
  title: string,
  description: string,
  priority: TaskPriority,
  status: TaskStatus,
  createdAt: Date,
  files?: any[],
  comments?: IComment[],
}
