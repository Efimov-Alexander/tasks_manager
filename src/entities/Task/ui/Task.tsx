import {ITask, TaskStatus} from "../index";

import s from './Task.module.scss'
import {useDrag} from "react-dnd";
import {format, formatDistance} from "date-fns";
import {useDropzone} from "react-dropzone";
import React, {useRef, useState} from "react";
import {useAddComment, useOnDrop, useOnTitleChange} from "../model/taskHelper";
import {PrioritySelect} from "./PrioritySelect";
import {TinyMCE} from "../../../shared/ui/TinyMCE";
import {Editor} from "@tinymce/tinymce-react";
import {Button} from "../../../shared/ui/Button";
import {CommentsModal} from "../../../shared/ui/CommentsModal";
import {CommentsModals} from "../../../shared/types";
import cn from "classnames";

interface IProps extends ITask {
}

export const ItemTypes = {
  task: 'task'
}

export const Task = (task: IProps) => {
  const editorRef = useRef<Editor['editor'] | null>(null);
  const [modal, setModal] = useState<CommentsModals | null>(null);
  const {getRootProps, getInputProps} = useDropzone({onDrop: (droppedFiles) => onDrop(droppedFiles, task)})
  const [_, drag] = useDrag({ type: ItemTypes.task, item: task })
  const { titleChange } = useOnTitleChange();
  const {addComment } = useAddComment();
  const {onDrop } = useOnDrop();

  const { title, description, priority, id, createdAt, files, comments} = task;
  const formattedCreatedAt = `${format(createdAt, "MMM d, yyyy")} at ${format(createdAt, "HH:m")}`;
  const timeAtWork = formatDistance(createdAt, new Date());
  const taskClassName = cn(s.task, {
    [s.task_done]: task.status === TaskStatus.done,
  })

  const onAddComment = (text: string) => addComment({task,text})
  const onReplyComment = (text: string) => addComment({task,text})
  const onTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => titleChange(e, task);
  const onOpenCommentaries = () => setModal(CommentsModals.comments)

  return <div ref={drag} className={taskClassName}>
    <div className={s.task__titleContainer}>
      <div className={s.task__titileNumber}>{`${id} - `} </div>
      <textarea className={s.task__titleTextarea} spellCheck={false} value={title} onChange={onTitleChange}/>
    </div>
    <div className={s.task__dates}>This task created: {formattedCreatedAt}</div>
    <div className={s.task__dates}>Time at work: {timeAtWork}</div>
    <PrioritySelect selectedValue={priority}/>
    <div className={s.task__descriptionNote}>Description:</div>
    <TinyMCE initValue={description} editorRef={editorRef}/>
    <div {...getRootProps({className: s.task__dropzone})}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
    <ul>
      {files ? files.map(file => <li className={s.task__loadedFile} key={file.path}>{file.path}</li>) : null}
    </ul>
    { comments ?
      <Button onClick={onOpenCommentaries}>{`Commentaries (${comments.length})`}</Button>
      :
      <Button onClick={() => setModal(CommentsModals.addComment)} >Add comment</Button>
    }

    {modal ? <CommentsModal modal={modal} comments={comments} setModal={setModal} replyComment={onReplyComment} addComment={onAddComment}/> : null}
  </div>;
};
