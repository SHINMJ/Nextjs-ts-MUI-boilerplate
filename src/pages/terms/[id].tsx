import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Editor from '@components/Editor'
import {
  Button,
  CardActions,
  CardContent,
  Card,
  Grid,
  Typography,
  Select,
  Backdrop,
  CircularProgress,
  Snackbar,
} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box'
import { useRouter } from 'next/router'
import Popover from '@material-ui/core/Popover'
import { ITermsItem } from '.'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import Alert, { Color } from '@material-ui/lab/Alert'
import axios, { Method } from 'axios'
import { API_URL, SERVER_API_URL } from '@constants/env'
import useSWR from 'swr'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiOutlinedInput-input': {
        padding: theme.spacing(2),
      },
    },
    label: {
      padding: theme.spacing(2),
      textAlign: 'center',
      backgroundColor: theme.palette.background.default,
    },
    switch: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    buttonContainer: {
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

/**
 * @TODO
 * 공통코드 조회
 */
const typeList = [
  {
    value: 'TOS',
    label: '이용약관',
  },
  {
    value: 'PP',
    label: '개인정보보호지침',
  },
]

interface ITermsFormInput {
  termsType: string
  isUse: boolean
  title: string
  contents: { contents?: string; url?: string }
}

const TermsItem = props => {
  const { id, initData } = props
  const classes = useStyles()
  const route = useRouter()

  const [termsContents, setTermsContents] = useState<string>(
    initData?.contents?.contents || '',
  )

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

  const methods = useForm<ITermsFormInput>()
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = methods

  const handlePopover = (target: HTMLButtonElement | null) => {
    setAnchorEl(target)
  }

  const onSubmit = async (formData: ITermsFormInput) => {
    setBackdrop(true)
    const saved = {
      ...formData,
      type: formData.termsType,
      registDate: id > -1 ? initData.registDate : new Date(),
      contents: {
        ...formData.contents,
        contents: termsContents,
        url: null,
      },
    }

    try {
      let method: Method = 'post'
      let url: string = `${API_URL}/terms`
      if (id > -1) {
        method = 'put'
        url = `${API_URL}/terms/${id}`
      }

      const result = await axios({
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(saved),
      })
      handlePopover(null)
      setBackdrop(false)
      setSnacbar({
        open: true,
        severity: 'success',
        message: 'saved Success',
      })
    } catch (error) {
      console.log(`terms save error ${error.message}`)
      handlePopover(null)
      setBackdrop(false)
      setSnacbar({
        open: true,
        severity: 'error',
        message: error.message,
      })
    }
  }

  const saveOpen = Boolean(anchorEl)
  const savePopId = saveOpen ? 'simple-popover' : undefined
  const snackbarClose = () => {
    setSnacbar({
      ...snackbar,
      open: false,
    })
  }

  return (
    <div className={classes.root}>
      <FormProvider {...methods}>
        <form>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={2}>
              <Paper className={classes.label}>구분</Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="termsType"
                render={({ field }) => (
                  <Select variant="outlined" fullWidth {...field}>
                    {typeList.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                control={control}
                defaultValue={initData?.type || 'TOS'}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Paper className={classes.label}>사용여부</Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.switch}>
                <Controller
                  name="isUse"
                  render={({ field }) => (
                    <Switch
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      {...field}
                    />
                  )}
                  control={control}
                  defaultValue={initData?.isUse}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Paper className={classes.label}>약관제목</Paper>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Box boxShadow={1}>
                <Controller
                  name="title"
                  render={({ field }) => (
                    <TextField
                      id="outlined-full-width"
                      placeholder="제목을 입력하세요."
                      fullWidth
                      variant="outlined"
                      {...field}
                    />
                  )}
                  control={control}
                  defaultValue={initData?.title || ''}
                  rules={{ required: true }}
                />
                {errors.title && errors.title.type === 'required' && (
                  <Alert severity="error" variant="outlined">
                    제목은 필수 입력입니다!!
                  </Alert>
                )}
              </Box>
            </Grid>
          </Grid>
          <Editor contents={termsContents} setContents={setTermsContents} />
        </form>
      </FormProvider>
      <Box className={classes.buttonContainer}>
        <Button
          variant="contained"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault()
            route.push(`/terms`)
          }}
          color="default"
        >
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
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleSubmit(onSubmit)}
              >
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
    </div>
  )
}

TermsItem.getInitialProps = async context => {
  const { id } = context.query
  let data = {}
  try {
    const result = await axios.get(`${API_URL}/terms/${id}`)
    if (result) {
      data = result.data
    }
  } catch (error) {
    console.log(`terms item query error ${error.message}`)
  }

  return {
    id: id,
    initData: data,
  }
}

export default TermsItem
