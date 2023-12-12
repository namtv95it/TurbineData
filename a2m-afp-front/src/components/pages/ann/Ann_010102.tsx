import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'

import { useAppDispatch } from '../../../store/hook';
import { showAndHideSpinner } from '../../../reducers/spinnerSlice';
import { ComPostService } from '../../../services/common/ComPostService';

type Ann_0101ItemProps = {
    items: any[]
    refreshItems: () => void
    bookmark: (postId: number, oldStatus: string) => void
    like: (postId: number, oldStatus: string) => void
    view: (postId: number) => void
}

export default function Ann_010102(props: Ann_0101ItemProps) {

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
        let index = items.findIndex((item: any) => item.id === postId);

        if (index < 0) return;

        let arr = structuredClone(items);

        let item = arr[index];
        item.isBookmark = oldStatus === "Y" ? "N" : "Y";

        setItems(arr);

        props.bookmark(postId, oldStatus);
    };

    return (
        <>
            {
                items.length > 0 ? items.map(e => (
                    <li key={e.id}>
                        <div className="row row1">
                            <span className="date">{dayjs(e.createdDate).format("YYYY-MM-DD HH:mm")}</span>
                            {/* <span className="time">15:00</span> */}
                            <div className="utility">
                                <button onClick={() => { bookmarkOrUnBookmark(e.id, e.isBookmark) }} className={`bookmark ${e.isBookmark == 'Y' ? "active" : ""}`}></button>
                            </div>
                        </div>
                        <div className="row">
                            <a onClick={() => { props.view(e.id) }} className="subject">{e.title}</a>
                        </div>
                        <div className="row row2">
                            <div className="info-wrap">
                                <span className="user-thumb">
                                    <img src={e?.imageUrl || ""} alt="예시이미지" onError={(event: any) => {
                                        event.target.src = "../../../assets/images/users/user-dummy-img.jpg"
                                    }} />
                                </span>
                                <span className="user-name">{e.createdByNm}</span>
                            </div>
                            <div className="info-wrap">
                                <span className="views">Views<em>{e.viewNumber}</em></span>
                                <span className="reply">Reply<em>{e.commentNumber}</em></span>
                                <button onClick={() => { props.like(e.id, e.isLike) }} className={`like ${e.isLike == 'Y' ? "active" : ""}`}><em>{e.likeNumber}</em></button>
                            </div>
                        </div>
                    </li>
                ))
                    :
                    <li className="no-data">No data</li>
            }
        </>
    )
}
