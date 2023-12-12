/* eslint-disable react/jsx-pascal-case */
import React, { Fragment, useEffect, useState } from 'react'
import { Constant } from '../../../constants/constant';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { showAndHideSpinner } from '../../../reducers/spinnerSlice';
import Ann_010101 from './Ann_010101';
import Ann_010102 from './Ann_010102';
import Ann_010103 from './Ann_010103';
import { ComPostService } from '../../../services/common/ComPostService';
import { Ann_0101Service } from '../../../services/ann/Ann_0101Service';
import { AnnounSearchDto } from '../../../model/ann/AnnounSearchDto';
import AppModal from '../../commons/afp/AppModal';
import Ann_0101From from './popup/Ann_0101From';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import Ann_0101View from './popup/Ann_0101View';
import { remakeAnnounNoti } from '../../../reducers/announSlice';
import { useLocation, useParams } from 'react-router-dom';
import { AuthConstant } from '../../../constants/authConstant';

export default function Ann_0101() {
    const userInfo = useAppSelector(state => state.userInfo.userInfo)
    const { t, i18n } = useTranslation()

    const [viewType, setViewType] = useState<String>(Constant.ANN_VIEW_TYPE[0]);

    const [comPostService] = useState<ComPostService>(new ComPostService())
    
    const [ann_0101Service] = useState<Ann_0101Service>(new Ann_0101Service())

    const dispatch = useAppDispatch();

    const [searchModel, setSearchModel] = useState<AnnounSearchDto>({ keySearch: ""});

    const [items, setItems] = useState<any[]>([]);

    const [showModal, setShowModal] = useState(false);

    const [ann0101FromData, setAnn0101FromData] = useState<any>( null );

    const [showModalView, setShowModalView] = useState(false);

    const [ann0101ViewData, setAnn0101ViewData] = useState<any>( null );

    const announInfo = useAppSelector(state => state.announInfoStore.announInfo)

    const location = useLocation();

    //redirect link
    useEffect(() => {
        if (location.state?.postId) {
            doView(location.state?.postId);
            window.history.replaceState({}, document.title)
        }
    }, [location])
    
    //remake annount last Id
    useEffect(() => {
        if( announInfo.lastAnnounId > announInfo.lastViewId ) dispatch(remakeAnnounNoti());
      }, []);

    //Init Data
    useEffect(() => {
        getList()
    }, [viewType])

    // useEffect(() => {
    //     if(showModalView){
    //         const newData = items.find( (item:any) => item.id === ann0101ViewData.id);
    //         setAnn0101ViewData(newData)
    //     }
    // }, [items])

    const getList = () => {
        dispatch(showAndHideSpinner(true))
        ann_0101Service.getList(searchModel).then(resp => {
            if (resp.data.status) {
                setItems(resp.data.responseData)
                // dispatch(setProjectCounter(resp.data.responseData.length))
            }
            dispatch(showAndHideSpinner(false))
        }).catch(error => {
            dispatch(showAndHideSpinner(false))
        })
    }

    const closeModal = (data?: any) => {
        setShowModal(false);
    }

    const closeModalView = (data?: any) => {
        setShowModalView(false);
    }

    const onClose = (event: any) => {
        if (event) {
            toast.success("Save success")
            getList()
        }
        setShowModal(false)
    }

    const onCloseView = (event: any) => {
        setShowModalView(false)
    }

    const handleChangeInput = (event: any) => {
        setSearchModel({
            ...searchModel,
            keySearch: event.target.value
        })
    }

    const addLikeOrUnlike = (postId: number, oldStatus: string) => {
        dispatch(showAndHideSpinner(true))
        comPostService.addLikeOrUnlike({postId: postId, isLike: oldStatus})
        .then(resp => {
            if(resp.data.status) {
                handleLike(postId, oldStatus);
            }
            dispatch(showAndHideSpinner(false))
        })
        .catch(error => {
            dispatch(showAndHideSpinner(false))
        })
    }

    const handleLike = (postId: number, oldStatus: string) =>{
        let index = items.findIndex( (item:any) => item.id === postId);
        if(index < 0) return;
        let arr = structuredClone(items);

        let item = arr[index];
        item.isLike = oldStatus === "Y"?"N":"Y";
        item.likeNumber = oldStatus === "Y"? item.likeNumber - 1: item.likeNumber + 1
 
        setItems(arr);
    }

    const handleChangePost = (post: any) =>{
        let index = items.findIndex( (item:any) => item.id === post.id);
        if(index < 0) return
        let arr = structuredClone(items);

        let item = arr[index];
        item.isLike = post.isLike;
        item.likeNumber = post.likeNumber;
        item.commentNumber = post.commentNumber;
        item.viewNumber = item.viewNumber < post.viewNumber ? post.viewNumber : item.viewNumber;
        setItems(arr);
    }

      const handleBookmarkInView = (postId: number, oldStatus: string) =>{
        let index = items.findIndex( (item:any) => item.id === postId);
        
        if(index < 0) return;

        let arr = structuredClone(items);

        let item = arr[index];
        item.isBookmark = oldStatus === "Y"?"N":"Y";

        setItems(arr);
    }

    const doDelete = (postId: number) => {
      Swal.fire({
        title: `${t("confirm.label.title")}`,
        text: `${t("confirm.label.message.delete")}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#809bf1",
        cancelButtonColor: "#727379",
        confirmButtonText: `${t("confirm.button.yes.text")}`,
        cancelButtonText: `${t("confirm.button.no.text")}`,
      }).then((result) => {
        if (result.value) {
          dispatch(showAndHideSpinner(true));
          ann_0101Service
            .delete(postId)
            .then((resp) => {
              if (resp.data.status) {
                handleDelete(postId);
                toast.success("Delete success")
              }
              dispatch(showAndHideSpinner(false));
            })
            .catch((error) => {
              dispatch(showAndHideSpinner(false));
            });
        }
      });
    };

    const handleDelete = (postId: number) => {
        let index = items.findIndex( (item:any) => item.id === postId);
        if(index < 0) return;
        let arr = structuredClone(items);

        arr.splice(index, 1);

        setItems(arr);
        setShowModalView(false)
    }

    const doEdit = (postId: number) => {
        dispatch(showAndHideSpinner(true))
        ann_0101Service.getById( {id: postId} ).then(resp => {
            if (resp.data.status) {
                const announ = (resp.data.responseData)
                setAnn0101FromData(announ);
                setShowModal(true);

                setShowModalView(false);
            }
            dispatch(showAndHideSpinner(false))
        }).catch(error => {
            dispatch(showAndHideSpinner(false))
        })
    };

    const doAdd = () => {
        setAnn0101FromData(null);
        setShowModal(true);

        setShowModalView(false);
    };

    const doView = (postId: number) => {
        dispatch(showAndHideSpinner(true))
        ann_0101Service.getById( {id: postId} ).then(resp => {
            if (resp.data.status) {
                const announ = (resp.data.responseData)
                setAnn0101ViewData(announ);
                setShowModalView(true);
                setShowModal(false);
            }
            dispatch(showAndHideSpinner(false))
        }).catch(error => {
            dispatch(showAndHideSpinner(false))
        })
    };

    const changeViewType = (idx: number) => {
        setViewType(Constant.ANN_VIEW_TYPE[idx]);
    }

    return (
        <>
        <article className="content-area">
        <div className="tit-area">
            <h1 className="heading1">Announcements</h1>
            

            { 
                (userInfo?.rolesStr || "").includes(AuthConstant.ROLE_ADMIN) ? (
                <button className="btn1" onClick={() => {
                        doAdd()
                    }}>
                <i className="xi-plus-min"></i>
                 </button>
                ) : <Fragment />
            }

            <div className="side-wrap">
                <button onClick={() => { changeViewType(0) }} className=
                    {viewType==Constant.ANN_VIEW_TYPE[0]?"view-type-list active":"view-type-list"} title="리스트 형식"></button>
                <button onClick={() => { changeViewType(1) }} className=
                    {viewType==Constant.ANN_VIEW_TYPE[1]?"view-type-post active":"view-type-post"} title="포스트 형식"></button>
                <button onClick={() => { changeViewType(2) }} className=
                    {viewType==Constant.ANN_VIEW_TYPE[2]?"view-type-single active":"view-type-single"} title="한 화면 형식"></button>
                <div className="search-area2">
                <input value={searchModel.keySearch} onChange={handleChangeInput}
                            onKeyUp={(e: any) => {
                                if (e.key === 'Enter') {
                                    getList()
                                }
                            }}
                            type="text" placeholder="search" />
                </div>
            </div>
        </div>
        <ul className={viewType==Constant.ANN_VIEW_TYPE[0]?"board-lst view-type-list":viewType==Constant.ANN_VIEW_TYPE[1]?"board-lst view-type-post":"board-lst view-type-single"}>
            {
                viewType==Constant.ANN_VIEW_TYPE[0]? <Ann_010101 items={items} 
                refreshItems={ () => { getList() } } 
                bookmark={ (postId: number, oldStatus: string)=> { return handleBookmarkInView(postId, oldStatus); } } 
                like={ (postId: number, oldStatus: string)=> { return addLikeOrUnlike(postId, oldStatus); }} 
                view={ (postId: number)=> { return doView(postId); }} 
                />:<></>
            }
            {
                viewType==Constant.ANN_VIEW_TYPE[1]? <Ann_010102 items={items} 
                refreshItems={ () => { getList() } } 
                bookmark={ (postId: number, oldStatus: string)=> { return handleBookmarkInView(postId, oldStatus); } } 
                like={ (postId: number, oldStatus: string)=> { return addLikeOrUnlike(postId, oldStatus); } } 
                view={ (postId: number)=> { return doView(postId); }} />:<></>
            }   
            {
                viewType==Constant.ANN_VIEW_TYPE[2]? <Ann_010103 items={items} 
                refreshItems={ () => { getList() } } 
                bookmark={ (postId: number, oldStatus: string)=> { return handleBookmarkInView(postId, oldStatus); } } 
                like={ (postId: number, oldStatus: string)=> { return addLikeOrUnlike(postId, oldStatus); }}
                delete = { (postId: number) => {return doDelete(postId)} }
                edit = { (postId: number) => {return doEdit(postId)} } />:<></>
            }     
            
        </ul>
    </article>
        {
            showModal && (
                <AppModal open={showModal} title='New Announcement' onClose={closeModal} >
                    <Ann_0101From onClose={onClose} modalData={ann0101FromData}/>
                </AppModal>
            )
        }

        {
            showModalView && (
                <AppModal open={showModalView} title={ann0101ViewData.title} onClose={closeModalView} >
                    <Ann_0101View onClose={onCloseView} modalData={ann0101ViewData}
                    bookmark={ (postId: number, oldStatus: string)=> { return handleBookmarkInView(postId, oldStatus); } } 
                    onChangePost={ (post: number)=> { return handleChangePost(post); }}
                    delete = { (postId: number) => {return doDelete(postId)} }
                    edit = { (postId: number) => {return doEdit(postId)} } />
                </AppModal>
            )
        }
        </>
    )
}