import { TaskStatus} from "src/entities/Task";

import s from './TasksColumn.module.scss'
import {ITask} from "../../../entities/Task";
import {ItemTypes, Task} from "../../../entities/Task/ui/Task";
import {useDrop} from "react-dnd";
import {useChangeTaskValue} from "../../../entities/Task/model/taskHelper";
import {Button} from "../../../shared/ui/Button";

interface IProps {
  title: TaskStatus,
  tasks?: ITask[],
  onAddTask: (status: TaskStatus) => void,
}

export const TasksColumn = ({ title, tasks, onAddTask }:IProps) => {
  const { changeTaskValue } = useChangeTaskValue();

  const [_, drop] = useDrop({
    accept: ItemTypes.task,
    drop: (item: ITask) => changeTaskValue({ task: item, valueName: "status", value: title }),
  })

  return <div ref={drop} className={s.tasksColumn} >
    <div className={s.tasksColumn__header}>
      <h3 className={s.tasksColumn__title}>{title}</h3>
      { title !== TaskStatus.done ? <Button onClick={() => onAddTask(title)}>Add Task</Button> :  null}
    </div>
    <div className={s.tasksColumn__tasksContainer}>
      { tasks ? tasks.map(({comments, id, status, title, description, priority, files, createdAt }) => <Task key={id} files={files} id={id} createdAt={createdAt} comments={comments} priority={priority} title={title} status={status} description={description}/>) : null }
    </div>
  </div>
}