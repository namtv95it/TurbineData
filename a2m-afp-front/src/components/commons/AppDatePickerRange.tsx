// import { TextField } from '@mui/material'
// import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs, { Dayjs } from 'dayjs';
// import React, { useEffect, useState, useRef } from 'react'

// type DatePickerRangePops = {
//     value: {
//         fromDate: Date | null | ""
//         toDate: Date | null | ""
//     },
//     styleFromDate: {
//         title: string
//         required: boolean
//         message: string
//     },
//     styleToDate: {
//         title: string
//         required: boolean
//         message: string
//     },
//     onChange: (data: any) => void
// }

// export default function AppDatePickerRange(props: DatePickerRangePops) {

//     const { value, styleFromDate, styleToDate } = props
//     const flat = useRef("")

//     const handleChangeDate = (event: any, type: string) => {
//         if (type === "FROM_DATE") {
//             flat.current = "FROM_DATE"
//             setFromDate(event)
//         } else if (type === "TO_DATE") {
//             flat.current = "TO_DATE"
//             setToDate(event)
//         }
//     }

//     const [fromDate, setFromDate] = useState<any>((value.fromDate != null && value.fromDate != "") ? dayjs(value.fromDate) : value.fromDate || null);
//     const [toDate, setToDate] = useState<any>((value.toDate != null && value.toDate != "") ? dayjs(value.toDate) : value.toDate || null);

//     useEffect(() => {
//         if (flat.current === "FROM_DATE") {
//             if (fromDate && fromDate.isValid()) {
//                 if (toDate && toDate.isValid()) {
//                     const fDate = new Date(fromDate.toString())
//                     const tDate = new Date(toDate.toString())
//                     if (fDate.getTime() > tDate.getTime()) {
//                         // flat.current = "TO_DATE"
//                         setToDate(null)
//                     }
//                 }
//             }
//         } else if (flat.current === "TO_DATE") {
//             if (toDate && toDate.isValid()) {
//                 if (fromDate && fromDate.isValid()) {
//                     const fDate = new Date(fromDate.toString())
//                     const tDate = new Date(toDate.toString())
//                     if (fDate.getTime() > tDate.getTime()) {
//                         // flat.current = "FROM_DATE"
//                         setFromDate(null)
//                     }
//                 }
//             }
//         }
//         if (flat.current != "") {
//             props.onChange({
//                 fromDate: fromDate && fromDate.isValid() ? new Date(fromDate.toString()) : null,
//                 toDate: toDate && toDate.isValid() ? new Date(toDate.toString()) : null
//             })
//         }
//     }, [fromDate, toDate])

//     return (
//         <div className='col-lg-12 d-flex'>
//             <div className='col-lg-6'>
//                 <label className="form-check-label-radio">{styleFromDate.title} {styleFromDate.required && <strong className='strong-required'>*</strong>}</label>
//                 <div className='col-lg-12'>
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DesktopDatePicker
//                             inputFormat="YYYY-MM-DD"
//                             value={fromDate}
//                             onChange={(event) => handleChangeDate(event, 'FROM_DATE')}
//                             renderInput={(params: any) => <TextField {...params} />}
//                         />
//                     </LocalizationProvider>
//                 </div>
//                 {
//                     styleFromDate.required && (
//                         <div className={`${value.fromDate == null ? 'error-required' : 'display-none'}`}>
//                             {styleFromDate.message}
//                         </div>
//                     )
//                 }
//             </div>

//             <div className='col-lg-6 ps-2'>
//                 <label className="form-check-label-radio">{styleToDate.title} {styleToDate.required && <strong className='strong-required'>*</strong>}</label>
//                 <div className='col-lg-12'>
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DesktopDatePicker
//                             inputFormat="YYYY-MM-DD"
//                             value={toDate}
//                             onChange={(event) => handleChangeDate(event, 'TO_DATE')}
//                             renderInput={(params: any) => <TextField {...params} />}
//                         />
//                     </LocalizationProvider>
//                 </div>
//                 {
//                     styleToDate.required && (
//                         <div className={`${value.toDate == null ? 'error-required' : 'display-none'}`}>
//                             {styleToDate.message}
//                         </div>
//                     )
//                 }
//             </div>
//         </div>
//     )
// }

import React from 'react'

export default function AppDatePickerRange() {
  return (
    <div>AppDatePickerRange</div>
  )
}

