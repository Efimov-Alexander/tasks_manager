import {Button} from "../../../shared/ui/Button";
import React from "react";

import s from './TaskComments.module.scss'

export const TaskComments = () => {
  return <div className={s.taskComments}>
    <h4>Commentaries:</h4>
    <div className={s.taskComments__comment}>Nice idea! <Button className={s.taskComments__replyButton} >Reply</Button></div>
    <div className={`${s.taskComments__comment} ${s.taskComments__commentReply}`}>I'm agree, bon need to repair! <Button className={s.taskComments__replyButton} >Reply</Button></div>
    <div className={`${s.taskComments__comment} ${s.taskComments__commentReply}`}>We'll repair it! <Button className={s.taskComments__replyButton} >Reply</Button>
    </div>
    <Button className={s.taskComments__addCommentButton} >Add comment</Button>
  </div>
}