import React, {Dispatch, SetStateAction, useRef, useState} from "react";
import s from './CommentsModal.module.scss'
import {Editor} from "@tinymce/tinymce-react";
import {Button} from "../ui/Button";
import {TinyMCE} from "../ui/TinyMCE";
import {TaskModals} from "../types";
import {ADD_COMMENT_TITLE, REPLY_COMMENT_TITLE} from "../../entities/Comment/model/commentConstants";
import {Comments} from "../../entities/Comment/ui/Comments";
import {ITask} from "../../entities/Task";
import {IComment} from "../../entities/Comment";

interface IProps {
  comments: ITask['comments'],
  modal: TaskModals,

  setModal: Dispatch<SetStateAction<TaskModals | null>>,
  addComment: (text: string) => void,
  addReplyComment: (comment: IComment, text: string) => void
}

export const CommentsModal = ({comments, modal, setModal, addComment, addReplyComment}: IProps) => {
  const editorRef = useRef<Editor['editor'] | null>(null);
  const [replyComment, setReplyComment] = useState<IComment | null>(null);

  const onAddComment = () => {
    if (editorRef.current) {
      addComment(editorRef.current.getContent());
      setModal(TaskModals.comments);
    }
  }

  const onAddReplyComment = () => {
    if (editorRef.current && replyComment) {
      addReplyComment(replyComment, editorRef.current.getContent());
      setModal(TaskModals.comments);
    }
  }

  const onReplyComment = (comment: IComment) => {
    setModal(TaskModals.replyComment)
    setReplyComment(comment)
  }

  return <>
    <div onClick={() => setModal(null)} className={s.commentsModal__darkBackground}/>
    <div className={s.commentsModal__wrapper}>

      {modal === TaskModals.comments ? <>
        <div className={s.commentsModal__container}>
          <Comments onReplyComment={onReplyComment} comments={comments}/>
        </div>
        <Button className={s.commentsModal__sendButton} onClick={() => setModal(TaskModals.addComment)}>{ADD_COMMENT_TITLE}</Button>
      </> : null}

      {modal === TaskModals.addComment ? <>
        <TinyMCE editorRef={editorRef}/>
        <Button className={s.commentsModal__sendButton} onClick={onAddComment}>{ADD_COMMENT_TITLE}</Button>
      </> : null}

      {modal === TaskModals.replyComment ? <>
        <TinyMCE editorRef={editorRef}/>
        <Button className={s.commentsModal__sendButton} onClick={onAddReplyComment}>{REPLY_COMMENT_TITLE}</Button>
      </> : null}
    </div>
  </>
}