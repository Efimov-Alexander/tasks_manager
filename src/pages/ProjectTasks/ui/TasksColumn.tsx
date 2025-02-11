import { TaskStatus} from "src/entities/Task";

import s from './TasksColumn.module.scss'
import {ITask} from "../../../entities/Task";
import {ItemTypes, Task} from "../../../entities/Task/ui/Task";
import {useDrop} from "react-dnd";
import { useOnDropTask} from "../../../entities/Task/model/hooks";
import {Button} from "../../../shared/ui/Button";
import cn from "classnames";

interface IProps {
  title: TaskStatus,
  tasks?: ITask[],
  onAddTask: (status: TaskStatus) => void,
}

export const TasksColumn = ({ title, tasks, onAddTask }:IProps) => {
  const { dropTask } = useOnDropTask();
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.task,
    drop: (item: ITask) => dropTask({ task: item, column: title }),
    collect: (monitor) => ({ isOver: monitor.isOver()}),
  })

  const className = cn(s.tasksColumn, {
    [s.tasksColumn_active]: isOver
  })

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