import s from "./CommentsModal.module.scss";
import {TinyMCE} from "../ui/TinyMCE";
import React, {Dispatch, SetStateAction, useRef} from "react";
import {Editor} from "@tinymce/tinymce-react";
import {TaskModals} from "../types";
import {TTaskOrSubTask} from "../../entities/Task/model/types";
import {useChangeDescription} from "../../pages/ProjectTasks/model/hooks";

interface IProps {
  setModal: Dispatch<SetStateAction<TaskModals | null>>,
  task: TTaskOrSubTask
}

export const DescriptionModal = ({setModal, task}: IProps) => {
  const editorRef = useRef<Editor['editor'] | null>(null);
  const {changeDescription} = useChangeDescription();

  const onCloseModal = () => {
    if (editorRef.current) {
      const newDescription = editorRef.current.getContent();

      changeDescription(newDescription, task)
      setModal(null);
    }
  }

  return <>
    <div onClick={onCloseModal} className={s.commentsModal__darkBackground}/>
    <div className={s.commentsModal__wrapper}>
      <TinyMCE initValue={task.description} editorRef={editorRef}/>
    </div>
  </>
}