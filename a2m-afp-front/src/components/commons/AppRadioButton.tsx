import React, { useEffect, useState, useCallback } from 'react'
import { Constant } from '../../constants/constant'

type RadioButtonDataModel = {
    label?: string,
    value: string
}

type RadioButtonProps = {
    dataSource: RadioButtonDataModel[]
    value?: RadioButtonDataModel
    nameGroup: string
    onChange: (data?: any) => void
    isHorizontal?: boolean
}

export default function AppRadioButton(props: RadioButtonProps) {
    const { dataSource, value, nameGroup, onChange, isHorizontal } = props

    const [selected, setSelected] = useState(value)

    useEffect(() => {
        setSelected(value)
    }, [value?.value])

    const selectedValueFunc = (event: any) => {
        setSelected({
            label: event.target.title,
            value: event.target.value
        })
        onChange({
            label: event.target.title,
            value: event.target.value
        })
    }

    const lang = localStorage.getItem(Constant.LANGUAGE) || Constant.SOUTH_KOREA

    const translate = useCallback((item: any) => {
        if (Constant.SOUTH_KOREA === lang) {
            return item.labelKr
        } else if (Constant.ENGLISH === lang) {
            return item.label
        }
    }, [lang])

    return (
        <>
            <div className={isHorizontal ? 'd-flex' : ''}>
                {
                    dataSource.map((ele: any, index: any) => (
                        <div key={index} className="form-check">
                            <input className="form-check-input" type="radio"
                                title={ele.label}
                                name={nameGroup}
                                checked={selected?.value === ele.value}
                                id={index} value={ele.value}
                                onChange={selectedValueFunc} />
                            <label className="form-check-label ps-2" htmlFor={index}>
                                {translate(ele)}
                            </label>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
