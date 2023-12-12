import dayjs from 'dayjs';
import React, { useEffect, useState, useCallback, Fragment } from 'react'

import { useAppDispatch, useAppSelector } from '../../../store/hook';
import AppComment from '../../commons/afp/AppComment';
import { showAndHideSpinner } from '../../../reducers/spinnerSlice';
import { CommonUtil } from '../../../utils/commonUtil';
import { ComPostService } from '../../../services/common/ComPostService';
import { AuthConstant } from '../../../constants/authConstant';

type Ann_0101ItemProps = {
    items: any[]
    refreshItems: () => void
    bookmark: (postId: number, oldStatus: string) => void
    like: (postId: number, oldStatus: string) => void
    delete: (postId: number) => void,
    edit: (postId: number) => void
}

export default function Ann_010103(props: Ann_0101ItemProps) {
    const userInfo = useAppSelector(state => state.userInfo.userInfo)
    const dispatch = useAppDispatch();

    const [items, setItems] = useState(props.items);

    const [comPostService] = useState<ComPostService>(new ComPostService());
    
    useEffect(() => {
        setItems(props.items)
    }, [props.items])

    const bookmarkOrUnBookmark = (postId: number, oldStatus: string) => {
        dispatch(showAndHideSpinner(true));
        comPostService
          .bookmarkOrUnBookmark({ postId: postId, isBookmark: oldStatus })
          .then((resp) => {
            if (resp.data.status) {
              handleBookmark(postId, oldStatus);
            }
            dispatch(showAndHideSpinner(false));
          })
          .catch((error) => {
            dispatch(showAndHideSpinner(false));
          });
      };
    
      const handleBookmark = (postId: number, oldStatus: string) => {
        let index = items.findIndex( (item:any) => item.id === postId);
        
        if(index < 0) return;

        let arr = structuredClone(items);

        let item = arr[index];
        item.isBookmark = oldStatus === "Y"?"N":"Y";

        setItems(arr);

        props.bookmark(postId, oldStatus);
      };

    const [openAction, setOpenAction] = useState('')

    const eventListener = useCallback((e: any) => {
        var container = $("div .context-menu");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            setOpenAction('')
        }
    }, [])

    useEffect(() => {
        document.addEventListener('mouseup', eventListener);
        return () => {
            document.removeEventListener('mouseup', eventListener);
        }
    }, [])

    const handleChangePost = (post: any) => {
        let index = items.findIndex( (item:any) => item.id === post.id);
        if(index < 0) return
        let arr = structuredClone(items);

        let item = arr[index];
        item.isLike = post.isLike;
        item.likeNumber = post.likeNumber;
        item.commentNumber = post.commentNumber; 
        setItems(arr);
    }

    return (
        <>
            {
                items.length > 0 ? items.map(e => (
                    <li key={e.id}>
                        <a className="subject">{e.title}</a>
                        <div className="info-wrap">
                            <span className="user-thumb">
                            <img src={e?.imageUrl || ""} alt="예시이미지" onError={(event: any) => {
                                event.target.src = "../../../assets/images/users/user-dummy-img.jpg"
                                }} />
                            </span>
                            <span className="user-name">{e.createdByNm}</span>
                            <span className="date">{dayjs(e.createdDate).format("YYYY-MM-DD HH:mm")}</span>
                            {/* <span className="time">15:00</span> */}
                            <span className="line"></span>
                            <span className="views">Views<em>{e.viewNumber}</em></span>
                            <span className="reply">Reply<em>{e.commentNumber}</em></span>
                        </div>
                        <div className="utility">
                        { 
                            (userInfo?.rolesStr || "").includes(AuthConstant.ROLE_ADMIN) ? (
                                <button className="more" onClick={() => {
                                    if (openAction == e.id) {
                                        setOpenAction('')
                                    } else {
                                        setOpenAction(e.id)
                                    }
                                }}></button>
                            ) : <Fragment />
                        }
                            
                            <div className={`context-menu ${openAction == e.id ? 'active' : ''}`}>
                                <button onClick={() => { props.edit(e.id) }} className="edit">Edit</button>
                                <button onClick={() => { props.delete(e.id) }} className="delete">Delete</button>
                            </div>
                            <button onClick={() => { bookmarkOrUnBookmark(e.id, e.isBookmark) }} className={`bookmark ${e.isBookmark == 'Y' ? "active" : ""}`}></button>
                        </div>
                        {/* real <div className="board-body">{e.description}
                        
                        </div> */}
                        {/* markdown <div className='board-body' dangerouslySetInnerHTML={{ __html: CommonUtil.convertMarkdownToHtml(e.description) }}></div> */}
                        <div className='board-body' dangerouslySetInnerHTML={{ __html: e.description }}></div>
      
                        <AppComment onChangePost={(post: any) => {
                            handleChangePost(post)
                        }} postId={e.id} />

                    </li>
                ))
                    :
                    <li className="no-data">No data</li>
            }
        </>
    )
}
