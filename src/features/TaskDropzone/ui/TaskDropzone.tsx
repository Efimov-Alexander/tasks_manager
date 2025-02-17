import React from "react";
import {useDropzone} from "react-dropzone";

import {useChangeSubTaskValue, useChangeTaskValue} from "src/entities/Task";

import type {ITask} from "src/entities/Task";

import s from './TaskDropzone.module.scss'

interface IProps {
  task: ITask,
}

export const TaskDropzone = ({task}: IProps) => {
  const {changeTaskValue} = useChangeTaskValue();
  const {changeSubTaskValue} = useChangeSubTaskValue();

  const onDrop = (droppedFiles: object[], task: ITask) => {
    const newFiles = task.files ? task.files.concat(droppedFiles) : droppedFiles;

    'mainTask' in task ?
      changeSubTaskValue({valueName: 'files', task, value: newFiles})
      : changeTaskValue({valueName: 'files', task, value: newFiles})
  }

  const {getRootProps, getInputProps} = useDropzone({onDrop: (droppedFiles) => onDrop(droppedFiles, task)})

  return <>
    <div className={s.taskDropzone__dropzone} {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
    <ul className={s.taskDropzone__files}>
      {task.files ? task.files.map(file => <li className={s.taskDropzone__loadedFile} key={file.path}>{file.path}</li>) : null}
    </ul>
  </>
}