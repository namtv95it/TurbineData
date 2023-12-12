import React, { useEffect, useState } from 'react'
import { DownloadService } from '../../../services/download/DownloadService';
import { useAppDispatch } from '../../../store/hook';
import { showAndHideSpinner } from '../../../reducers/spinnerSlice';

export default function DownloadHistory() {

    const dispatch = useAppDispatch();
    const [lstHisDownload, setLstHisDownload] = useState<any>([])

    useEffect(() => {
        _getDownloadHistory()
    }, [])

    function _getDownloadHistory() {
        dispatch(showAndHideSpinner(true))
        DownloadService.getInstance().getDownloadHistory().then(res => {
            setLstHisDownload(res.data.responseData)
            dispatch(showAndHideSpinner(false))
        }).catch(err => {
            dispatch(showAndHideSpinner(false))
        });
    }

    const handleDownload = (downloaded: any) => {

        var requestDownload: any = {
            pRoJectNaMe: downloaded.projectNameCustom
        }
        downloaded.downHisDependency.forEach((depend: any) => {
            requestDownload[depend.keyName] = depend.value
        });
        dispatch(showAndHideSpinner(true))
        DownloadService.getInstance().downloadProject(requestDownload, downloaded.downloadUrl).then((response: any) => {
            let url: any = window.URL || window.webkitURL;
            let anchor = document.createElement("a");
            anchor.href = url.createObjectURL(response.data);
            anchor.download = requestDownload.pRoJectNaMe + '.zip';
            document.body.append(anchor);
            anchor.click();
            anchor.remove();
            window.URL.revokeObjectURL(url);
            dispatch(showAndHideSpinner(false))
        }).catch(err => {
            dispatch(showAndHideSpinner(false))
        })
    }

    return (
        <div>
            <ul className="tab-board-lst historyDownload">
                {
                    lstHisDownload.length > 0 ? lstHisDownload.map((ele: any) => (
                        <li key={ele.id}>
                            <div className="row row1 mb-3">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className='col1' style={{ marginRight: "50px" }}>
                                                    <span className="subject">{ele.projectNameCustom}</span>
                                                    <span>Downloaded date: {Intl.DateTimeFormat("en-GB").format(new Date(ele.downloadedDate))}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="col2">
                                                    <span className="subject">{ele.projectName}-{ele.version}</span>
                                                    <div className="row row2">
                                                        <div className="info-wrap">
                                                            <span>{ele.projectDescription}</span>
                                                        </div>
                                                    </div>
                                                    <div className="row row3">
                                                        <div className="info-wrap">
                                                            <span>{ele.projectOrganization}</span>
                                                        </div>
                                                    </div>
                                                    <div className="row row4">
                                                        <div className="info-wrap">
                                                            <span className="date">Last update: {Intl.DateTimeFormat("en-GB").format(new Date(ele.updatedDate))}</span>
                                                        </div>
                                                    </div>


                                                    {
                                                        ele.tags.length > 0 ?
                                                            <div className="row row1 mt-3">
                                                                <div className="info-wrap">
                                                                    {
                                                                        ele.tags.map((tag: any) => (
                                                                            <span className='badge' key={tag.tagId}>{tag.tagName}</span>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                            : <></>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="utility">
                                    <button className="btn2" onClick={() => handleDownload(ele)}>Download again</button>
                                </div>
                            </div>


                            <div className="row row2">
                                <div className="info-wrap">
                                    <span className="user-name">Features:</span>
                                    {
                                        ele.features.map((item: any, index: number) => (
                                            <div key={index}>{item}</div>
                                        ))
                                    }
                                </div>
                            </div>
                        </li>

                    ))
                        :
                        <li className="no-data">No data</li>
                }
            </ul>
        </div>
    )
}
