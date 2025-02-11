import React, {Dispatch, SetStateAction, useRef} from "react";
import s from './CommentsModal.module.scss'
import {Editor} from "@tinymce/tinymce-react";
import {Button} from "../ui/Button";
import {TinyMCE} from "../ui/TinyMCE";
import {TaskModals} from "../types";
import {ADD_COMMENT_TITLE, REPLY_COMMENT_TITLE} from "../../entities/Comment/model/commentConstants";
import {Comments} from "../../entities/Comment/ui/Comments";
import {ITask} from "../../entities/Task";

interface IProps {
  comments: ITask['comments'],
  modal: TaskModals,

  setModal: Dispatch<SetStateAction<TaskModals | null>>,
  addComment: (text: string) => void,
  replyComment: (text: string) => void
}

export const CommentsModal = ({comments, modal, setModal, addComment, replyComment}: IProps) => {
  const editorRef = useRef<Editor['editor'] | null>(null);

  const onSendComment = (callBack: (text: string) => void) => {
    if (editorRef.current) {
      callBack(editorRef.current.getContent());
      setModal(TaskModals.comments);
    }
  }

  return <>
    <div onClick={() => setModal(null)} className={s.commentsModal__darkBackground}/>
    <div className={s.commentsModal__wrapper}>

      {modal === TaskModals.comments ? <>
        <div className={s.commentsModal__container}>
          <Comments onReplyComment={() => setModal(TaskModals.replyComment)} comments={comments}/>
        </div>
        <Button className={s.commentsModal__sendButton} onClick={() => setModal(TaskModals.addComment)}>{ADD_COMMENT_TITLE}</Button>
      </> : null}

      {modal === TaskModals.addComment ? <>
        <TinyMCE editorRef={editorRef}/>
        <Button className={s.commentsModal__sendButton} onClick={() => onSendComment(addComment)}>{ADD_COMMENT_TITLE}</Button>
      </> : null}

      {modal === TaskModals.replyComment ? <>
        <TinyMCE editorRef={editorRef}/>
        <Button className={s.commentsModal__sendButton} onClick={() => onSendComment(replyComment)}>{REPLY_COMMENT_TITLE}</Button>
      </> : null}
    </div>
  </>
}