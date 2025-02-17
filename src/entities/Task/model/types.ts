import type {IComment} from "src/entities/Comment";

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

  endedAt?: Date,
  subTasks?: ITask[],
  files?: any[],
  comments?: IComment[],
  mainTask?: {
    id: ITask['id'],
    title: ITask['title']
  }
}
