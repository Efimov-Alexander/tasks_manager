import {useDrop} from "react-dnd";
import cn from "classnames";

import {IProject} from "src/entities/Project";
import {ITask, TaskStatus} from "src/entities/Task";
import {Button} from "src/shared";

import {ItemTypes, Task} from "./Task";
import {useAddTask, useOnDropTask} from "../lib/hooks";

import s from './TasksColumn.module.scss'

interface IProps {
  title: TaskStatus,
  projectId: IProject['id']
  tasks: IProject['tasks'],
}

export const TasksColumn = ({ title, tasks, projectId }:IProps) => {
  const { dropTask } = useOnDropTask();
  const { addTask } = useAddTask();

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.task,
    drop: (item: ITask) => dropTask({ task: item, column: title }),
    collect: (monitor) => ({ isOver: monitor.isOver()}),
  })

  const className = cn(s.tasksColumn, {
    [s.tasksColumn_active]: isOver
  })

  const onAddTask = (status: TaskStatus) => addTask({projectId, status})

  return <div ref={drop} className={className}>
    <div className={s.tasksColumn__header}>
      <h3 className={s.tasksColumn__title}>{title}</h3>
      { title !== TaskStatus.done ? <Button onClick={() => onAddTask(title)}>Add Task</Button> :  null}
    </div>
    <div className={s.tasksColumn__tasksContainer}>
      { tasks ? tasks.map((task) => <Task key={task.id} task={task}/>) : null }
    </div>
  </div>
}