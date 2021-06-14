import React, { useEffect, useRef, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Loader from '@components/Loader'
import { API_URL } from '@constants/env'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
    },
  }),
)

export interface IEditor {
  contents: string
  setContents: (data: string) => void
}

const Editor = (props: IEditor) => {
  const { contents, setContents } = props
  const classes = useStyles()
  const editorRef = useRef<any>()
  // const [data, setData] = useState<string>('')
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
        <div className={classes.root}>
          <CKEditor
            editor={ClassicEditor}
            data={contents}
            config={{
              // plugins: [SimpleUploadAdapter],
              ckfinder: {
                uploadUrl: `${API_URL}/v1/upload`,
              },
            }}
            onReady={(editor: any) => {
              console.log('editor is ready to use', editor)
            }}
            onChange={(event: any, editor: any) => {
              const chanagedata = editor.getData()
              console.log({ event, editor, chanagedata })
              setContents(chanagedata)
            }}
            onBlur={(event: any, editor: any) => {
              console.log('Blur.', editor)
            }}
            onFocus={(event: any, editor: any) => {
              console.log('Focus.', editor)
            }}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Editor
