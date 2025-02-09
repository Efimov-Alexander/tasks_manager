import React, {Dispatch, SetStateAction, useRef} from "react";
import s from './CommentsModal.module.scss'
import {Editor} from "@tinymce/tinymce-react";
import {Button} from "./Button";
import {TinyMCE} from "./TinyMCE";
import {CommentsModals} from "../types";
import {ADD_COMMENT_TITLE, REPLY_COMMENT_TITLE} from "../../entities/Comment/model/commentConstants";
import {Comments} from "../../entities/Comment/ui/Comments";
import {ITask} from "../../entities/Task";

interface IProps {
  comments: ITask['comments'],
  modal: CommentsModals,

  setModal: Dispatch<SetStateAction<CommentsModals | null>>,
  addComment: (text: string) => void,
  replyComment: (text: string) => void
}

export const CommentsModal = ({comments, modal, setModal, addComment, replyComment}: IProps) => {
  const editorRef = useRef<Editor['editor'] | null>(null);

  const onSendComment = (callBack: (text: string) => void) => {
    if (editorRef.current) {
      callBack(editorRef.current.getContent());
      setModal(CommentsModals.comments);
    }
  }

  return <>
    <div onClick={() => setModal(null)} className={s.commentsModal__darkBackground}/>
    <div className={s.commentsModal__wrapper}>

      {modal === CommentsModals.comments ? <>
        <div className={s.commentsModal__container}>
          <Comments onReplyComment={() => setModal(CommentsModals.replyComment)} comments={comments}/>
        </div>
        <Button className={s.commentsModal__sendButton} onClick={() => setModal(CommentsModals.addComment)}>{ADD_COMMENT_TITLE}</Button>
      </> : null}

      {modal === CommentsModals.addComment ? <>
        <TinyMCE editorRef={editorRef}/>
        <Button className={s.commentsModal__sendButton} onClick={() => onSendComment(addComment)}>{ADD_COMMENT_TITLE}</Button>
      </> : null}

      {modal === CommentsModals.replyComment ? <>
        <TinyMCE editorRef={editorRef}/>
        <Button className={s.commentsModal__sendButton} onClick={() => onSendComment(replyComment)}>{REPLY_COMMENT_TITLE}</Button>
      </> : null}
    </div>
  </>
}