// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState, useEffect, useCallback } from 'react'
import { Constant } from '../../constants/constant'
import { Dropdown } from 'primereact/dropdown';

type SelectDataModel = {
    label: string,
    value: any
}

type SelectProps = {
    dataSource: SelectDataModel[]
    value?: any
    onChange: (data?: any) => void,
    disabled?: boolean
}

export default function AppSelect(props: SelectProps) {
    const { dataSource, value, onChange, disabled } = props

    const [selected, setSelected] = useState(value)

    const [list, setList] = useState(dataSource)

    // const [disable, setDisable] = useState(disabled)

    const handleChange = (event: any) => {
        // setSelected(event.target.value)
        // onChange(event.target.value)
        setSelected(event)
        onChange(event)
    }

    useEffect(() => {
        setSelected(value)
    }, [value])

    useEffect(() => {
        setList(dataSource)
    }, [dataSource])

    // useEffect(() => {
    //     setDisable(disabled)
    // }, [disabled])

    const lang = localStorage.getItem(Constant.LANGUAGE) || Constant.SOUTH_KOREA

    const translate = useCallback((item: any) => {
        if (Constant.SOUTH_KOREA === lang) {
            return item.labelKr
        } else if (Constant.ENGLISH === lang) {
            return item.label
        }
    }, [lang])

    return (
        <div className='col-lg-12'>
            {/* <FormControl fullWidth>
                <Select
                    disabled={disabled}
                    value={selected || "null"}
                    onChange={handleChange}
                    defaultValue="null"
                >
                    {
                        dataSource.map((ele: SelectDataModel, index: number) => (
                            <MenuItem key={index} value={ele.value}>{translate(ele)}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl> */}
            <Dropdown disabled={disabled} value={selected || "null"} onChange={(e) => handleChange(e.value)} options={dataSource}
                optionLabel={Constant.SOUTH_KOREA === lang ? Constant.LABEL_KR : Constant.LABEL_EN}
                placeholder="All" style={{ width: "100%" }} />
        </div>
    )
}
