import React, { useEffect, useState } from 'react'
import AppDropdown from '../../../commons/afp/AppDropdown'
import { ComStdService } from '../../../../services/common/ComStdService'
import { Constant } from '../../../../constants/constant'
import { ProjectDto } from '../../../../model/pro/ProjectDto'
import AppMarkdown from '../../../commons/AppMarkdown'
import { toast } from 'react-toastify'
import { Pro0101Service } from '../../../../services/pro/Pro0101Service'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'
import { showAndHideSpinner } from '../../../../reducers/spinnerSlice'
import { useAppDispatch } from '../../../../store/hook'

export default function Pro_0101From(props: any) {

    const [dataSource, setDataSource] = useState([])
    const [projectDto, setProjectDto] = useState<ProjectDto>(new ProjectDto(null, null, null, null, null))

    const { t, i18n } = useTranslation()
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (props.projectId) {
            dispatch(showAndHideSpinner(true))
            Pro0101Service.getInstance().getProjectById(props.projectId)
                .then(resp => {
                    if (resp.data.status) {
                        let dto = resp.data.responseData;
                        let projectDto = new ProjectDto(dto.id, dto.projectType, dto.title, dto.uri, dto.description);
                        setProjectDto(projectDto)
                    } else {
                        toast.error("Get project fail !")
                    }
                    dispatch(showAndHideSpinner(false))
                })
                .catch(error => {
                    dispatch(showAndHideSpinner(false))
                })
        }
    }, [props])

    useEffect(() => {
        ComStdService.getInstance().getListTccoStd({ upCommCd: Constant.PROJECT_TYPE_STD })
            .then((resp) => {
                if (resp.data.status) {
                    setDataSource(resp.data.responseData)
                } else {
                    toast.error("Get project type fail !")
                }
            })
            .catch((error) => {
                // console.log(error);
            })
    }, [])

    const onChangeProjectType = (event: any) => {
        setProjectDto({
            ...projectDto,
            projectType: event
        })
    }

    const handleChange = (event: any) => {
        setProjectDto({
            ...projectDto,
            [event.target.name]: event.target.value
        })
    }

    const chk = () => {
        let _chk = true
        if (projectDto.projectType == "" || projectDto.projectType == null) {
            // toast.error("Project type is not empty")
            _chk = false;
        } else if (projectDto.title == "" || projectDto.title == null) {
            // toast.error("Project name is not empty")
            _chk = false;
        } else if (projectDto.uri != "" && projectDto.uri != null && !(projectDto.uri.startsWith("http://") || projectDto.uri.startsWith("https://"))) {
            // toast.error("Repository URI is not empty")
            _chk = false;
        } else if (projectDto.description == "" || projectDto.description == null) {
            // toast.error("Description is not empty")
            _chk = false;
        }
        if (!_chk) {
            setProjectDto((prveState: ProjectDto) => {
                return {
                    ...prveState,
                    projectType: prveState.projectType || "",
                    title: prveState.title || "",
                    uri: prveState.uri || "",
                    description: prveState.description || "",
                }
            })
        }
        return _chk;
    }

    const handleSave = () => {
        if (chk()) {
            Swal.fire({
                title: `${t('confirm.label.title')}`,
                text: `${t('confirm.label.message.save')}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#809bf1',
                cancelButtonColor: '#727379',
                confirmButtonText: `${t('confirm.button.yes.text')}`,
                cancelButtonText: `${t('confirm.button.no.text')}`
            }).then((result) => {
                if (result.value) {
                    Pro0101Service.getInstance().save(projectDto)
                        .then(resp => {
                            if (resp.data.status) {
                                props.onClose(true)
                            } else {
                                toast.error("Save fail")
                            }
                        })
                        .catch(error => {

                        })
                }
            })

        }
    }

    // useEffect(() => {
    //     console.log(projectDto);
    // }, [projectDto])

    return (
        <>
            <div className="modal-content-area">
                <div className={`input-group ${projectDto.projectType == "" ? 'error' : ''}`}>
                    <p className="tit">Project type</p>
                    <AppDropdown sources={dataSource} value={projectDto.projectType == "" ? undefined : projectDto.projectType} onChange={(event) => onChangeProjectType(event)} bindLabel={'commNm'} bindValue={'commCd'} />
                    <span className={`${projectDto.projectType == "" ? 'error-msg' : 'display-none'}`}>Project type is not empty</span>
                </div>
                <div className={`input-group ${projectDto.title == "" ? 'error' : ''}`}>
                    <p className="tit">Project name</p>
                    <label>
                        <input type="text" value={projectDto.title || ""} name="title" placeholder="Project name" onChange={handleChange} />
                    </label>
                    <span className={`${projectDto.title == "" ? 'error-msg' : 'display-none'}`}>Project name is not empty</span>
                </div>
                <div className={`input-group ${projectDto.uri != null && projectDto.uri != "" && !(projectDto.uri?.startsWith("http://") || projectDto.uri?.startsWith("https://")) ? 'error' : ''}`}>
                    <p className="tit">Repository URI</p>
                    <label>
                        <input type="text" value={projectDto.uri || ""} name="uri" placeholder="github, gitlap URI" onChange={handleChange} />
                    </label>
                    {/* <span className={`${projectDto.uri == "" ? 'error-msg' : 'display-none'}`}>Repository URI is not empty</span> */}
                    <span className={`${projectDto.uri != null && projectDto.uri != "" && !(projectDto.uri?.startsWith("http://") || projectDto.uri?.startsWith("https://")) ? 'error-msg' : 'display-none'}`}>Repository URI is not valid</span>
                </div>
                <div className={`input-group ${projectDto.description == "" ? 'error' : ''}`}>
                    <p className="tit">Description</p>
                    <AppMarkdown content={projectDto.description || ""} onChange={(data) => {
                        setProjectDto((preState: ProjectDto) => {
                            return {
                                ...preState,
                                description: preState.description == null && data == "" ? null : data
                            }
                        })
                    }} />
                    <span className={`${projectDto.description == "" ? 'error-msg' : 'display-none'}`}>Description is not empty</span>
                </div>
            </div>

            <div className="modal-btn-wrap">
                <button className="btn3" onClick={() => {
                    props.onClose(false);
                }}>Cancel</button>
                <button className="btn2" onClick={handleSave}>Save</button>
            </div>
        </>
    )
}
