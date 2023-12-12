import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Constant } from '../../../../constants/constant'
import { Sam0101Service } from '../../../../services/sam/Sam0101Service'
import { Sam0103Service } from '../../../../services/sam/Sam0103Service'
import '../sam.css'

export default function FooterHashTag() {

    const location = useLocation()
    const url = location.pathname
    const navigate = useNavigate()

    const [lists, setList] = useState<any>([])

    const [infoSample, setInfoSample] = useState<any>(null)

    useEffect(() => {
        Sam0103Service.getInstance().getListHashTag({ url: url, limit: Constant.NUMBER_QA })
            .then(resp => {
                if (resp.data.status) {
                    const data = resp.data.responseData.value;
                    setList(data)
                }
            })
            .catch(error => {

            })

        Sam0101Service.getInstance().getListTccoStdByValueConfig({ url: url })
            .then(resp => {
                if (resp.data.status) {
                    setInfoSample(resp.data.responseData)
                }
            })
            .catch(error => {

            })
    }, [])

    const goToCommunity = () => {
        // navigate("/sam/sam0103", { state: lists.length > 0 ? { category: lists[0]['category'], topic: lists[0]['topic'] } : null })
        navigate("/sam/sam0103", { state: { category: infoSample['upCommCd'], topic: infoSample['commCd'] } })
    }

    return (
        <>
            <div className="customizer-setting d-none d-md-block">
                <div className="sam-bg-question btn-rounded shadow-lg btn btn-icon btn-lg p-2" data-bs-toggle="offcanvas" data-bs-target="#theme-settings-offcanvas" aria-controls="theme-settings-offcanvas">
                    <i className='ri-questionnaire-line fs-22'></i>
                </div>
            </div>
            <div className="offcanvas offcanvas-end border-0" tabIndex={-1} id="theme-settings-offcanvas">
                <div className="d-flex align-items-center bg-gradient p-3 offcanvas-header sam-bg-question">
                    <h5 className="m-0 me-2 text-white">Question</h5>
                    <button type="button" className="btn-close btn-close-white ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                {/* <div className="card"> */}
                <div className="card-body">
                    {
                        lists.map((e: any) => (
                            <div key={e.id}>
                                <h3 className='profile-name-tag sam-cursor' data-bs-dismiss="offcanvas" onClick={() => {
                                    navigate("/sam/sam0103/" + e.id)
                                }}>{e.title}</h3>
                                <div className='d-flex'>
                                    <span><i className='ri-account-pin-circle-line'></i> {e.createdByNm}</span>
                                    <span className='ms-3'><i className='ri-time-line'></i> {dayjs(e.createdDate).format(Constant.FORMAT_DATE_EN)}</span>
                                    <div className='d-flex ms-3'>
                                        <i className='ri-reply-line'></i>
                                        <span className='ms-2'>{e.numberComment} comment</span>
                                    </div>
                                </div>
                                <hr></hr>
                            </div>
                        ))
                    }
                    {/* {
                        infoSample && <span className={`sam-link sam-cursor`} data-bs-dismiss="offcanvas" onClick={goToCommunity}>Go to community</span>
                    } */}
                </div>

                <div className="offcanvas-footer border-top p-3 text-center">
                    <div className="row">
                        {
                            infoSample && <button type="button" data-bs-dismiss="offcanvas" onClick={goToCommunity} className="btn btn-primary w-100">Go to community</button>
                        }
                    </div>
                </div>
                {/* </div> */}
            </div>
        </>
    )
}
