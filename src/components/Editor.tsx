import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useCodeMirror from '../hooks/useCodeMirror'

interface Props {
  initialDoc: string,
  newStartValue?: string | null,
  onChange: (doc: string) => void
}

const Editor: React.FC<Props> = (props) => {
  const { onChange, initialDoc, newStartValue } = props
  const [initState, setInitState] = useState<string>(initialDoc)
  const handleChange = useCallback(
    (state: any) => {
      onChange(state.doc.toString())
      setInitState(state.doc.toString())
    },
    [onChange]
  ) 
  useMemo(() => {
    setInitState(newStartValue)
  }, [newStartValue])
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initState,
    onChange: handleChange
  })

  useEffect(() => {
    if (editorView) {
      // Do nothing for now
    }
  }, [editorView])

  return <div className='editor-wrapper' ref={refContainer}></div>
}

export default Editor
