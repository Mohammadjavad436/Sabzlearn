declare module "@ckeditor/ckeditor5-react" {
  import { ComponentType } from "react";
  import Editor from "@ckeditor/ckeditor5-core";

  export interface CKEditorProps {
    editor: Editor;
    config?: any;
    data?: string;
    disabled?: boolean;
    onInit?: (editor: Editor) => void;
    onChange?: (event: any, editor: Editor) => void;
    onBlur?: (event: any, editor: Editor) => void;
    onFocus?: (event: any, editor: Editor) => void;
    onError?: (event: any, editor: Editor) => void;
    className?: string;
    style?: React.CSSProperties;
  }

  const CKEditor: ComponentType<CKEditorProps>;

  export { CKEditor };
}
