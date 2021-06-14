import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { API_URL } from '@constants/env'
import { format as dateFormat } from '@libs/date'
import TableDemo, { IColumn, IRow } from '@components/Table/TableDemo'
import { useRouter } from 'next/router'
import DataGridDemo from '@components/Table/DataGridDemo'

const columns: IColumn[] = [
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'code', label: 'Code', minWidth: 100 },
  {
    id: 'isUse',
    label: '사용여부',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 120,
    align: 'center',
  },
  {
    id: 'datetime',
    label: 'DateTime to Date',
    minWidth: 120,
    align: 'center',
    format: (value: Date) => dateFormat(value, 'yyyy-MM-dd'),
  },
  {
    id: 'isEdit',
    label: '권한 버튼',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
]

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
})

interface IBoardData extends IRow {
  isUse: boolean
  date: string
  datetime: Date
  isEdit: boolean
}

interface IBoard {
  rows: IBoardData[]
}

const Board = ({ rows }: IBoard) => {
  const classes = useStyles()
  const route = useRouter()
  const { type } = route.query

  return (
    <>
      <TableDemo columns={columns} rows={rows} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context
  const res = await axios.get(`${API_URL}/board?type=${query.type}`)

  return {
    props: {
      rows: res.data,
    },
  }
}

export default Board
