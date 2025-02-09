import {Button} from "../../../shared/ui/Button";
import React, {useEffect, useState} from "react";

import s from './Comments.module.scss'
import {ITask} from "../../Task/model/types";
import {collectNestedComments, isVisibleNestedComments, removeNestedComments} from "../model/commentHelper";
import {IComment, INestedComment} from "../model/types";
import {Comment} from "./Comment";
import {ADD_COMMENT_TITLE} from "../model/commentConstants";

interface IProps {
  comments?: ITask['comments'],
  onReplyComment: () => void,
}

export const Comments = ({ comments, onReplyComment }: IProps) => {
  const defaultAndNestedComments = collectNestedComments(comments)
  const [visibleComments, setVisibleComments] = useState<IComment[]>(comments ? comments : []);

  useEffect(() => {
    if (!visibleComments.length && comments) setVisibleComments(comments)
  }, [comments])

  const onToggleComment =  (isOpen: boolean, comment: IComment) => {
    setVisibleComments((prevComments) => {
      if (isOpen) return removeNestedComments(visibleComments, comment);
      if (!comment || !comment.comments) return prevComments;

      return [...prevComments, ...comment.comments]
    })
  }

  const renderComments = (comments: INestedComment[]) => {
    return comments.map((comment) => {
      const isVisibleComment = visibleComments.some((someComment) => someComment.id === comment.id);

      if (!isVisibleComment) return null;

      const {comments: nestedComments, id} = comment;
      const isOpen = isVisibleNestedComments(nestedComments, visibleComments);

      return <Comment onReplyComment={onReplyComment} key={id} comment={comment} onToggleComment={onToggleComment} isOpen={isOpen}/>
    })
  };

  return <div className={s.taskComments}>
    { defaultAndNestedComments.length ? renderComments(defaultAndNestedComments) : null}
  </div>
}