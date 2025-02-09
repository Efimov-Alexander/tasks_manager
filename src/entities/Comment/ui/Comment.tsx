import s from "./Comment.module.scss";
import {Button} from "../../../shared/ui/Button";
import React from "react";
import {IComment, INestedComment} from "../model/types";
import {formatDistance} from "date-fns";

interface IProps {
  comment: INestedComment,
  isOpen: boolean,

  onToggleComment: (isOpen: boolean, comment: IComment) => void,
  onReplyComment: () => void,
}

export const Comment = ({ comment, isOpen, onToggleComment, onReplyComment }: IProps) => {
  const {id, createdAt, text, userName, nestingLevel, comments} = comment;

  const formattedCreatedAt = formatDistance(createdAt, new Date());
  const style = {marginLeft: `${nestingLevel * 20}px`};
  const openIcon = isOpen ? '-' : '+';

  return <div key={id} style={style} className={s.comment}>
    <div className={s.comment__commentHeader}>
      <div className={s.comment__nameBlock}>
        {comments ? <button onClick={() => onToggleComment(isOpen, comment)} className={s.comment__openButton}>{openIcon}</button> : null}
        {userName}<span>{formattedCreatedAt} ago</span>
      </div>
      <Button onClick={onReplyComment} className={s.comment__replyButton}>Reply</Button>
    </div>
    <div className={s.comment__text}>{text}</div>
  </div>
}