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
  url: string
  id: string
}

const GridButton: React.FC<IGridButton> = ({ url, id }) => {
  const classes = useStyles()
  const route = useRouter()

  const onClickModify = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    route.push(`${url}/${id}`)
  }

  const onClickDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      axios.delete(`${API_URL}/v1${url}/${id}`)
    } catch (error) {
      console.log(`grid button delete error ${error.message}`)
    }
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
