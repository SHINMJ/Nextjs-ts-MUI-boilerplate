import React, { useEffect, useRef, useState } from 'react'
import Loader from '@components/Loader'
import { API_URL, SERVER_API_URL } from '@constants/env'

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
          data={data}
          config={{
            // plugins: [SimpleUploadAdapter],
            ckfinder: {
              uploadUrl: `${API_URL}/demo/upload`,
            },
          }}
          onReady={(editor: any) => {
            console.log('editor is ready to use', editor)
          }}
          onChange={(event: any, editor: any) => {
            const chanagedata = editor.getData()
            console.log({ event, editor, chanagedata })
            setData(chanagedata)
          }}
          onBlur={(event: any, editor: any) => {
            console.log('Blur.', editor)
          }}
          onFocus={(event: any, editor: any) => {
            console.log('Focus.', editor)
          }}
          onError={({ phase, willEditorRestart }) => {
            // If the editor is restarted, the toolbar element will be created once again.
            // The `onReady` callback will be called again and the new toolbar will be added.
            // This is why you need to remove the older toolbar.
            console.log('onerror', phase)
            // console.log(willEditorRestart)
          }}
        />
      ) : (
        <Loader />
      )}
      <div
        className="ck-content"
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>
    </>
  )
}

export default Editor
