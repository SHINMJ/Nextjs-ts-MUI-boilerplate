import React, { useEffect, useRef, useState } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Loader from '@components/Loader'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: theme.palette.background.paper,
    },
  }),
)

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
          // placeholder="hello ckeditor"
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
        />
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Editor
