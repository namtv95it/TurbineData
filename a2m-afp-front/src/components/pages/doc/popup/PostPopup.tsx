import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../store/hook';
import { showAndHideSpinner } from '../../../../reducers/spinnerSlice';
import { Doc0101Service } from '../../../../services/doc/Doc0101Service';
import { toast } from "react-toastify";
import { Post } from '../../../../model/doc/Post';
import AppMarkdown from '../../../commons/AppMarkdown';

type PostProps = {
    post: any,
    afpMenuId: any,
    title?:any,
    onClose?: (data?: any) => void
}

export default function PostPopup(props: PostProps) {

    const [doc0101Service] = useState<Doc0101Service>(new Doc0101Service());
    const dispatch = useAppDispatch();
    
    const [saveRequest, setSaveRequest] = useState<Post>(props.post);

    const onSubmit = () => {
        // if (!saveRequest.title){
        //     toast.error("The title is blank, please fill in all the information.");
        //     return;
        // }
        if (!saveRequest.description) {
            toast.error("The description is blank, please fill in all the information.");
            return;
        }
        saveMenu();
    }

    const saveMenu = () => {
        dispatch(showAndHideSpinner(true));
        let request = {
            ...saveRequest,
            title: props.title,
            afpMenuId: props.afpMenuId
        }
        if (request.id) {
            doc0101Service.updateAfpPost(request).then(res => {
                if (res.data.status) {
                    toast.success("Save successfull");
                    props.onClose?.(true);           
                }else {
                    toast.error("Save failed");
                }
                dispatch(showAndHideSpinner(false));
            })
        } else {
            doc0101Service.createPost(request).then(res => {
                if (res.data.status) {
                    toast.success("Save successfull");
                    props.onClose?.(true);           
                }else {
                    toast.error("Save failed");
                }
                dispatch(showAndHideSpinner(false));
            });
        }
        
    }

    const onChangeDescription = (data: any) => {
        setSaveRequest({
            ...saveRequest,
            description: data
        })
    }

    return (
        <>  
            <div className="modal open" id="modal-docu-edit">
                <div className="modal-cont" style= {{width: '660px'}}>
                    <h1 className="modal-tit">Edit</h1>
                    <div className="modal-content-area">
                        <div className="input-group subject">
                            <p className="tit">Title</p>
                            {/* onChange={(event) => hanldChange(event)} */}
                            <input type="text" name='title' placeholder="제목을 입력하세요." value={props.title} readOnly/>
                        </div>
                        <div className="input-group">
                            <p className="tit">Description</p>
                            <div className="modify-editor">
                                <AppMarkdown content={saveRequest.description || ""} onChange = {(data) => onChangeDescription(data)}/>
                            </div>
                        </div>
                    </div>

                    <div className="modal-btn-wrap">
                        <button className="btn3" onClick={() => props.onClose?.(false)} >Cancel</button>
                        <button className="btn2" onClick={onSubmit}>Save</button>
                    </div>

                    <button className="close-btn" onClick={() => props.onClose?.(false)}></button>
                </div>
            </div>
            
        </>
    )
}

