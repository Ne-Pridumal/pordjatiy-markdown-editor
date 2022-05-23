import { EditorView } from "@codemirror/view";
import { EditorState } from '@codemirror/state'
import React, { useEffect, useRef, useState } from "react";
import CustomMirrorExtensions from "../codemirror-styles";


interface Props {
  initialDoc: string,
  onChange: (state: EditorState) => void
}

const useCodeMirror= <T extends Element>(
  props: Props
): [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null)
  const [editorView, setEditorView] = useState<EditorView>()
  const { onChange } = props
  
  useEffect(() => {
    if(!refContainer.current) return
    
    const startState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        ...CustomMirrorExtensions, 
        EditorView.updateListener.of((update: any) => {
          if (update.changes) {
            onChange(update.state)
          }
        }),
      ]
    })
    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    })

    setEditorView(view)
  }, [refContainer])
  
  return [refContainer, editorView]
}

export default useCodeMirror;
