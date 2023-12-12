import React, { useEffect, useState } from 'react'
import AppDropdown from '../../../commons/afp/AppDropdown'
import { ComStdService } from '../../../../services/common/ComStdService'
import { Constant } from '../../../../constants/constant'

import AppMarkdown from '../../../commons/AppMarkdown'
import { toast } from 'react-toastify'
import { Pro0101Service } from '../../../../services/pro/Pro0101Service'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'
import { AnnounDto } from '../../../../model/ann/AnnounDto'
import { Ann_0101Service } from '../../../../services/ann/Ann_0101Service'
import AppCKEditor from '../../../commons/AppCKEditor'

export default function Ann_0101From(props: any) {
    const { t, i18n } = useTranslation()
    const [announDto, setAnnounDto] = useState<any>( props.modalData != null? props.modalData : new AnnounDto(null, "", ""))
    const [ann_0101Service] = useState<Ann_0101Service>(new Ann_0101Service())

    const handleChange = (event: any) => {
        setAnnounDto({
            ...announDto,
            [event.target.name]: event.target.value
        })
    }

    const chk = () => {
        let _chk = true
        if (announDto.title == "") {
            toast.error("Announcement title is not empty")
            _chk = false;
        } else if (announDto.description == "") {
            toast.error("Description is not empty")
            _chk = false;
        }
        return _chk;
    }

    const handleSave = () => {
        if (chk()) {
            Swal.fire({
                title: `${t('confirm.label.title')}`,
                text: `${t('confirm.label.message.save')}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#809bf1',
                cancelButtonColor: '#727379',
                confirmButtonText: `${t('confirm.button.yes.text')}`,
                cancelButtonText: `${t('confirm.button.no.text')}`
            }).then((result) => {
                if (result.value) {
                    ann_0101Service.save(announDto)
                        .then(resp => {
                            if (resp.data.status) {
                                props.onClose(true)
                            } else {
                                toast.error("Save fail")
                            }
                        })
                        .catch(error => {

                        })
                }
            })

        }
    }

    return (
        <>
            <div className="modal-content-area">
                <div className="input-group subject">
                    <label>
                        <input type="text" value={announDto.title || ""} name="title" placeholder="제목을 입력하세요." onChange={handleChange} />
                    </label>
                </div>
                <div className="input-group">
                    <div className="new-announce-editor">
                        <AppCKEditor content={announDto.description} onChange={(data) => {
                                setAnnounDto({
                                    ...announDto,
                                    description: data
                                })
                            }} />
                    </div>
                        
                </div>
            </div>

            <div className="modal-btn-wrap">
                <button className="btn3" onClick={() => {
                    props.onClose(false);
                }}>Cancel</button>
                <button className="btn2" onClick={handleSave}>Save announcement</button>
            </div>
        </>
    )
}
