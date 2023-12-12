import React, { useEffect, useRef, useState } from 'react'
import { DownloadService } from '../../../../services/download/DownloadService';
import { useAppDispatch } from '../../../../store/hook';
import { showAndHideSpinner } from '../../../../reducers/spinnerSlice';
import { Constant } from '../../../../constants/constant';
import { AfpTab } from '../../../../utils/afp/tab';
import "../style/DownloadStyle.css"
import AppModal from '../../../commons/afp/AppModal';
import ManualsModal from './ManualsModal';
import { HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';

export default function DownloadPage() {
  const url = window.location.href;
  const params = new URLSearchParams(url.split("?")[1]);
  const projectId = params.get('projectId');
  const ref = useRef<any>(null);

  const dispatch = useAppDispatch();

  const [project, setProject] = useState<any>()
  const [tabIndex, setTabIndex] = useState<any>(0)
  const [requestDown, setRequestDown] = useState<any>({})
  const [dependId, setDependId] = useState<any>()
  const [showModal, setShowModal] = useState<any>(false)
  let requestDownl: any

  useEffect(() => {
    _getProjectData(projectId)
    AfpTab.showTab(tabIndex)
  }, [])

  function _getProjectData(id: any) {
    dispatch(showAndHideSpinner(true))
    DownloadService.getInstance().getProjectById({ "projectId": id }).then(res => {
      setProject(res.data.responseData)
      dispatch(showAndHideSpinner(false))
    }).catch(err => {
      dispatch(showAndHideSpinner(false))
    })
  }

  const tabClick = (tabIndex: number) => {
    AfpTab.showTab(tabIndex);
    setTabIndex(tabIndex);
  }

  useEffect(() => {
    if (project) {
      requestDownl = {}
      project.lstLib.forEach((lib: any) => {
        if (lib.optionType == Constant.LIB_OPTION_TYPE_RADIO) {
          requestDownl = { ...requestDownl, [lib.libValue]: lib.lstDepend[0].dependValue }
        }
        if (lib.optionType == Constant.LIB_OPTION_TYPE_CHECKBOX) {
          lib.lstDepend.forEach((depend: any) => {
            requestDownl = { ...requestDownl, [depend.dependValue]: false }
          });
        }
      });
      setRequestDown(requestDownl)
    }
  }, [project])

  const handleChangeOption = (event: any, lib: any, depend: any) => {
    if (lib.optionType == Constant.LIB_OPTION_TYPE_RADIO) {
      setRequestDown({
        ...requestDown,
        [lib.libValue]: event.target.value
      })
    } else if (lib.optionType == Constant.LIB_OPTION_TYPE_CHECKBOX) {
      setRequestDown({
        ...requestDown,
        [depend.dependValue]: event.target.checked
      })
    }
  }

  const handleChangeProjectName = (event: any) => {
    setRequestDown({
      ...requestDown,
      [event.target.name]: event.target.value
    })
  }

  const handleGenerate = () => {
    if (chk()) {
      // console.log(requestDown);
      dispatch(showAndHideSpinner(true))
      DownloadService.getInstance().downloadProject(requestDown, project.downloadUrl).then((response: any) => {
        if (response.status == HttpStatusCode.Ok) {
          let url: any = window.URL || window.webkitURL;
          let anchor = document.createElement("a");
          anchor.href = url.createObjectURL(response.data);
          anchor.download = requestDown.pRoJectNaMe + '.zip';
          document.body.append(anchor);
          anchor.click();
          anchor.remove();
          window.URL.revokeObjectURL(url);
          requestDown.projectId = projectId
          DownloadService.getInstance().saveHistory(requestDown).then(res => {
            dispatch(showAndHideSpinner(false))
          }).catch(error => {
            dispatch(showAndHideSpinner(false))
          })
          // ref.current.value = '';
        }
      }).catch(err => {
        toast.error("Server error, download failed ")
        dispatch(showAndHideSpinner(false))
        // ref.current.value = '';
      })
    }

  }
  const chk = () => {
    let _chk = true;
    if (requestDown.pRoJectNaMe == "" || requestDown.pRoJectNaMe == null) {
      _chk = false;
    }

    if (!_chk) {
      setRequestDown((prveState: any) => {
        return {
          ...prveState,
          pRoJectNaMe: prveState.pRoJectNaMe || ""
        }
      })
    }
    return _chk;
  }
  const handleOpenManuals = (id: any) => {
    setShowModal(true);
    setDependId(id);
  }

  const closeModal = (data?: any) => {
    setShowModal(false);
  }
  const onClose = (event: any) => {
    setShowModal(false)
  }
  return (
    <>
      <article className="content-area scroll-wrap" style={{ overflowY: "scroll" }}>
        <div className="content-box">
          {project != undefined &&
            <table className="board-lst" style={{ padding: "50px" }}>
              <tbody>
                <tr>
                  <td style={{ width: "200px" }}><span className='subject'>Project Name:</span></td>
                  <td><h3>{project.projectName}</h3></td>
                </tr>
                <tr>
                  <td style={{ width: "200px" }}><span className='subject'>Last updated:</span></td>
                  <td><h3>{Intl.DateTimeFormat("en-GB").format(new Date(project.updatedDate))}</h3></td>
                </tr>
                <tr>
                  <td style={{ width: "200px" }}><span className='subject'>Owner:</span></td>
                  <td><h3>{project.organization}</h3></td>
                </tr>
                <tr>
                  <td style={{ width: "200px" }}><span className='subject'>Description:</span></td>
                  <td><h3>{project.description}</h3></td>
                </tr>
                <tr>
                  <td style={{ width: "200px" }}><span className='subject'>Tags:</span></td>
                  <td>
                    <div className='row row1'>
                      <div className="info-wrap">
                        {
                          project.lstTag.length > 0 && project.lstTag.map((tag: any) => (
                            <span className='badge' key={tag.tagId}>{tag.tagName}</span>
                          ))
                        }
                      </div>
                    </div>

                  </td>
                </tr>
                {
                  project.lstLib.length > 0 && project.lstLib.map((lib: any) => (
                    lib.libValue.toString() === Constant.LIB_NAME_COMPONENT_SAMP &&
                    <tr key={lib.libId + 'libra'}>
                      <td style={{ width: "200px" }}><span className='subject'>Component Sample:</span></td>
                      <td>
                        <div className='row row1'>
                          <div className="info-wrap">
                            {
                              lib.lstDepend.map((depend: any) => (
                                <div key={depend.dependId + "dep"}>
                                  <span className={depend.enable == Constant.DEPEND_STATUS_DEACTIVE ? 'badge disable' : 'badge'} key={depend.dependId + 'dep'}>{depend.dependName}</span>
                                  <button className='inf-btn' onClick={() => handleOpenManuals(depend.dependId)}></button>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>}
        </div>

        <div className="tab-wrap" style={{ marginTop: '50px' }}>
          <div className="tab-type2">
            <div className="tab-menu">
              <button onClick={() => { tabClick(0) }} className="tab-btn">Readme</button>
              <button onClick={() => { tabClick(1) }} className="tab-btn">Download</button>
              <div className="tab-indicator"></div>
            </div>
            <div className="tab-content active">
              {
                project != undefined &&
                <div className="content-box" >
                  {
                    tabIndex === 0 ? <div style={{ padding: '50px' }} dangerouslySetInnerHTML={{ __html: project.manuals }}></div>
                      :
                      <div style={{ padding: '50px' }}>
                        <div style={{ marginBottom: '50px', display: "flex" }}>
                          <div className={`input-group ${requestDown.pRoJectNaMe == "" ? 'error' : ''}`} style={{ width: "80%", marginRight: "100px" }}>
                            <label>
                              <input type="text" ref={ref} name='pRoJectNaMe' placeholder="Project name" onChange={(event: any) => handleChangeProjectName(event)} />
                            </label>
                            <span className={`${requestDown.pRoJectNaMe == "" ? 'error-msg' : 'display-none'}`}>Project name is not empty</span>
                          </div>
                          <button className='btn2' onClick={() => handleGenerate()}>Generate source</button>
                        </div>
                        {
                          project.lstLib.length > 0 && project.lstLib.map((lib: any) => (
                            <div className="option" key={lib.libId + 'lib'}>
                              {
                                <>
                                  {lib.optionType != Constant.LIB_OPTION_TYPE_MAUNALS ? <h3 className='feature-name'>{lib.libName}</h3> : <></>}
                                  <div style={{ display: 'flex' }}>
                                    {
                                      lib.lstDepend.length && lib.lstDepend.map((depend: any, index: any) => (
                                        <div className='lst-option' key={depend.dependId + "depend"}>
                                          {
                                            lib.optionType == Constant.LIB_OPTION_TYPE_RADIO &&
                                            <>
                                              <input type="radio" id={depend.dependId} name={lib.libValue} value={depend.dependValue} checked={requestDown[lib.libValue] === depend.dependValue ? true : false} onChange={(event) => handleChangeOption(event, lib, depend)} />
                                              <label htmlFor={depend.dependId}>{depend.dependName}</label>
                                              <button className='inf-btn' onClick={() => handleOpenManuals(depend.dependId)}></button>
                                            </>
                                          }
                                          {
                                            (lib.optionType == Constant.LIB_OPTION_TYPE_CHECKBOX) &&
                                            <>
                                              <input className='checkbox' type="checkbox" id={depend.dependId} name={depend.dependId} value={depend.dependValue} onChange={(event) => handleChangeOption(event, lib, depend)} />
                                              <label htmlFor={depend.dependId}>{depend.dependName}</label>
                                              <button className='inf-btn' onClick={() => handleOpenManuals(depend.dependId)}></button>
                                            </>
                                          }

                                        </div>
                                      ))
                                    }
                                  </div>
                                </>

                              }
                            </div>
                          ))
                        }

                      </div>
                  }
                </div>
              }
            </div>
          </div>
        </div>


      </article>
      {
        showModal && (
          <AppModal open={showModal} title="Manuals" onClose={closeModal} >
            <ManualsModal onClose={onClose} dependId={dependId} />
          </AppModal>
        )
      }
    </>
  )
}
