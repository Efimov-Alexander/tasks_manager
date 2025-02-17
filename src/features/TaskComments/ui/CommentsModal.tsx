import React, {Dispatch, SetStateAction, useRef, useState} from "react";
import {Editor} from "@tinymce/tinymce-react";

import {Button, Modal, TinyMCE} from "src/shared";

import {CommentsModals} from "../model/types";
import {CommentsList} from "./CommentsList";

import type {ITask} from "src/entities/Task";
import type {IComment} from "src/entities/Comment";

import s from './CommentsModal.module.scss'

interface IProps {
  comments: ITask['comments'],
  modal: CommentsModals,

  setModal: Dispatch<SetStateAction<CommentsModals | null>>,
  addComment: (text: string) => void,
  replyComment: (comment: IComment, text: string) => void
}

export const CommentsModal = ({comments, addComment, setModal, modal, replyComment: addReplyComment}: IProps) => {
  const editorRef = useRef<Editor['editor'] | null>(null);
  const [replyComment, setReplyComment] = useState<IComment | null>(null);

  const onAddComment = () => {
    if (editorRef.current) {
      addComment(editorRef.current.getContent());
      setModal(CommentsModals.comments);
    }
  }

  const onAddReplyComment = () => {
    if (editorRef.current && replyComment) {
      addReplyComment(replyComment, editorRef.current.getContent());
      setModal(CommentsModals.comments);
    }
  }

  const onReplyComment = (comment: IComment) => {
    setModal(CommentsModals.replyComment)
    setReplyComment(comment)
  }

  const onClose = () => setModal(null);

  return <Modal onClose={onClose}>
    {modal === CommentsModals.comments ? <>
      <div className={s.commentsModal__container}>
        <CommentsList onReplyComment={onReplyComment} comments={comments}/>
      </div>
      <Button className={s.commentsModal__sendButton} onClick={() => setModal(CommentsModals.addComment)}>Add comment</Button>
    </> : null}

    {modal === CommentsModals.addComment ? <>
      <TinyMCE editorRef={editorRef}/>
      <Button className={s.commentsModal__sendButton} onClick={onAddComment}>Add comment</Button>
    </> : null}

    {modal === CommentsModals.replyComment ? <>
      <TinyMCE editorRef={editorRef}/>
      <Button className={s.commentsModal__sendButton} onClick={onAddReplyComment}>Reply on comment</Button>
    </> : null}
  </Modal>
}