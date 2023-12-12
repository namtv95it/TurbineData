import React, { useEffect } from 'react'

// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
// import { LocalizationProvider } from '@mui/x-date-pickers'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { Dayjs } from 'dayjs'
// import { TextField } from '@mui/material';

import { Calendar } from 'primereact/calendar';
import { Constant } from '../../constants/constant';

export default function AppDatePicker(props: any) {

    const handleChangeDate = (event: any) => {
        setValue(event)
        props.onChange(event != null ? new Date(event) : null)
    }

    const [value, setValue] = React.useState<any>(props.value == '' ? null : (props.value == null ? null : new Date(props.value)));
    

    useEffect(() => {
        setValue(props.value == '' ? null : (props.value == null ? null : new Date(props.value)))
    }, [props.value])

    const lang = localStorage.getItem(Constant.LANGUAGE) || Constant.SOUTH_KOREA

    return (
        <div className='col-lg-12'>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    inputFormat="YYYY-MM-DD"
                    value={value}
                    onChange={handleChangeDate}
                    renderInput={(params: any) => <TextField {...params} />}
                />
            </LocalizationProvider> */}
            <Calendar style={{ width: "100%" }} value={value} onChange={(e) => handleChangeDate(e.value)}
                dateFormat={lang == Constant.SOUTH_KOREA ? Constant.PRIME_FORMAT_DATE_KR : Constant.PRIME_FORMAT_DATE_EN}
                showButtonBar showIcon
                placeholder={lang == Constant.SOUTH_KOREA ? 'yy'+Constant.PRIME_FORMAT_DATE_KR : Constant.PRIME_FORMAT_DATE_EN+'yy'}
            />
        </div>
    )
}
