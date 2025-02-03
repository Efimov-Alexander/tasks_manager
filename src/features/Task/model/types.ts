export enum TaskStatus {
  queue = 'Queue',
  development = 'Development',
  done = 'Done',
}

export enum TaskPriority {
  urgent = 'Urgent',
  high = 'High',
  medium = 'Medium',
  low = 'Low'
}

export interface ITask {
  id: number,
  title: string,
  description: string,
  priority: TaskPriority,
  status: TaskStatus,
  createdAt: Date,
  files: any[],
}

export interface IChangeTaskValue {
  task: ITask,
  value: ITask[keyof ITask],
  valueName: keyof ITask,
}

export interface IDropTaskParams {
  item: ITask,
  title: TaskStatus,
}

export interface IDropFilesParams {
  files: any[],
  task: ITask,
}
