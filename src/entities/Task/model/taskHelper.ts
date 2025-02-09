import { ITask} from "./types";
import React, {useContext} from "react";
import {getStorageId, ProjectsContext, setStorageId} from "../../../app/model/appHelper";
import {IComment} from "../../Comment";
import {COMMENT_ID_KEY, TASK_ID_KEY} from "../../../app/constants/localStorage";
import {TITLE_MAX_LENGTH} from "../constants/taskConstants";


export const useChangeTaskValue = () => {
  const { setProjects, projects } = useContext(ProjectsContext);

  function changeTaskValue<ValueName extends keyof ITask> ({task, value, valueName}: { task: ITask, value: ITask[ValueName], valueName: ValueName }) {
    projects.forEach((project) => {
      if (!project.tasks) return;

      project.tasks.forEach((someTask) => {
        if (someTask.id === task.id) someTask[valueName] = value
      })
    })

    setProjects([...projects])
  }

  return { changeTaskValue }
}

export const useAddComment = () => {
  const {changeTaskValue} = useChangeTaskValue();

  const addComment = ({text, task}: {text: string, task: ITask}) => {
    const commentId = getStorageId(COMMENT_ID_KEY);
    const newComment: IComment = {
      text,
      id: commentId,
      createdAt: new Date(),
      userName: 'User'
    }

    const newComments = task.comments ? [...task.comments] : [];
    newComments.push(newComment);

    changeTaskValue({ valueName: 'comments', task, value: newComments })
    setStorageId(commentId + 1, TASK_ID_KEY);
  }

  return {addComment}
}

export const useOnDrop = () => {
  const {changeTaskValue} = useChangeTaskValue();

  const onDrop = (droppedFiles: object[], task: ITask) => {
    const newFiles = task.files ? task.files.concat(droppedFiles) : droppedFiles;

    changeTaskValue<keyof ITask>({ task, valueName:'files', value: newFiles })
  }

  return {onDrop}
}

export const useOnTitleChange = () => {
  const {changeTaskValue} = useChangeTaskValue();

  const titleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, task: ITask) => {
    const newValue = e.currentTarget.value;

    if (newValue.length > TITLE_MAX_LENGTH) return;

    changeTaskValue<keyof ITask>({valueName: 'title', task, value: newValue})
  }

  return {titleChange}
}
