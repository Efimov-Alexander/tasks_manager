import {Editor} from "@tinymce/tinymce-react";
import React from "react";

import {TINY_MCE_API_KEY} from "../constants/apiKeys";
import {TINY_CONTENT_STYLE} from "../constants/constants";

import s from './TinyMCE.module.scss'

interface IProps {
  editorRef: React.MutableRefObject<Editor['editor'] | null>
  initValue?: string
}

export const TinyMCE = ({ editorRef, initValue = '' }: IProps) => {
  return <div className={s.tinyMCE}>
    <Editor
      apiKey={TINY_MCE_API_KEY}
      onInit={(_evt, editor) => editorRef.current = editor}
      initialValue={initValue}
      init={{
        menubar: false,
        statusbar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ',
        content_style: TINY_CONTENT_STYLE,
      }}
    />
  </div>
}