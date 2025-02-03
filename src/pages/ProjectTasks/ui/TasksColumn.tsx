import {TaskStatus} from "src/features/Task";

import s from './TasksColumn.module.scss'
import {ITask} from "../../../features/Task";
import {ItemTypes, Task} from "../../../features/Task/ui/Task";
import {useDrop} from "react-dnd";
import {useDropTask} from "../../../features/Task/model/dragAndDrop";

interface IProps {
  title: TaskStatus,
  tasks?: ITask[],
}

export const TasksColumn = ({ title, tasks }:IProps) => {
  const { dropTask } = useDropTask();

  const [_, drop] = useDrop({
    accept: ItemTypes.task,
    drop: (item: ITask) => dropTask({ item, title }),
  })

  return <div ref={drop} className={s.tasksColumn} >
    <h3 className={s.tasksColumn__title}>{title}</h3>
    <div className={s.tasksColumn__tasksContainer}>
      { tasks ? tasks.map((task) => {
        const {status, priority, description, title, id, createdAt, files} = task;

        return <Task key={id} files={files} id={id} createdAt={createdAt} priority={priority} title={title} status={status} description={description}/>
      }) : null }
    </div>
  </div>
}