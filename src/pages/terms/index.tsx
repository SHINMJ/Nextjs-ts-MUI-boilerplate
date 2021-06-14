import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { API_URL } from '@constants/env'
import { format as dateFormat } from '@libs/date'
import {
  GridCellParams,
  GridColDef,
  GridRowsProp,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@material-ui/data-grid'
import { useRouter } from 'next/router'
import DataGridDemo from '@components/Table/DataGridDemo'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Link from 'next/link'
import useSWR from 'swr'
import GridButton from '@components/GridButton'

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

export interface ITermsItem extends GridRowsProp {
  id: number
  type: string
  title?: string
  isUse: boolean
  contents?: { contents?: string; url?: string }
  registDate: Date
  rownum: number
}

const columns: GridColDef[] = [
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
      <GridButton url="/terms" id={params.value as string} />
    ),
  },
]

interface ITerms {
  rows: ITermsItem[]
}

const conditions = [
  {
    value: 'condition_1',
    label: '제목',
  },
  {
    value: 'condition_2',
    label: '내용',
  },
]

const Terms = ({ rows }: ITerms) => {
  const { data, mutate } = useSWR(`${API_URL}/v1/terms`, { initialData: rows })
  const classes = useStyles()
  const route = useRouter()
  const [condition, setCondition] = useState<string>('condition_1')

  console.log('data', data)

  const onClickSearch = (event: React.MouseEvent<HTMLButtonElement>) => {}

  const onKeyPressSearch = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  const onClickAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    route.push('/terms/new')
  }

  const onChangeCondition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCondition(event.target.value)
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
            value={condition}
            onChange={onChangeCondition}
            variant="outlined"
            fullWidth
          >
            {conditions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box width="auto" className={classes.search}>
          <TextField
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            variant="outlined"
            onKeyPress={onKeyPressSearch}
          />
          {/* </Box>
          <Box width="auto" className={classes.search}> */}
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
      <DataGridDemo classes={classes} rows={data} columns={columns} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context
  const res = await axios.get(`${API_URL}/v1/terms`)

  return {
    props: {
      rows: res.data,
    },
  }
}

export default Terms
