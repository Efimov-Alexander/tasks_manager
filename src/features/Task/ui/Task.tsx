import {ITask, TaskPriority} from "../index";

import s from './Task.module.scss'
import {useDrag} from "react-dnd";
import {format, formatDistance} from "date-fns";
import {DropzoneOptions, useDropzone} from "react-dropzone";
import React from "react";
import {useChangeTaskValue} from "../model/tasksLogic";
import {TaskComments} from "./TaskComments";
import cn from "classnames";
import {PrioritySelect} from "./PrioritySelect";

interface IProps extends ITask {
}

export const ItemTypes = {
  task: 'task'
}

export const Task = (task: IProps) => {
  const { title, description, priority, id, createdAt} = task;
  const timeAtWork = formatDistance(createdAt, new Date());
  const formattedCreatedAt = `${format(createdAt, "MMM d, yyyy")} at ${format(createdAt, "HH:m")}`;
  const { changeTaskValue } = useChangeTaskValue();
  const [_, drag] = useDrag({
    type: ItemTypes.task,
    item: task,
  })

  const onDropFiles: DropzoneOptions['onDrop'] = (files) => {
    const newFiles = task.files.concat(files);

    changeTaskValue<keyof ITask>({ task, valueName:'files', value: newFiles })
  }
  const {getRootProps, getInputProps} = useDropzone({onDrop: onDropFiles})

  const onTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement >) => {
    const newTitle = e.currentTarget.value;

    if (newTitle.length > 100) return;

    changeTaskValue<keyof ITask>({valueName: 'title', task, value: newTitle})
  }

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement >) => {
    const newDescription = e.currentTarget.value;

    if (newDescription.length > 1000) return;

    changeTaskValue<keyof ITask>({valueName: 'description', task, value: newDescription})
  }

  return <div ref={drag} className={s.task}>
    <div className={s.task__titleContainer}>
      <div className={s.task__titileNumber}>{`${id} - `} </div>
      <textarea className={s.task__titleTextarea} spellCheck={false} value={title} onChange={onTitleChange}/>
    </div>
    <div className={s.task__dates}>This task created: {formattedCreatedAt}</div>
    <div className={s.task__dates}>Time at work: {timeAtWork}</div>
    <PrioritySelect selectedValue={priority}/>
    <div className={s.task__descriptionNote}>Description:</div>
    <textarea className={s.task__description} spellCheck={false} value={description} onChange={onDescriptionChange}/>
    <div {...getRootProps({className: s.task__dropzone})}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
    <ul>
      {task.files.map(file => <li className={s.task__loadedFile} key={file.path}>{file.path}</li>)}
    </ul>
    <TaskComments/>
  </div>;
};
