import React, { useEffect, useState } from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Popover from '@material-ui/core/Popover'
import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography'
import Alert, { Color } from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      display: 'flex',
      margin: theme.spacing(1),
      justifyContent: 'center',
      '& .MuiButton-root': {
        margin: theme.spacing(1),
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
)

export interface IAlertMessage {
  severity: Color
  message: string
}

export interface IEditButton {
  handleList: () => void
  handleSave: () => void
  isLoading?: boolean
  saveMessage?: IAlertMessage
}

const DetailButtons: React.FC<IEditButton> = ({
  handleList,
  handleSave,
  isLoading,
  saveMessage,
}) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [backdrop, setBackdrop] = useState<boolean>(false)
  const [snackbar, setSnacbar] = useState<{
    open: boolean
    severity: Color
    message: string
  }>({
    open: false,
    severity: 'success',
    message: 'save Success!!!!',
  })
  const saveOpen = Boolean(anchorEl)
  const savePopId = saveOpen ? 'simple-popover' : undefined

  useEffect(() => {
    setBackdrop(isLoading)
    setSnacbar({
      open: saveOpen ? !isLoading : false,
      severity: saveMessage.severity,
      message: saveMessage.message,
    })
    if (!isLoading) {
      handlePopover(null)
    }
  }, [isLoading])

  const handlePopover = (target: HTMLButtonElement | null) => {
    setAnchorEl(target)
  }

  const snackbarClose = () => {
    setSnacbar({
      ...snackbar,
      open: false,
    })
  }
  return (
    <>
      <Box className={classes.container}>
        <Button variant="contained" onClick={handleList} color="default">
          목록
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            handlePopover(event.currentTarget)
          }}
        >
          저장
        </Button>
        <Popover
          id={savePopId}
          open={saveOpen}
          anchorEl={anchorEl}
          onClose={() => {
            handlePopover(null)
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h5">저장하겠습니까?</Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                onClick={() => {
                  handlePopover(null)
                }}
              >
                닫기
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleSave}>
                확인
              </Button>
            </CardActions>
          </Card>
        </Popover>
      </Box>
      <Backdrop open={backdrop} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={snackbarClose}
      >
        <Alert onClose={snackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default DetailButtons
