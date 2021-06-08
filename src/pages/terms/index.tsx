import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
import Link from 'next/link'

export interface ITermsItem extends GridRowsProp {
  id: number
  type: string
  title?: string
  isUse: boolean
  contents?: {}
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
    renderCell: (params: GridCellParams) => {
      return (
        <Link href={`/terms/${params.getValue(params.id, 'id')}`}>
          {params.value}
        </Link>
      )
    },
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
      <>
        <Button variant="outlined" size="small" color="primary">
          수정
        </Button>
        <Button variant="outlined" size="small" color="secondary">
          삭제
        </Button>
      </>
    ),
  },
]

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
})

interface ITerms {
  rows: ITermsItem[]
}

const Terms = (props: ITerms) => {
  const { rows } = props
  const classes = useStyles()

  return (
    <DataGridDemo
      classes={classes}
      rows={rows}
      columns={columns}
      getCellClassName={(params: GridCellParams) => {
        if (params.field === 'title') {
          return 'hover'
        }
        return ''
      }}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context
  const res = await axios.get(`${API_URL}/demo/terms`)

  return {
    props: {
      rows: res.data,
    },
  }
}

export default Terms
