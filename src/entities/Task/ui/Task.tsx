import {ITask, TaskStatus} from "../index";

import s from './Task.module.scss'
import {useDrag} from "react-dnd";
import {useDropzone} from "react-dropzone";
import React, {useState} from "react";
import {useAddComment, useOnDropFiles, useOnTitleChange, useReplyComment} from "../model/hooks";
import {PrioritySelect} from "./PrioritySelect";
import {Button} from "../../../shared/ui/Button";
import {CommentsModal} from "../../../shared/modals/CommentsModal";
import {TaskModals} from "../../../shared/types";
import cn from "classnames";
import {collectNestedComments} from "../../Comment/model/commentHelper";
import {Dates} from "./Dates";
import { useAddSubTask} from "../../../pages/ProjectTasks/model/hooks";
import {TTaskOrSubTask} from "../model/types";
import {DescriptionModal} from "../../../shared/modals/DescriptionModal";
import {onFindTask} from "../../../pages/ProjectTasks/model/projectTasksHelper";
import {IComment} from "../../Comment";

type IProps = {
  task: TTaskOrSubTask
}

export const ItemTypes = {
  task: 'task'
}

export const Task = ({task}: IProps) => {
  const [modal, setModal] = useState<TaskModals | null>(null);
  const {getRootProps, getInputProps} = useDropzone({onDrop: (droppedFiles) => onDrop(droppedFiles, task)})
  const [_, drag] = useDrag({ type: ItemTypes.task, item: task })
  const { titleChange } = useOnTitleChange();
  const {addComment } = useAddComment();
  const {replyComment} = useReplyComment();
  const {onDrop } = useOnDropFiles();
  const {addSubtask} = useAddSubTask();

  const { title, description, priority, id, createdAt, files, comments, endedAt} = task;
  const defaultAndNestedComments = collectNestedComments(comments)
  const commentariesButton = `Commentaries (${defaultAndNestedComments.length})`;

  const taskClassName = cn(s.task, {
    [s.task_done]: task.status === TaskStatus.done,
  })

  const onModalAddComment = (text: string) => addComment({task,text})
  const onReplyComment = (comment: IComment, text: string) => replyComment({comment,text, task})
  const onTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => titleChange(e, task);
  const onOpenCommentaries = () => setModal(TaskModals.comments)
  const onAddComment = () => setModal(TaskModals.addComment)
  const onAddSubtask = () => addSubtask({task})
  const onOpenDescription = () => setModal(TaskModals.description)
  const renderSubTasks = (tasks: ITask[]) => tasks.map((task) => <div onClick={() => onFindTask(task.id)} className={s.task__subtasksItem}>{task.id} - {task.title}</div>)

  return <div id={`${id}`} ref={drag} className={taskClassName}>
    <div className={s.task__titleContainer}>
      <div className={s.task__titileNumber}>{`${id} - `} </div>
      <textarea className={s.task__titleTextarea} spellCheck={false} value={title} onChange={onTitleChange}/>
    </div>

    <Dates createdAt={createdAt} endedAt={endedAt}/>
    <PrioritySelect key={task.id} task={task} selectedValue={priority}/>

    {'mainTask' in task ? <div className={s.task__subtasks}>
      Main Task:
      <div className={s.task__subtasksItem} onClick={() => onFindTask(task.mainTask.id)}>{task.mainTask.id} - {task.mainTask.title}</div>
    </div> : null}

    {'subTasks' in task && task.subTasks ? <div className={s.task__subtasks}>
      Subtasks:
      {renderSubTasks(task.subTasks)}
    </div> : null}

    <div className={s.task__descriptionNote}>
      Description:
      <div onClick={onOpenDescription} className={s.task__description} dangerouslySetInnerHTML={{__html: description}}/>
    </div>

    <div {...getRootProps({className: s.task__dropzone})}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
    <ul className={s.task__files}>
      {files ? files.map(file => <li className={s.task__loadedFile} key={file.path}>{file.path}</li>) : null}
    </ul>

    <div className={s.task__buttonsBlock}>
      { comments ? <Button onClick={onOpenCommentaries}>{commentariesButton}</Button> : <Button onClick={onAddComment} >Add comment</Button> }
      {'mainTask' in task ? null : <Button onClick={onAddSubtask}>Add subtask</Button>}
    </div>

    {modal && modal !== TaskModals.description ? <CommentsModal modal={modal} comments={comments} setModal={setModal} addReplyComment={onReplyComment} addComment={onModalAddComment}/> : null}

    {modal === TaskModals.description ? <DescriptionModal task={task} setModal={setModal}/> : null }
  </div>;
};
