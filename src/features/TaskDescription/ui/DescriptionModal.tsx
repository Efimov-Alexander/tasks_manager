import React, {Dispatch, SetStateAction, useRef} from "react";
import {Editor} from "@tinymce/tinymce-react";

import {TinyMCE, Modal} from "src/shared";
import {useChangeSubTaskValue, useChangeTaskValue} from "src/entities/Task";

import type {ITask} from "src/entities/Task";

interface IProps {
  setModal: Dispatch<SetStateAction<boolean>>,
  task: ITask
}

export const DescriptionModal = ({setModal, task}: IProps) => {
  const editorRef = useRef<Editor['editor'] | null>(null);
  const {changeTaskValue} = useChangeTaskValue()
  const {changeSubTaskValue} = useChangeSubTaskValue()

  const onClose = () => {
    if (editorRef.current) {
      const newDescription = editorRef.current.getContent();

      'mainTask' in task ?
        changeSubTaskValue({valueName: 'description', task, value: newDescription})
        : changeTaskValue({valueName: 'description', task, value: newDescription})
    }

    setModal(false);
  }

  return <Modal onClose={onClose}>
    <TinyMCE initValue={task.description} editorRef={editorRef}/>
  </Modal>
}