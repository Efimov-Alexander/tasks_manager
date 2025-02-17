import {useContext} from "react";

import {getStorageValue, setStorageValue} from "src/shared";
import {COMMENT_ID_KEY, IComment} from "src/entities/Comment";
import {useChangeSubTaskValue, useChangeTaskValue} from "src/entities/Task";
import {getProjectByTask, ProjectsContext} from "src/entities/Project";

import {addNestedComment} from "./helpers";

import type {ITask} from "src/entities/Task";

export const useAddComment = () => {
  const {changeTaskValue} = useChangeTaskValue();
  const {changeSubTaskValue} = useChangeSubTaskValue();

  const addComment = ({text, task}: {text: string, task: ITask}) => {
    const commentId = getStorageValue(COMMENT_ID_KEY);

    if (!commentId || typeof commentId !== 'number') return

    const newComment: IComment = {
      text,
      id: commentId,
      createdAt: new Date(),
      userName: 'User'
    }

    const newComments = task.comments ? [...task.comments] : [];
    newComments.push(newComment);

    task.mainTask ?
      changeSubTaskValue({valueName: 'comments', task, value: newComments})
      : changeTaskValue({valueName: 'comments', task, value: newComments})

    setStorageValue({key: COMMENT_ID_KEY, value: commentId + 1});
  }

  return {addComment}
}

export const useReplyComment = () => {
  const {changeTaskValue} = useChangeTaskValue();
  const {changeSubTaskValue} = useChangeSubTaskValue();
  const {projects} = useContext(ProjectsContext);

  const replyComment = ({text, task, comment}: {text: string, task: ITask, comment: IComment}) => {
    const project = getProjectByTask({projects, task})
    const commentId = getStorageValue(COMMENT_ID_KEY);

    if (!project || !project.tasks || !task.comments) return
    if (!commentId || typeof commentId !== 'number') return

    const newComment: IComment = {
      text,
      id: commentId,
      createdAt: new Date(),
      userName: 'User'
    }

    addNestedComment(task.comments, comment.id, newComment);

    task.mainTask ?
      changeSubTaskValue({valueName: 'comments', task, value: task.comments})
      : changeTaskValue({valueName: 'comments', task, value: task.comments})

    setStorageValue({value: commentId + 1, key: COMMENT_ID_KEY});
  }

  return {replyComment}
}