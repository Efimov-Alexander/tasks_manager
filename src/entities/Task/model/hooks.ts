import {ISubtask, ITask, TaskStatus, TTaskOrSubTask} from "./types";
import React, {useContext} from "react";
import {getStorageId, ProjectsContext, setStorageId} from "../../../app/model/appHelper";
import {IComment} from "../../Comment";
import {COMMENT_ID_KEY, TASK_ID_KEY} from "../../../app/constants/localStorage";
import {TITLE_MAX_LENGTH} from "../constants/taskConstants";
import {getProjectByTask} from "../../../pages/ProjectTasks/model/projectTasksHelper";

export const useChangeTaskValue = () => {
  const { setProjects, projects } = useContext(ProjectsContext);

  function changeTaskValue<ValueName extends keyof ITask> ({task, value, valueName}: { task: TTaskOrSubTask, value: ITask[ValueName], valueName: ValueName }) {
    const project = getProjectByTask({task, projects});

    if (!project || !project.tasks) return;

    project.tasks.forEach((someTask) => {
      if (someTask.id === task.id) {
        someTask[valueName] = value

        if (someTask.subTasks && valueName === 'title' && typeof value === 'string') someTask.subTasks.forEach((someTask) => someTask.mainTask.title = value)
      }
    })

    setProjects([...projects])
  }

  return { changeTaskValue }
}

export const useChangeSubTaskValue = () => {
  const { setProjects, projects } = useContext(ProjectsContext);

  function changeSubTaskValue<ValueName extends keyof ISubtask> ({task, value, valueName}: { task: ISubtask, value: ISubtask[ValueName], valueName: ValueName }) {
    const project = getProjectByTask({task, projects});

    if (!project || !project.tasks) return;

    project.tasks.forEach((someTask) => {
      if (!someTask.subTasks) return

      someTask.subTasks.forEach((someTask) => someTask.id === task.id ? someTask[valueName] = value : null)
    })

    setProjects([...projects])
  }

  return { changeSubTaskValue }
}

export const useAddComment = () => {
  const {changeTaskValue} = useChangeTaskValue();
  const {changeSubTaskValue} = useChangeSubTaskValue();

  const addComment = ({text, task}: {text: string, task: TTaskOrSubTask}) => {
    const commentId = getStorageId(COMMENT_ID_KEY);
    const newComment: IComment = {
      text,
      id: commentId,
      createdAt: new Date(),
      userName: 'User'
    }

    const newComments = task.comments ? [...task.comments] : [];
    newComments.push(newComment);

    'mainTask' in task ? changeSubTaskValue({valueName: 'comments', task, value: newComments}) : changeTaskValue({valueName: 'comments', task, value: newComments})
    setStorageId(commentId + 1, TASK_ID_KEY);
  }

  return {addComment}
}

export const useOnDropFiles = () => {
  const {changeTaskValue} = useChangeTaskValue();
  const {changeSubTaskValue} = useChangeSubTaskValue();

  const onDrop = (droppedFiles: object[], task: TTaskOrSubTask) => {
    const newFiles = task.files ? task.files.concat(droppedFiles) : droppedFiles;

    'mainTask' in task ? changeSubTaskValue({valueName: 'files', task, value: newFiles}) : changeTaskValue({valueName: 'files', task, value: newFiles})
  }

  return {onDrop}
}

export const useOnDropTask = () => {
  const { setProjects, projects } = useContext(ProjectsContext);

  const dropTask = ({task, column}: { task: ITask, column: TaskStatus }) => {
    const project = getProjectByTask({task,projects});

    if (!project || !project.tasks) return;

    project.tasks.forEach((someTask) => {
      if (someTask.id === task.id) {
        someTask.status = column;
        column === TaskStatus.done ? someTask.endedAt = new Date() : delete someTask.endedAt;
      }

      if (someTask.subTasks) someTask.subTasks.forEach((someTask) => {
        if (someTask.id === task.id) {
          someTask.status = column;
          column === TaskStatus.done ? someTask.endedAt = new Date() : delete someTask.endedAt;
        }
      })
    })

    setProjects([...projects])
  }

  return { dropTask }
}

export const useOnTitleChange = () => {
  const {changeTaskValue} = useChangeTaskValue();
  const {changeSubTaskValue} = useChangeSubTaskValue();

  const titleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, task: TTaskOrSubTask) => {
    const newValue = e.currentTarget.value;

    if (newValue.length > TITLE_MAX_LENGTH) return;

    'mainTask' in task ? changeSubTaskValue({valueName: 'title', task, value: newValue}) : changeTaskValue({valueName: 'title', task, value: newValue})
  }

  return {titleChange}
}
