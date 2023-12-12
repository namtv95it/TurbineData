import React, { useEffect, useState } from 'react'
import AppSelect from './AppSelect'

export default function AppFilter(props: any) {

    const { nameColumn, onChange, value } = props

    const sortType = [
        { label: "Ascending ▲", value: "asc", labelKr: "오름차순 ▲" },
        { label: "Descending ▼", value: "desc", labelKr: "내림차순 ▼" },
    ]

    // const [sort, setSort] = useState({})
    const [selectedColumn, setSelectedColumn] = useState<any>(value);
    const [selectedType, setSelectedType] = useState("asc");

    const handleChangeColumn = (data: any) => {
        setSelectedColumn(data)
        onChange({
            nameColumn: data,
            sortType: selectedType
        })
    }

    const handleChangeSortType = (data: any) => {
        setSelectedType(data)
        onChange({
            nameColumn: selectedColumn,
            sortType: data
        })
    }

    useEffect(() => {
        setSelectedColumn(value)
    }, [value])

    return (
        <div className='row'>
            <div className='col-xl-6 col-12 col-sm-12'>
                <AppSelect value={selectedColumn} dataSource={nameColumn} onChange={handleChangeColumn} />
            </div>
            {
                selectedColumn != "null" && (
                    <div className='col-xl-6 col-12 col-sm-12'>
                        <AppSelect value={selectedType} dataSource={sortType} onChange={handleChangeSortType} />
                    </div>
                )
            }
        </div>
    )
}
