import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import React, { useState, useEffect } from 'react'
// import { useTranslation } from 'react-i18next';
import { Constant } from '../../constants/constant';

type DateRangePops = {
    fromDate: '' | Date | null
    toDate: '' | Date | null
    onChange: (data: any) => void
}

export default function AppDateRange(props: DateRangePops) {

    const { fromDate, toDate, onChange } = props

    const temp: any[] = [];
    temp[0] = fromDate == '' ? null : (fromDate == null ? null : new Date(fromDate))
    temp[1] = toDate == '' ? null : (toDate == null ? null : new Date(toDate))

    const [dates, setDates] = useState<Date[] | null>(temp[0] == null && temp[1] == null ? null : temp);

    const handleChangeDate = (value: any) => {
        setDates(value)
        onChange(
            {
                fromDate: value[0],
                toDate: value[1]
            }
        )
    }

    useEffect(() => {
        // setDates(temp)
    }, [fromDate, toDate])

    const lang = localStorage.getItem(Constant.LANGUAGE) || Constant.SOUTH_KOREA

    return (
        <div className='col-lg-12'>
            <Calendar value={dates} style={{ width: '100%' }} onChange={(e: CalendarChangeEvent) => handleChangeDate(e.value)} selectionMode="range" readOnlyInput 
            dateFormat={lang == Constant.SOUTH_KOREA ? Constant.PRIME_FORMAT_DATE_KR : Constant.PRIME_FORMAT_DATE_EN}
            showButtonBar showIcon 
            placeholder={lang == Constant.SOUTH_KOREA ? Constant.PRIME_FORMAT_DATE_KR : Constant.PRIME_FORMAT_DATE_EN} />
        </div>
    )
}
