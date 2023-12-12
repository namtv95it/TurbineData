import React, { useEffect, useState } from 'react'
import { DownloadService } from '../../../services/download/DownloadService'
import { useAppDispatch } from '../../../store/hook';
import { showAndHideSpinner } from '../../../reducers/spinnerSlice';
import "./style/DownloadStyle.css"
export default function ListProject() {

    const dispatch = useAppDispatch();
    const [lstCategory, setLstCategory] = useState<any>([])
    useEffect(() => {
        _getCategory()
    }, [])

    useEffect(() => {
        handleToggle()
        toggleFirst()
    }, [lstCategory])

    function _getCategory() {
        dispatch(showAndHideSpinner(true))
        DownloadService.getInstance().getCategories().then(res => {
            setLstCategory(res.data.responseData)
            dispatch(showAndHideSpinner(false))
        }).catch(err => {
            dispatch(showAndHideSpinner(false))
        })
    }
    const handleToggle = () => {
        const accordionBtns = document.querySelectorAll(".course-accordion");
        accordionBtns.forEach((accordion: any) => {
            accordion.onclick = function () {
                this.classList.toggle("active");

                let content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    //this is if the accordion is open
                    content.style.maxHeight = null;
                } else {
                    //if the accordion is currently closed
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            };
        });


    }
    const toggleFirst = () => {
        const accordions: any = document.querySelectorAll(".course-accordion");
        // Kiểm tra nếu có ít nhất một item
        if (accordions.length > 0) {
            // Mở rộng phần tử đầu tiên
            accordions[0].classList.add("active");
            accordions[0].nextElementSibling.style.maxHeight =
            accordions[0].nextElementSibling.scrollHeight + "px";
        }

    }

    const handleDownload = (projectId: any) => {
        window.location.href = "/#/downloadProj?projectId=" + projectId
    }

    return (
        <>
            {
                lstCategory.length > 0 ? lstCategory.map((ele: any) => (
                    <div key={ele.id}>
                        {
                            ele.projects.length > 0 ?
                                <>
                                    <button className={'heading2 course-accordion item' + ele.id} onClick={handleToggle}>
                                        {ele.name}
                                    </button>
                                    <div className="course-panel">
                                        <ul className="tab-board-lst download">
                                            {
                                                ele.projects.map((project: any) => (
                                                    <li key={project.projectId}>
                                                        <div className="row row1">
                                                            <span className="subject">{project.projectName} - {project.version}</span>
                                                            <div className="utility">
                                                                <button className="btn2" onClick={() => handleDownload(project.projectId)}>Download</button>
                                                            </div>
                                                        </div>
                                                        <div className="row row2">
                                                            <div className="info-wrap">
                                                                <span>{project.description}</span>
                                                            </div>
                                                        </div>
                                                        <div className="row row3">
                                                            <div className="info-wrap">
                                                                <span style={{fontWeight : '600'}}>{project.organization}</span>
                                                            </div>
                                                        </div>
                                                        <div className="row row4">
                                                            <div className="info-wrap">
                                                                <span className="date">Last update: {Intl.DateTimeFormat("en-GB").format(new Date(project.updatedDate))}</span>
                                                            </div>
                                                        </div>


                                                        {
                                                            project.tags.length > 0 ?
                                                                <div className="row row1 mt-3">
                                                                    <div className="info-wrap">
                                                                        {
                                                                            project.tags.map((tag: any) => (
                                                                                <span className='badge' key={tag.tagId}>{tag.tagName}</span>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                                : <></>
                                                        }
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                </>

                                :
                                <></>
                        }
                    </div>

                )

                )
                    :
                    <li className="no-data">No data</li>
            }
        </>
    )
}
