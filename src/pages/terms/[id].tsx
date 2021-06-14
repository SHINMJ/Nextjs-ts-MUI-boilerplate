import React, { useState } from 'react'
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
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import { API_URL } from '@constants/env'

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
  }),
)

/**
 * @TODO
 * 공통코드 조회
 */
const typeList = [
  {
    value: 'type_1',
    label: '이용약관',
  },
  {
    value: 'type_2',
    label: '개인정보보호지침',
  },
]

interface ITermsFormInput {
  termsType: string
  isUse: boolean
  title: string
  contents: string
}

const TermsItem = (props: ITermsItem) => {
  const { id, type, isUse, title, contents } = props
  const classes = useStyles()
  const route = useRouter()

  const [termsContents, setTermsContents] = useState<string>(
    contents?.contents || '',
  )

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const methods = useForm<ITermsFormInput>()
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = methods

  const onClickCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    route.back()
  }

  const handlePopover = (target: HTMLButtonElement | null) => {
    setAnchorEl(target)
  }

  const onSubmit = async (data: ITermsFormInput) => {
    const saved = { ...data, contents: termsContents }
    console.log('data', saved)
    try {
      const result = await axios.post(`${API_URL}/v1/terms`, saved)
      console.log(result)
    } catch (error) {
      console.log(`terms save error ${error.message}`)
    }
  }

  const cancelOpen = Boolean(anchorEl)
  const cancelPopId = cancelOpen ? 'simple-popover' : undefined

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
                defaultValue={type || 'type_1'}
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
                  defaultValue={isUse === undefined ? true : isUse}
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
                  defaultValue={title || ''}
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
            handlePopover(event.currentTarget)
          }}
        >
          취소
        </Button>
        <Popover
          id={cancelPopId}
          open={cancelOpen}
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
              <Typography variant="h5">취소할까요?</Typography>
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
                onClick={onClickCancel}
              >
                확인
              </Button>
            </CardActions>
          </Card>
        </Popover>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          저장
        </Button>
      </Box>
    </div>
  )
}

// TermsItem.getInitialProps =  async context => {
//   const id = context.
//   return {}
// }

export default TermsItem
