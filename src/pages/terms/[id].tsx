import React, { useState } from 'react'
import axios, { Method } from 'axios'
import { useRouter } from 'next/router'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Editor from '@components/Editor'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box'
import Alert, { Color } from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'

import { API_URL } from '@constants/env'
import EditButton, { IAlertMessage } from '@components/DetailButtons'
import { useRecoilValue } from 'recoil'
import { menuAuthSelect } from '@stores'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(1),
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

  //상태관리 hook
  const menuAuth = useRecoilValue(menuAuthSelect)
  console.log(menuAuth)

  //Editor contents
  const [termsContents, setTermsContents] = useState<string>(
    initData?.contents?.contents || '',
  )

  //form hook
  const methods = useForm<ITermsFormInput>({
    defaultValues: {
      termsType: initData?.type || 'TOS',
      isUse: initData?.isUse || true,
      title: initData?.title,
    },
  })
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = methods

  // <목록, 저장> 버튼 component 상태 전이
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [saveMessage, setSaveMessage] = useState<IAlertMessage>({
    severity: 'success',
    message: '저장되었습니다!!',
  })

  //onsubmit 저장
  const onSubmit = async (formData: ITermsFormInput) => {
    setIsLoading(true)
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

      setIsLoading(false)
      setSaveMessage({ severity: 'success', message: 'saved Success' })
    } catch (error) {
      console.log(`terms save error ${error.message}`)
      setIsLoading(false)
      setSaveMessage({ severity: 'error', message: error.message })
    }
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
                  render={({ field: { onChange, ref, value } }) => (
                    <Switch
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      onChange={onChange}
                      inputRef={ref}
                      checked={value}
                    />
                  )}
                  control={control}
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
      <EditButton
        handleList={() => {
          route.push('/terms')
        }}
        handleSave={handleSubmit(onSubmit)}
        isLoading={isLoading}
        saveMessage={saveMessage}
      />
    </div>
  )
}

//initialprops에서 데이터 조회
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
