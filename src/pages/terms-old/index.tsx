import React, { createRef, useEffect, useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { useRouter } from 'next/router'

// material-ui deps
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  GridCellParams,
  GridColDef,
  GridRowsProp,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@material-ui/data-grid'
import Switch from '@material-ui/core/Switch'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

// 내부 컴포넌트 및 custom hook, etc...
import { API_URL } from '@constants/env'
import { format as dateFormat } from '@libs/date'
import DataGridDemo from '@components/Table/DataGridDemo'
import GridButton from '@components/GridButton'

// 상태관리 recoil
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { conditionAtom, conditionSelector } from '@stores'

// material-ui style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiOutlinedInput-input': {
        padding: theme.spacing(1),
      },
    },
    container: {
      paddingBottom: theme.spacing(1),
    },
    search: {
      padding: theme.spacing(1),
      textAlign: 'center',
    },
    iconButton: {
      padding: theme.spacing(1),
      marginLeft: theme.spacing(1),
      backgroundColor: theme.palette.background.default,
    },
    fab: {
      marginLeft: theme.spacing(1),
    },
  }),
)

//그리드 rows 타입 지정
export interface ITermsItem extends GridRowsProp {
  id: number
  type: string
  title?: string
  isUse: boolean
  contents?: { contents?: string; url?: string }
  registDate: Date
  rownum: number
}

//그리드 컬럼 정의
const preColumns: GridColDef[] = [
  {
    field: 'rownum',
    headerName: '번호',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
  },
  {
    field: 'type',
    headerName: '구분',
    headerAlign: 'center',
    align: 'center',
    width: 150,
    sortable: false,
    valueGetter: (params: GridValueGetterParams) => {
      return params.value === 'PP' ? '개인정보 취급방침' : '이용약관'
    },
  },
  {
    field: 'title',
    headerName: '이용약관 제목',
    headerAlign: 'center',
    width: 200,
    sortable: false,
  },
  {
    field: 'isUse',
    headerName: '사용여부',
    headerAlign: 'center',
    align: 'center',
    width: 120,
    sortable: false,
    renderCell: (params: GridCellParams) => {
      return <Switch checked={Boolean(params.value)} />
    },
  },
  {
    field: 'registDate',
    headerName: '등록일',
    headerAlign: 'center',
    align: 'center',
    width: 120,
    sortable: false,
    valueFormatter: (params: GridValueFormatterParams) => {
      return dateFormat(new Date(params.value as string), 'yyyy-MM-dd')
    },
  },
  {
    field: 'id',
    headerName: '관리',
    headerAlign: 'center',
    align: 'center',
    width: 200,
    sortable: false,
    renderCell: (params: GridCellParams) => (
      <GridButton
        id={params.value as string}
        funDelete={() => {}}
        funUpdate={() => {}}
      />
    ),
  },
]

//조회조건 select items
const searchTypes = [
  {
    value: 'title',
    label: '제목',
  },
  {
    value: 'contents',
    label: '내용',
  },
]

//목록 데이터 조회하는 fetcher
const fetcher = async (url: string, param: {}) => {
  console.log('params', param)
  const res = await axios.get(url, {
    params: param,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.status > 200) {
    const error = new Error('An Error occured while fetching the data!!!')

    error.message = await res.data
    error.name = String(res.status)

    throw error
  }

  return res.data
}

// 실제 render되는 컴포넌트
const TermsOld = () => {
  // props 및 전역변수
  // const { id } = props
  const classes = useStyles()
  const route = useRouter()

  /**
   * 상태관리 필요한 훅
   */
  //조회조건 상태관리
  const localValue = useRecoilValue(conditionAtom('terms'))
  const setValue = useSetRecoilState(conditionSelector('terms'))

  //현 페이지내 필요한 hook
  const inputRef = createRef<HTMLInputElement>()
  const [searchType, setSearchType] = useState<string>('title')
  const [inputValue, setInputValue] = useState<string>('')

  //목록 데이터 조회 및 관리 hook > useSWR 사용
  const { data, mutate } = useSWR(
    [`${API_URL}/terms`, inputValue],
    (url, inputValue) => fetcher(url, { searchType, value: inputValue }),
    { revalidateOnFocus: false },
  )

  /**
   * 비지니스 로직
   */

  //삭제
  const deleteTerms = async (id: string) => {
    try {
      const result = await axios.delete(`${API_URL}/terms/${id}`)
      if (result.status === 200) {
        //목록 상태 업데이트
        mutate()
      }
    } catch (error) {
      console.log(`terms delete error ${error.message}`)
    }
  }

  //수정 시 상세 화면 이동
  const updateTerms = (id: string) => {
    route.push(`/terms/${id}`)
  }

  //사용여부 toggle 시 바로 update
  const toggleIsUse = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    try {
      const result = await axios.patch(`${API_URL}/terms/${id}`, {
        isUse: event.target.checked,
      })
      console.log('result', result)
      if (result.status === 200) {
        //목록 상태 업데이트
        mutate()
      }
    } catch (error) {
      console.log(`terms delete error ${error.message}`)
    }
    21
  }

  // 목록컬럼 재정의 > 컬럼에 비지니스 로직이 필요한 경우
  const columns = preColumns.map(item =>
    item.field === 'id'
      ? {
          ...item,
          renderCell: (params: GridCellParams) => (
            <GridButton
              id={params.value as string}
              funDelete={deleteTerms}
              funUpdate={updateTerms}
            />
          ),
        }
      : item.field === 'isUse'
      ? {
          ...item,
          renderCell: (params: GridCellParams) => (
            <Switch
              checked={Boolean(params.value)}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                toggleIsUse(event, params.getValue(params.id, 'id') as string)
              }
            />
          ),
        }
      : item,
  )

  //목록 조회
  const search = () => {
    setInputValue(inputRef.current?.value)
    setValue({ searchType, inputValue: inputRef.current?.value })
    mutate()
  }

  /**
   * element event
   */
  //조회조건 select change
  const onChangeSearchType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value)
  }

  // search button click
  const onClickSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    search()
  }

  // 조회조건 input 엔터
  const onKeyPressSearch = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      search()
    }
  }

  // add button 클릭 시 신규화면 이동
  const onClickAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    route.push('/terms/-1')
  }

  return (
    <div className={classes.root}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        p={1}
        m={1}
        className={classes.container}
      >
        <Box width="15%" className={classes.search}>
          <TextField
            id="filled-select-currency"
            select
            value={searchType}
            onChange={onChangeSearchType}
            variant="outlined"
            fullWidth
            defaultValue={localValue ? localValue['searchType'] : 'title'}
          >
            {searchTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box width="auto" className={classes.search}>
          <TextField
            inputRef={inputRef}
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            variant="outlined"
            onKeyPress={onKeyPressSearch}
            defaultValue={localValue ? localValue['inputValue'] : ''}
          />
          <IconButton
            className={classes.iconButton}
            aria-label="search"
            color="primary"
            onClick={onClickSearch}
          >
            <SearchIcon />
          </IconButton>
          <Fab
            color="primary"
            aria-label="add"
            className={classes.fab}
            size="small"
            onClick={onClickAdd}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Box>
      <DataGridDemo classes={classes} rows={data || []} columns={columns} />
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async context => {
//   const { query } = context
//   const res = await axios.get(`${API_URL}/terms`)

//   return {
//     props: {
//       rows: res.data,
//     },
//   }
// }

export default TermsOld
