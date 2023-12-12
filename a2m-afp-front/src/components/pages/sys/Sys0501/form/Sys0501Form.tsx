import { Editor } from 'primereact/editor';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Sys0501Service } from '../../../../../services/sys/Sys0501Service';
import { toast, ToastContainer } from 'react-toastify';
import { showAndHideSpinner } from '../../../../../reducers/spinnerSlice';
import { useAppDispatch } from '../../../../../store/hook';


export default function Sys0501Form(props: any) {

    const { t, i18n } = useTranslation()
    const [text, setText] = useState<any>('');
    const [isEditable, setIsEditable] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        _getManuals(props.data);
    }, [])

    function _getManuals(item: any) {
        const param = {
            type: item.type,
            id: item.dependId ? item.dependId : item.projectId
        }
        dispatch(showAndHideSpinner(true));
        Sys0501Service.getInstance().getManuals(param).then(result => {
            if (result.data.responseData.MANUALS) {
                setText(result.data.responseData.MANUALS)
                props.data.MANUALS = result.data.responseData.MANUALS
            }
            dispatch(showAndHideSpinner(false));
        })
    }

    const save = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(showAndHideSpinner(true));
        Sys0501Service.getInstance().saveManual({ manuals: text, id: props.data.dependId ? props.data.dependId : props.data.projectId, type: props.data.type }).then((res: any) => {
            if (res.data.status) {
                toast.success(`${t('sys0501.message.success.saveManuals')}`)
                props.onClose(true)
            } else {
                toast.error(`${t('sys0501.message.error.saveManuals')}`)
            }
            dispatch(showAndHideSpinner(false));
        })
    }

    return (
        <>
            <ToastContainer></ToastContainer>

            {
                isEditable === false ?
                    <>
                        <div className="ql-editor ql-blank" style={{ height: '600px' }} dangerouslySetInnerHTML={{ __html: text }}></div>
                        <div className='d-flex justify-content-end mt-4'>
                            <button onClick={() => setIsEditable(true)}
                                className="btn btn-primary btn-label rounded-pill waves-effect waves-light"><i className=" ri-edit-2-line label-icon align-middle rounded-pill fs-16 me-2"></i>Edit</button>
                        </div>
                    </>
                    :
                    <form onSubmit={save}>
                        <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '560px' }} />
                        <div className='d-flex justify-content-end mt-4'>
                            <button type="submit"
                                className="btn btn-primary btn-label rounded-pill waves-effect waves-light"><i className="ri-save-line label-icon align-middle rounded-pill fs-16 me-2"></i>{t('confirm.button.save.text')}</button>
                            <button type='button' onClick={() => { setIsEditable(false); setText(props.data.MANUALS) }}
                                className="btn btn-light btn-label rounded-pill waves-effect waves-light ms-2"><i className="ri-close-circle-line label-icon align-middle rounded-pill fs-16 me-2"></i>{t('confirm.button.cancel.text')}</button>
                        </div>
                    </form>
            }
        </>

    )
}
