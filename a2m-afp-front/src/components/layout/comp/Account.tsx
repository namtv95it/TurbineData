
import Cookies from 'universal-cookie';
import { AuthConstant } from '../../../constants/authConstant';
import { useState, useEffect } from 'react'
// import { useAppSelector } from '../../../store/hook';
// import { ComStdService } from '../../../services/common/ComStdService';
import { useNavigate } from 'react-router-dom';
// import { WebSocketService } from '../../../services/WebSocketService';
// import AppModal from '../../commons/afp/AppModal';
import EditProfileForm from './EditProfileForm';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../store/hook';
import { getUserInfo } from '../../../reducers/userSlice';

type AccountProps = {
    userInfo: any
}

export default function Account(props: AccountProps) {
    // const userInfo = useAppSelector(state => state.userInfo.userInfo)
    const dispatch = useAppDispatch();
    const { userInfo } = props

    const [showModalProfile, setShowModalProfile] = useState(false);
    // console.log(userInfo);
    useEffect(() => {
        if (userInfo?.userUid !== undefined) {
            // WebSocketService.getInstance().connect(userInfo.userUid);
        }
    }, [userInfo])

    const cookies = new Cookies()

    const handleLogout = () => {
        cookies.remove(AuthConstant.ACCESS_TOKEN)
        // WebSocketClient.wsDisconnect()
        let doamin = window.location.origin;

        window.location.href = process.env.REACT_APP_AUTH_URL + "/login?pre_action=logout&redirect_uri=" + doamin || "";
    }

    const navagite = useNavigate()
    const handleClickProfile = (url: string) => {
        navagite(url)
    }

    const closeModal = (data?: any) => {
        if (data.status == true) {
            toast.success("Updated successfully")
            dispatch(getUserInfo())
        }
        setShowModalProfile(false);
    }
    return (
        // <div className="dropdown header-item topbar-user">
        //     <button type="button" className="btn shadow-none" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //         <span className="d-flex align-items-center">
        //             <img className="rounded-circle header-profile-user" src={userInfo.imgPathBase64? `data:image/jpeg;base64,${userInfo.imgPathBase64}` : require( '../../../assets/images/users/user-dummy-img.jpg')} alt="Header Avatar" />
        //             <span className="text-start ms-xl-2">
        //                 <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{userInfo?.fullName}</span>
        //                 <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">{userInfo?.email}</span>
        //             </span>
        //         </span>
        //     </button>
        //     <div className="dropdown-menu dropdown-menu-end">
        //         <h6 className="dropdown-header">Welcome {userInfo?.fullName}!</h6>
        //         <a className="dropdown-item" onClick={() => handleClickProfile("/profile")}><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Profile</span></a>
        //         <a className="dropdown-item" href="apps-chat.html"><i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Messages</span></a>
        //         <a className="dropdown-item" href="apps-tasks-kanban.html"><i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Taskboard</span></a>
        //         <a className="dropdown-item" href="pages-faqs.html"><i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Help</span></a>
        //         <div className="dropdown-divider"></div>
        //         <a className="dropdown-item" href="pages-profile.html"><i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Balance : <b>$5971.67</b></span></a>
        //         <a className="dropdown-item" href="pages-profile-settings.html"><span className="badge bg-soft-success text-success mt-1 float-end">New</span><i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Settings</span></a>
        //         <a className="dropdown-item" href="auth-lockscreen-basic.html"><i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Lock screen</span></a>
        //         <a className="dropdown-item cus-cursor" onClick={handleLogout}><i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span className="align-middle" data-key="t-logout">Logout</span></a>
        //     </div>
        // </div>
        <>
            <div className="user-dropdown">
                <div className="user-info">
                    <div className="user-thumb-mini">
                        <img src={userInfo?.imgPathBase64 || ""} alt="예시이미지" onError={(event: any) => {
                            event.target.src = "../../../assets/images/users/user-dummy-img.jpg"
                        }} />
                    </div>
                    <div className="user-name-team">
                        <span className="user-name">{userInfo?.fullName}</span>
                        <span className="user-team">{userInfo?.userId}</span>
                    </div>
                </div>
                <div className="user-dropdown-menu">
                    <a title="프로필 편집" className="edit" onClick={() => setShowModalProfile(true)}>Edit profile</a>
                    {/* <a title="프로필 편집" className="edit">Edit profile</a> */}

                    {/* <a title="관리자 설정" className="admin">Admin</a> */}
                    <a title="로그아웃" className="out" onClick={handleLogout}>Sign out</a>
                </div>
            </div>
            {
                showModalProfile && (
                    <EditProfileForm onClose={closeModal} showModal={showModalProfile}></EditProfileForm>
                )
            }
        </>
    )
}
