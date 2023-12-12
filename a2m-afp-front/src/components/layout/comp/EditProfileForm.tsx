import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import AppDropdown from '../../commons/afp/AppDropdown';
import { Constant } from '../../../constants/constant';
import { ComStdService } from '../../../services/common/ComStdService';
import { toast } from 'react-toastify';
import { UserInfoService } from '../../../services/profile/UserInfoService';
import { showAndHideSpinner } from '../../../reducers/spinnerSlice';
import { HttpStatusCode } from 'axios';
import { getUserInfo, updateUserInfo } from '../../../reducers/userSlice';

export default function EditProfileForm(props: any) {

    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.userInfo.userInfo);
    const [userInfo, setUserInfo] = useState<any>(userData);
    const [lstPositions, setLstPositions] = useState<any>([])
    const [isShowAction, setIsShowAction] = useState<boolean>(false)
    const [avatar, setAvatar] = useState<File>();
    const inputRef = useRef<any>(null);

    const [showModal, setShowModal] = useState(props.showModal)

    const dataLocalization = [
        {
            localiName: "English",
            localiValue: "en"
        },
        {
            localiName: "Korean",
            localiValue: "ko"
        }
    ]
    $(document).on("mouseup", function (e: any) {
        let menuActive = $('.context-menu.active')
        if (menuActive.has(e.target).length === 0) {
            setIsShowAction(false)
        }
    });

    useEffect(() => {
        ComStdService.getInstance().getListTccoStd({ upCommCd: Constant.POSITION_TYPE_STD })
            .then((resp) => {
                if (resp.data.status) {
                    setLstPositions(resp.data.responseData)
                } else {
                    toast.error("Get list position fail !")
                }
            })
            .catch((error) => {
                // console.log(error);
            })
    }, [])

    const handleChangeInput = (event: any) => {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        })
    }

    const handleChangeSelect = (event: any) => {
        setUserInfo({
            ...userInfo,
            position: event
        })
    }
    const handleSave = () => {
        if (chk()) {
            UserInfoService.getInstance().update(userInfo).then((res: any) => {
                props.onClose(res.data);
            }).catch((err: any) => {
                toast.error("Update failed")
            });
        }

    }
    function handleChangeAvatar() {
        inputRef.current.click();
    }
    const onChangeAvatar = (event: any) => {
        if (!event.target.files || !event.target.files[0]) {
            return;
        }
        let file = event.target.files[event.target.files.length - 1];
        setAvatar(file);
    };

    useEffect(() => {
        if (avatar == null) {
            return
        }
        dispatch(showAndHideSpinner(true));
        UserInfoService.getInstance()
            .changeAvatar(avatar)
            .then((resp) => {
                if (resp.status === HttpStatusCode.Ok) {
                    if (resp.data.status) {
                        dispatch(getUserInfo());
                        dispatch(showAndHideSpinner(false));
                        toast.success("Updated User successfully");
                    } else {
                        toast.error("Updated User failed");
                    }
                } else {
                    toast.error("Updated User failed");
                }
            })
            .catch((error) => {
                dispatch(showAndHideSpinner(true));
                toast.error("Updated User failed");
            });
    }, [avatar]);

    const handleDeleteAvatar = () => {
        UserInfoService.getInstance().deleteAvatar().then((res) => {
            if (res.data.status === true) {
                dispatch(getUserInfo());
                toast.success("Delete successfully");
            } else {
                toast.error("Delete unsuccessfully");
            }
        }).catch((err) => {
            toast.error("Delete unsuccessfully");
        })
    }


    const chk = () => {
        let _chk = true
        if (userInfo.fullName == "" || userInfo.fullName == null) {
            _chk = false;
        } else if (userInfo.email == "" || userInfo.email == null) {
            _chk = false;
        } else if (userInfo.organization == "" && userInfo.organization == null) {
            _chk = false;
        } else if (userInfo.position == "" || userInfo.position == null) {
            _chk = false;
        }
        if (!_chk) {
            setUserInfo((prveState: any) => {
                return {
                    ...prveState,
                    fullName: prveState.fullName || "",
                    email: prveState.email || "",
                    organization: prveState.organization || "",
                    position: prveState.position || "",
                }
            })
        }
        return _chk;
    }

    const useTheOriginalImage = (url: string) => {
        if (url != "") {
            let newUrl = url.replace('useThumb=Y', '');
            return newUrl
        } else {
            return url;
        }
    }


    return (
        <>
            <div className={`modal ${showModal ? 'open' : ''}`} style={{ position: "fixed" }}>
                <div className="modal-cont" style={{ width: '1000px' }}>
                    <h1 className="modal-tit">Profile</h1>
                    <div className="modal-content-area">
                        <div className="profile-edit-wrap">
                            <div className="user-info">
                                <div className="user-info-wrap">
                                    <div className="user-thumb">
                                        <img onClick={() => { setShowModal(false) }} src={userData?.imgPathBase64 || ""} alt="예시이미지" onError={(event: any) => {
                                            event.target.src = "../../../assets/images/users/user-dummy-img.jpg"
                                        }} style={{ cursor: 'pointer' }} />
                                    </div>
                                    <input onChange={onChangeAvatar} accept="image/png, image/gif, image/jpeg"
                                        type="file"
                                        ref={inputRef}
                                        style={{ display: "none" }}
                                    />
                                    <button className="more" onClick={() => { setIsShowAction(true) }} ></button>
                                    <div className={`context-menu ${isShowAction === true ? 'active' : ''}`} id='action-dropdown'>
                                        <button className="upload" onClick={() => { handleChangeAvatar() }}>Upload</button>
                                        <button className="delete" onClick={() => { handleDeleteAvatar() }}>Delete</button>
                                    </div>
                                </div>
                                <span className="user-name">{userData.fullName}</span>
                            </div>

                            <div className={`input-group ${userInfo.fullName == "" ? 'error' : ''}`}>
                                <p className="tit">Name</p>
                                <label>
                                    <input type="text" placeholder="Name" name="fullName" value={userInfo.fullName} onChange={(event: any) => handleChangeInput(event)} />
                                </label>
                                <span className={`${userInfo.fullName == "" ? 'error-msg' : 'display-none'}`}>Name is not empty</span>
                            </div>
                            <div className={`input-group ${userInfo.email == "" ? 'error' : ''}`}>
                                <p className="tit">Email</p>
                                <label>
                                    <input type="text" placeholder="user@a2m.co.kr" name='email' value={userInfo.email} onChange={(event: any) => handleChangeInput(event)} />
                                </label>
                                <span className={`${userInfo.email == "" ? 'error-msg' : 'display-none'}`}>Email is not empty</span>
                            </div>
                            <div className={`input-group ${userInfo.organization == "" ? 'error' : ''}`}>
                                <p className="tit">Organization</p>
                                <label>
                                    <input type="text" placeholder="Organization" name='organization' value={userInfo.organization} onChange={(event: any) => handleChangeInput(event)} />
                                </label>
                                <span className={`${userInfo.organization == "" ? 'error-msg' : 'display-none'}`}>Organization is not empty</span>
                            </div>
                            <div className={`input-group ${userInfo.position == "" ? 'error' : ''}`}>
                                <p className="tit">Job title</p>
                                <AppDropdown sources={lstPositions} value={userInfo.position == "" ? undefined : userInfo.position} bindLabel={'commNm'} bindValue={'commCd'} onChange={(event: any) => handleChangeSelect(event)} />
                                <span className={`${userInfo.position == "" ? 'error-msg' : 'display-none'}`}>Job title is not empty</span>
                            </div>
                            <div className="input-group">
                                <p className="tit">Localization</p>
                                <AppDropdown sources={dataLocalization} value="en" bindLabel={'localiName'} bindValue={'localiValue'} onChange={() => { }} />
                            </div>
                        </div>
                    </div>

                    <div className="modal-btn-wrap">
                        <button className="btn3" onClick={() => { props.onClose(false) }}>Cancel</button>
                        <button className="btn2" onClick={() => handleSave()}>Save</button>
                    </div>
                    <button className="close-btn" onClick={() => { props.onClose(false) }}></button>
                </div>
            </div>

            <div className={`modal ${!showModal ? 'open' : ''}`} style={{ position: "fixed" }}>
                <div className="modal-cont" style={{ width: '660px' }}>
                    <div className="modal-content-area">
                        <img alt="예시이미지" src={useTheOriginalImage(userData?.imgPathBase64 || "")} onError={(event: any) => {
                            event.target.src = "../../../assets/images/users/user-dummy-img.jpg"
                        }} style={{ width: '100%' }} />
                    </div>
                    <button className="close-btn" onClick={() => { setShowModal(true) }}></button>
                </div>
            </div>

        </>
    )
}
