// import Pagination from '@mui/material/Pagination'
import React, { useState, useEffect } from 'react'
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { Constant } from '../../constants/constant';

type PaginationProps = {
    count?: number
    page: number
    onChange: (page: number) => void,
    rows?: number
}

export default function AppPagination(props: PaginationProps) {
    const { count, page, onChange, rows } = props
    const [first, setFirst] = useState((page - 1) * (rows == undefined ? Constant.ROWS_OF_PAGE : rows))

    useEffect(() => {
        setFirst((page - 1) * (rows == undefined ? Constant.ROWS_OF_PAGE : rows))
    }, [page])

    // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    //     setPage(value)
    //     onChange(value)
    // }

    const handleChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first)
        onChange(event.page + 1)
    }

    return (
        // <Pagination count={count == undefined ? 10 : count} page={_page} onChange={handleChange} color="primary" showLastButton showFirstButton />
        <Paginator first={first} rows={rows === undefined ? Constant.ROWS_OF_PAGE : rows} totalRecords={count} onPageChange={handleChange} />
    )
}
