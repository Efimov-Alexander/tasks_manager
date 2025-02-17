import React, {useState} from "react";

import {Button} from "src/shared";

import {collectNestedComments} from "../lib/helpers";
import {useAddComment, useReplyComment} from "../lib/hooks";
import {CommentsModal} from "./CommentsModal";
import {CommentsModals} from "../model/types";

import type {ITask} from "src/entities/Task";
import type {IComment} from "src/entities/Comment";

import s from "./TaskComments.module.scss";

interface IProps {
  task: ITask,
}

export const TaskComments = ({task}: IProps) => {
  const [modal, setModal] = useState<CommentsModals | null>(null);
  const {addComment } = useAddComment();
  const {replyComment} = useReplyComment();

  const { comments } = task;
  const defaultAndNestedComments = collectNestedComments(comments)
  const commentariesButton = `Commentaries (${defaultAndNestedComments.length})`;

  const onAddComment = (text: string) => addComment({task,text})
  const onReplyComment = (comment: IComment, text: string) => replyComment({comment,text, task})

  return <>
    <div className={s.taskComments__container}>
      <Button disabled={!comments} onClick={() => setModal(CommentsModals.comments)}>{commentariesButton}</Button>
      <Button onClick={() => setModal(CommentsModals.addComment)}>Add comment</Button>
    </div>

    {modal ? <CommentsModal modal={modal} comments={comments} setModal={setModal} replyComment={onReplyComment} addComment={onAddComment}/> : null}
  </>
}