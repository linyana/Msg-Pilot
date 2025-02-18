import React, {
  useState,
} from 'react'
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
} from '@mui/material'
import {
  styled,
} from '@mui/system'

const StyledTableHeadCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  backgroundColor: '#f5f5f5',
}))

const CheckboxCell = styled(TableCell)(() => ({
  position: 'sticky',
  left: 0,
}))

type Order = 'asc' | 'desc';

export interface TableColumn<T> {
  align?: 'left' | 'center' | 'right';
  hash: string;
  header?: React.ReactNode | string;
  tooltip?: string;
  hideHeader?: boolean;
  isSortable?: boolean;
  render?: (row: T) => React.ReactNode;
  verticalAlign?: 'top' | 'middle';
  width?: number | string;
  withPadding?: boolean;
  fixed?: 'left' | 'right';
}

interface AccountListProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  filter: object;
  setFilter: (value: object) => void;
  selectedKey: number[];
  setSelectedKey: (keys: number[]) => void;
}

export const Table = <T extends { id: number; [key: string]: any }>({
  data = [],
  columns = [],
  filter,
  setFilter,
  selectedKey = [],
  setSelectedKey,
}: AccountListProps<T>) => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<string>(columns[0]?.hash || '')

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((row) => row.id)
      setSelectedKey(newSelected)
      return
    }
    setSelectedKey([])
  }

  const handleClick = (id: number) => {
    const selectedIndex = selectedKey.indexOf(id)
    let newSelected: number[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedKey, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedKey.slice(1))
    } else if (selectedIndex === selectedKey.length - 1) {
      newSelected = newSelected.concat(selectedKey.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedKey.slice(0, selectedIndex),
        selectedKey.slice(selectedIndex + 1),
      )
    }

    setSelectedKey(newSelected)
  }

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)

    setFilter({
      ...filter,
      sortBy: property,
      order: isAsc ? 'desc' : 'asc',
    })
  }

  const isSelected = (id: number) => selectedKey.indexOf(id) !== -1

  return (
    <MuiTable stickyHeader>
      <TableHead>
        <TableRow style={{
          height: '48px',
        }}
        >
          <CheckboxCell
            padding="none"
            style={{
              width: '50px',
              backgroundColor: '#F6F6F6',
            }}
          >
            <Checkbox
              color="primary"
              indeterminate={
                selectedKey.length > 0 && selectedKey.length < data.length
              }
              checked={data.length > 0 && selectedKey.length === data.length}
              onChange={handleSelectAllClick}
            />
          </CheckboxCell>
          {columns.map((column) => (
            <StyledTableHeadCell
              padding="none"
              key={column.hash}
              onClick={() => column.isSortable && handleRequestSort(column.hash)}
              style={{
                cursor: column.isSortable ? 'pointer' : 'default',
                backgroundColor: '#F6F6F6',
                position: column.fixed ? 'fixed' : 'relative',
                right: 0,
                zIndex: 1,
              }}
              align={column.align}
            >
              {column.header}
            </StyledTableHeadCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => {
          const isItemSelected = isSelected(row.id)
          return (
            <TableRow
              key={row.id}
              hover
              role="checkbox"
              aria-checked={isItemSelected}
              selected={isItemSelected}
              style={{
                height: '48px',
              }}
            >
              <CheckboxCell padding="none">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  onClick={() => handleClick(row.id)}
                />
              </CheckboxCell>
              {columns.map((column) => (
                <TableCell
                  padding="none"
                  key={column.hash}
                  align={column.align}
                  style={{
                    position: column.fixed ? 'fixed' : 'relative',
                    right: 0,
                    zIndex: 1,
                  }}
                >
                  {column.render ? column.render(row) : row[column.hash]}
                </TableCell>
              ))}
            </TableRow>
          )
        })}
      </TableBody>
    </MuiTable>
  )
}
