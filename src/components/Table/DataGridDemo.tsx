import * as React from 'react'
import { DataGrid, DataGridProps } from '@material-ui/data-grid'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
  GRID_PAGE_SIZE,
  GRID_ROWS_PER_PAGE_OPTION,
  GRID_ROW_HEIGHT,
} from '@constants'
import DataGridPagination from './DataGridPagination'

export interface IDataGrid extends DataGridProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .hover': {
        cursor: 'pointer',
        color: '#1a3e72',
      },
    },
  }),
)

export default function DataGridDemo(props: IDataGrid) {
  const { columns, rows, pageSize, rowsPerPageOptions } = props
  const classes = useStyles()
  const rowheight = props.rowHeight || GRID_ROW_HEIGHT
  return (
    <div className={classes.root}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={rowheight}
        pageSize={pageSize || GRID_PAGE_SIZE}
        rowsPerPageOptions={rowsPerPageOptions || GRID_ROWS_PER_PAGE_OPTION}
        autoHeight={true}
        pagination
        {...props}
        components={{ Pagination: DataGridPagination }}
      />
    </div>
  )
}
