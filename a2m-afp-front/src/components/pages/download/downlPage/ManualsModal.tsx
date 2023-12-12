import React, { useEffect, useState } from 'react'
import { DownloadService } from '../../../../services/download/DownloadService'

export default function ManualsModal(props: any) {

    const [manuals, setManuals] = useState<any>()
    useEffect(()=>{
        DownloadService.getInstance().getDependManualsById({dependId: props.dependId}).then((res)=>{
            setManuals(res.data.responseData.manuals)
        })
    },[])
  return (
    <div className='scroll-wrap modal-content-area' style={{overflowY: "scroll"}}>
        <div dangerouslySetInnerHTML={{ __html: manuals }}></div>
    </div>
  )
}
