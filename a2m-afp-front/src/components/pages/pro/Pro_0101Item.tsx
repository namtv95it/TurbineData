import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { Pro0101Service } from '../../../services/pro/Pro0101Service';
import { useAppDispatch } from '../../../store/hook';
import { showAndHideSpinner } from '../../../reducers/spinnerSlice';
import { Constant } from '../../../constants/constant';

type Project0101ItemProps = {
    items: any[]
    refreshItems: () => void
    selectProject: (projectId: number) => void
    projectType: string
}

export default function Pro_0101Item(props: Project0101ItemProps) {

    const dispatch = useAppDispatch();

    const [items, setItems] = useState(props.items);

    useEffect(() => {
        setItems(props.items)
    }, [props.items])

    const bookmarkOrUnBookmark = (postId: number, oldStatus: string) => {
        dispatch(showAndHideSpinner(true))
        Pro0101Service.getInstance().bookmarkOrUnBookmark({ id: postId, isBookmark: oldStatus })
            .then(resp => {
                if (resp.data.status) {
                    if (props.projectType == Constant.PRO_TYPE[4]) {
                        props.refreshItems()
                    } else {
                        let index = items.findIndex((item: any) => item.id === postId);
                        let arr = structuredClone(items);
                        let item = arr[index];
                        item.isBookmark = oldStatus === "Y" ? "N" : "Y";
                        setItems(arr);
                    }
                }
                dispatch(showAndHideSpinner(false))
            })
            .catch(error => {
                dispatch(showAndHideSpinner(false))
            })
    }

    const editProject = (postId: number) => {
        props.selectProject(postId)
    }

    return (
        <>
            {
                items.length > 0 ? items.map(e => (
                    <li key={e.id}>
                        <div className="row row1">
                            <span className="subject" onClick={() => editProject(e.id)}>{e.title}</span>
                            <div className="utility">
                                {
                                    (e.uri != undefined && (e.uri.startsWith("http://") || e.uri.startsWith("https://"))) && <a href={`${e.uri}`} target="_blank" className="uri"></a>
                                }
                                <button onClick={() => { bookmarkOrUnBookmark(e.id, e.isBookmark) }} className={`bookmark ${e.isBookmark == 'Y' ? "active" : ""}`}></button>
                            </div>
                        </div>
                        <div className="row row2">
                            <div className="info-wrap">
                                <span className="user-thumb">
                                    <img src={e?.imageUrl || ""} alt="예시이미지" onError={(event: any) => {
                                        event.target.src = "../../../assets/images/users/user-dummy-img.jpg"
                                    }} />
                                </span>
                                <span className="user-name">{e.createdByNm}</span>
                                <span className="date">{dayjs(e.createdDate).format("YYYY-MM-DD HH:mm")}</span>
                                {/* <span className="time">15:00</span> */}
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
