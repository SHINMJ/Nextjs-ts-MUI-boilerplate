import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TablePaginationActions from '@components/Table/Pagination'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { SERVER_API_URL } from '@constants/env'
import { format as dateFormat } from '@libs/date'

interface Column {
  id: 'name' | 'code' | 'isUse' | 'date' | 'datetime' | 'isEdit'
  label: string
  minWidth?: number
  align?: 'right' | 'left' | 'center' | 'inherit'
  format?: (value: any) => any
}

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'Code', minWidth: 100 },
  {
    id: 'isUse',
    label: '사용여부',
    // minWidth: 100,
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
    format: (value: boolean) => value,
  },
]

export interface TableData {
  name: string
  code: string
  isUse: boolean
  date: string
  datetime: Date
  isEdit: boolean
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
})

const fetchUrl = '/api/demo/board'

const Board = props => {
  console.log(props)
  const { data } = props
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map(column => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Paper>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context
  const res = await axios.get(`${SERVER_API_URL}demo/board?type=${query.type}`)

  return {
    props: {
      data: res.data,
    },
  }
}

export default Board
