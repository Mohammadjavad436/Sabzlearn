import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface EditorProp {
  value: string;
  setValue: Function;
}

export default function Editor({ value, setValue }: EditorProp) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event: any, editor: any) => {
        const data = editor.getData();
        setValue(data);
      }}
    />
  );
}
