import React from "react";
import {useDropzone} from "react-dropzone";
import cn from "classnames";

import {useChangeSubTaskValue, useChangeTaskValue} from "src/entities/Task";

import type {ITask} from "src/entities/Task";

import s from './TaskDropzone.module.scss'

interface IProps {
  task: ITask,
  className: string,
}

export const TaskDropzone = ({task, className}: IProps) => {
  const {changeTaskValue} = useChangeTaskValue();
  const {changeSubTaskValue} = useChangeSubTaskValue();

  const classNames = cn(s.taskDropzone, className)

  const onDrop = (droppedFiles: object[], task: ITask) => {
    const newFiles = task.files ? task.files.concat(droppedFiles) : droppedFiles;

    task.mainTask ?
      changeSubTaskValue({valueName: 'files', task, value: newFiles})
      : changeTaskValue({valueName: 'files', task, value: newFiles})
  }

  const {getRootProps, getInputProps} = useDropzone({onDrop: (droppedFiles) => onDrop(droppedFiles, task)})

  return <div className={classNames}>
    <div className={s.taskDropzone__dropzone} {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
    <ul className={s.taskDropzone__files}>
      {task.files ? task.files.map(file => <li className={s.taskDropzone__loadedFile} key={file.path}>{file.path}</li>) : null}
    </ul>
  </div>
}