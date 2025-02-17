import React, {useEffect, useState} from "react";

import {ITask} from "src/entities/Task";
import {Comment, IComment} from "src/entities/Comment";

import {collectNestedComments, isVisibleNestedComments, removeNestedComments} from "../lib/helpers";

import s from './CommentsList.module.scss'

interface IProps {
  comments?: ITask['comments'],
  onReplyComment: (comment: IComment) => void,
}

export const CommentsList = ({ comments, onReplyComment }: IProps) => {
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

  const renderComments = (comments: IComment[]) => {
    return comments.map((comment) => {
      const isVisibleComment = visibleComments.some((someComment) => someComment.id === comment.id);

      if (!isVisibleComment) return null;

      const {comments: nestedComments, id} = comment;
      const isOpen = isVisibleNestedComments({nestedComments, visibleComments});

      return <Comment onReplyComment={() => onReplyComment(comment)} key={id} comment={comment} onToggleComment={onToggleComment} isOpen={isOpen}/>
    })
  };

  return <div className={s.commentsList}>
    { defaultAndNestedComments.length ? renderComments(defaultAndNestedComments) : null}
  </div>
}