import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Editor from '@components/Editor'

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {},
  }),
)

const config = {
  headers: { 'content-type': 'multipart/form-data' },
}

function TermsItem(props) {
  const classes = useStyles(props)

  return (
    <>
      <Typography variant="h5">TermsItem</Typography>
      <Typography variant="h6">TermsItem </Typography>

      <Editor />
    </>
  )
}

export default TermsItem
