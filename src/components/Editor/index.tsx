import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Loader from '@components/Loader'
// import CKEditor from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const Editor = () => {
  const editorRef = useRef<any>()
  const [data, setData] = useState<string>('')
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    }

    setEditorLoaded(true)
  }, [])

  return (
    <>
      {editorLoaded ? (
        <CKEditor
          editor={ClassicEditor}
          data="<p>hello ckeditor</p>"
          onReady={(editor: any) => {
            console.log('editor is ready to use', editor)
          }}
          onChange={(event: any, editor: any) => {
            const data = editor.getData()
            console.log({ event, editor, data })
            setData(data)
          }}
          onBlur={(event: any, editor: any) => {
            console.log('Blur.', editor)
          }}
          onFocus={(event: any, editor: any) => {
            console.log('Focus.', editor)
          }}
        />
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Editor
