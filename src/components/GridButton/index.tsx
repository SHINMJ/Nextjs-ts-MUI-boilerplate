import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'
import axios from 'axios'
import { API_URL } from '@constants/env'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
  }),
)

export interface IGridButton {
  id: string
  funDelete: (id: string) => void
  funUpdate: (id: string) => void
}

const GridButton: React.FC<IGridButton> = ({ id, funDelete, funUpdate }) => {
  const classes = useStyles()

  const onClickModify = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    funUpdate(id)
  }

  const onClickDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    funDelete(id)
  }

  return (
    <div className={classes.root}>
      <Box mr={0.5}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={onClickModify}
        >
          수정
        </Button>
      </Box>
      <Box ml={0.5}>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={onClickDelete}
        >
          삭제
        </Button>
      </Box>
    </div>
  )
}

export default GridButton
