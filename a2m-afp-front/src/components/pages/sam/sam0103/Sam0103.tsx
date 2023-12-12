// import IconButton from '@mui/material/IconButton';
import { HttpStatusCode } from 'axios';
import dayjs from 'dayjs';
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import { InputAdornment, OutlinedInput } from '@mui/material'
// import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import Sam0103Create from './form/Sam0103Create';
import '../sam.css'
import { Constant } from '../../../../constants/constant';
import { useAppDispatch } from '../../../../store/hook';
import { Sam0101Search } from '../sam0101/Sam0101';
import { Sam0101Service } from '../../../../services/sam/Sam0101Service';
import { showAndHideSpinner } from '../../../../reducers/spinnerSlice';
import { Sam0103Service } from '../../../../services/sam/Sam0103Service';
import { CommonUtil } from '../../../../utils/commonUtil';
import AppDialog from '../../../commons/AppDialog';
import AppSelect from '../../../commons/AppSelect';
import AppDatePicker from '../../../commons/AppDatePicker';
import AppPagination from '../../../commons/AppPagination';
import "./Sam0103.css";


export default function Sam0103() {

  const limit = Constant.ROWS_OF_PAGE;

  const navigate = useNavigate()

  const dispatch = useAppDispatch();

  const location = useLocation()

  const _category = location.state?.category || "null"

  const [_topic, _setTopic] = useState(location.state?.topic || "null")

  const [modelSearch, setModelSearch] = useState<Sam0101Search>(new Sam0101Search("", _category, _topic, "", 1, limit, 0, "null", ""))

  const totalPage = useRef(1)

  const changePage = (page: number) => {
    setModelSearch(
      {
        ...modelSearch, page: page
      }
    )
  }

  const [category, setCategory] = useState<any>([])
  const [topicSearch, setTopicSearch] = useState<any>([])

  const handleChangeSearch = (data: any, type: string) => {
    if (type === 'category') {
      _setTopic("null")
      setModelSearch((pre) => {
        return {
          ...pre, category: data, page: 1, topic: "null"
        }
      })
      Sam0101Service.getInstance().getListTccoStd({ upCommCd: data })
        .then(resp => {
          if (resp.data.status) {
            let tempTopic: any = []
            for (let stepChild = 0; stepChild < resp.data.responseData.length; stepChild++) {
              let itemTopic = resp.data.responseData[stepChild];
              tempTopic.push({
                label: itemTopic['commNmEn'],
                value: itemTopic['commCd'],
                labelKr: itemTopic['commNm']
              })
            }
            setTopicSearch(tempTopic)
          }
        })
        .catch(error => {

        })
    } else {
      setModelSearch({
        ...modelSearch, topic: data, page: 1
      })
    }
  }

  const handleChangeDateSearch = (data: any) => {
    setModelSearch({
      ...modelSearch, date: dayjs(data).format("YYYY-MM-DD"), page: 1
    })
  }

  const handleChangeInput = (event: any) => {
    setModelSearch({
      ...modelSearch,
      title: event.target.value
    })
  }

  const [list, setList] = useState([])

  useEffect(() => {
    if (modelSearch.category != "null" && modelSearch.topic != "null") {
      _getList()
    }
  }, [modelSearch.page, modelSearch.date, modelSearch.time, modelSearch.category, modelSearch.topic])

  function _getList() {
    dispatch(showAndHideSpinner(true))
    Sam0103Service.getInstance().getList(modelSearch).then((resp) => {
      if (resp.status == HttpStatusCode.Ok) {
        if (resp.data.status) {
          const data = resp.data.responseData.value;
          // totalPage.current = Math.ceil(resp.data.responseData.totalElement / modelSearch.limit)
          totalPage.current = resp.data.responseData.totalElement
          setList(data)
        } else {
          toast.error(resp.data.message)
        }
      } else {
        toast.error(resp.statusText)
      }
      dispatch(showAndHideSpinner(false))
    }).catch((error) => {
      toast.error("Server error !!!")
      dispatch(showAndHideSpinner(false))
    })
  }

  useEffect(() => {
    if (category.length > 0) {
      setModelSearch((preState) => {
        return {
          ...preState,
          category: _category === "null" ? category[0]['value'] : _category
        }
      })
    }
  }, [category])

  useEffect(() => {
    if (topicSearch.length > 0) {
      setModelSearch((preState) => {
        return {
          ...preState,
          topic: _topic === "null" ? topicSearch[0]['value'] : _topic
        }
      })
    }
  }, [topicSearch])

  useEffect(() => {
    Sam0101Service.getInstance().getListTccoStd({ upCommCd: Constant.CATEGORY })
      .then(async resp => {
        if (resp.data.status) {
          let temp: any = []
          for (let step = 0; step < resp.data.responseData.length; step++) {
            let item = resp.data.responseData[step];
            if (step == 0) {
              Sam0101Service.getInstance().getListTccoStd({ upCommCd: _category == "null" ? item['commCd'] : _category })
                .then(resp => {
                  if (resp.data.status) {
                    let tempTopic: any = []
                    for (let stepChild = 0; stepChild < resp.data.responseData.length; stepChild++) {
                      let itemTopic = resp.data.responseData[stepChild];
                      tempTopic.push({
                        label: itemTopic['commNmEn'],
                        value: itemTopic['commCd'],
                        labelKr: itemTopic['commNm'],
                      })
                    }
                    setTopicSearch(tempTopic)
                  }
                })
                .catch(error => {

                })
            }
            temp.push({
              label: item['commNmEn'],
              value: item['commCd'],
              labelKr: item['commNm']
            })
          }
          setCategory(temp)
        }
      })
      .catch(error => {

      })
  }, [])

  const search = () => {
    setModelSearch({
      ...modelSearch, page: 1, time: new Date().getTime()
    })
  }

  const reset = () => {
    setModelSearch({
      ...(new Sam0101Search("", "null", "null", "", 1, limit, new Date().getTime(), "null", ""))
    })
    handleChangeSearch(category[0]?.['value'], 'category')
  }

  const { t, i18n } = useTranslation()

  const lang = localStorage.getItem(Constant.LANGUAGE) || Constant.SOUTH_KOREA

  const translate = useCallback((item: any, jobs: any) => {
    return CommonUtil.translate(jobs, item, lang)
  }, [lang])

  const [item, setItem] = useState<any>({})

  const [commentList, setCommentList] = useState<any>([])

  const view = (element: any) => {
    setNewComment(null)
    setItem(element)
    setOpenDetail(true)
    getListComment(element)
  }

  const getListComment = (element: any) => {
    Sam0103Service.getInstance().getListComment({ id: element.id })
      .then(resp => {
        if (resp.data.status) {
          setCommentList(resp.data.responseData)
        } else {
          toast.error(resp.data.message)
          setCommentList([])
        }
      })
      .catch(error => {
        toast.error("Save failed")
      })
  }

  const clickBack = () => {
    setOpenDetail(false)
  }

  const [openDetail, setOpenDetail] = useState(false)

  const [newComment, setNewComment] = useState<any>(null);

  const sendComment = () => {
    if (newComment && newComment.trim() != "") {
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
          Sam0103Service.getInstance().save({ postId: item.id, content: newComment })
            .then(resp => {
              if (resp.data.status) {
                toast.success("Save successfull")
                setNewComment(null)
                getListComment(item)
              } else {
                toast.error("Save failed")
              }
            })
            .catch(error => {
              toast.error("Save error")
            })
        }
      })
    }
  }

  const closeDialog = (data?: any) => {
    setOpen(false)
    if (data) {
      _getList()
    }
  }

  const [openDialog, setOpen] = useState(false)

  return (
    <>
      <AppDialog open={openDialog} onClose={closeDialog} title="New question">
        <Sam0103Create onClose={closeDialog} category={modelSearch.category} topic={modelSearch.topic} dataSourceCategory={category} dataSourceTopic={topicSearch} />
      </AppDialog>
      <ToastContainer></ToastContainer>
      {
        !openDetail ? <>
          <div className="card search-area">
            <div className="card-body">
              {/* <div className='d-flex justify-content-between mb-3'>
                <h2 className="mb-sm-0 card-title mb-0 flex-grow-1">{t('sample.label.search')}</h2>
              </div> */}

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <div className='d-flex justify-content-between'>
                      <h2 className="mb-sm-0 card-title mb-0 flex-grow-1">{t('sample.label.search')}</h2>
                    </div>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#default-accordion-example">
                  <div className="accordion-body">
                    <div className='row mb-3'>


                      <div className='col-xl-8 col-12 col-lg-12 col-sm-12'>
                        {/* <div className='row'>
    <div className='search-el col-xl-3 col-12 col-lg-4 col-sm-12'>
      <label className="form-label">{t('sample.label.category')}</label>
      <AppSelect dataSource={category} onChange={(event) => handleChangeSearch(event, 'category')} value={modelSearch.category} />
    </div>
    <div className='search-el col-xl-3 col-12 col-lg-4 col-sm-12'>
      <label className="form-label">{t('sample.label.topic')}</label>
      <AppSelect dataSource={topicSearch} onChange={(event) => handleChangeSearch(event, 'topic')} value={modelSearch.topic} />
    </div>
  </div> */}
                        <div className='row'>
                          <div className='search-el col-xl-4 col-12 col-lg-4 col-sm-12'>
                            <label className='form-label'>{t('sample.label.input')}</label>
                            <input value={modelSearch.title} className={`form-control`} name='title' onChange={handleChangeInput} onKeyUp={(e: any) => {
                              if (e.key === 'Enter') search()
                            }} />
                          </div>
                          <div className='search-el col-xl-4 col-12 col-lg-4 col-sm-12'>
                            <label className="form-label">{t('sample.label.date')}</label>
                            <AppDatePicker onChange={handleChangeDateSearch} value={modelSearch.date} />
                          </div>
                        </div>
                      </div>

                      <div className='col-xl-4 col-12 col-lg-12 col-sm-12 area-btn-search'>
                        <div className='area-btn-search'>
                          <button type="button" className="btn btn-info btn-label rounded-pill btn-forth waves-effect waves-light" onClick={search}><i className="ri-search-2-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sample.label.search')}</button>
                          <button type="button" className="btn btn-light btn-label rounded-pill waves-effect waves-light" onClick={reset}><i className="ri-refresh-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sample.label.reset')}</button>
                        </div>
                      </div>


                      {/* <div className='col-xl-4'>
  <label className="form-label">{t('sample.label.category')}</label>
  <AppSelect dataSource={category} onChange={(event) => handleChangeSearch(event, 'category')} value={modelSearch.category} />
</div>
<div className='col-xl-4 ps-2'>
  <label className="form-label">{t('sample.label.topic')}</label>
  <AppSelect dataSource={topicSearch} onChange={(event) => handleChangeSearch(event, 'topic')} value={modelSearch.topic} />
</div> */}
                      {/* <div className='col-xl-4'>
  <label className="form-label">&nbsp;</label>
  <div className='d-flex'>
    <button type="button" className="btn  btn-label rounded-pill btn-forth waves-effect waves-light" onClick={search}><i className="ri-search-2-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sample.label.search')}</button>
    <button type="button" className="btn btn-light btn-label rounded-pill waves-effect waves-light ms-3" onClick={reset}><i className="ri-refresh-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sample.label.reset')}</button>
  </div>
</div> */}
                      {/* <div className='col-xl-4'>
  <label className='form-label'>{t('sample.label.input')}</label>
  <input value={modelSearch.title} className={`form-control`} name='title' onChange={handleChangeInput} onKeyUp={(e: any) => {
    if (e.key === 'Enter') search()
  }} />
</div>
<div className='col-xl-4 ps-2'>
  <label className="form-label">{t('sample.label.date')}</label>
  <AppDatePicker onChange={handleChangeDateSearch} value={modelSearch.date} />
</div> */}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="card">
            <div className="card-body">
              <div className='row mb-3'>
                <div className='col-xl-8 col-12 col-sm-12'>
                  <div className='row'>
                    <div className='search-el col-xl-4 col-12 col-lg-4 col-sm-12'>
                      <label className="form-label">{t('sample.label.category')}</label>
                      <AppSelect dataSource={category} onChange={(event) => handleChangeSearch(event, 'category')} value={modelSearch.category} />
                    </div>
                    <div className='search-el col-xl-4 col-12 col-lg-4 col-sm-12'>
                      <label className="form-label">{t('sample.label.topic')}</label>
                      <AppSelect dataSource={topicSearch} onChange={(event) => handleChangeSearch(event, 'topic')} value={modelSearch.topic} />
                    </div>
                  </div></div>
              </div>
            </div>
          </div> */}

          <div id='community-body' className="card">
            <div className="card-body">
              <div className='d-flex justify-content-between mb-3'>
                <div className='title-head-body' style={{width: '70%' }}>
                  <h2 className="mb-sm-0 card-title mb-0 flex-grow-1">Community</h2>
                  <span><i className='pi-chevron-right pi'></i></span>
                  <AppSelect dataSource={category} onChange={(event) => handleChangeSearch(event, 'category')} value={modelSearch.category} />
                  <span><i className='pi-chevron-right pi'></i></span>
                  <AppSelect dataSource={topicSearch} onChange={(event) => handleChangeSearch(event, 'topic')} value={modelSearch.topic} />

                </div>
                <div className='button-head-body'>
                  <button type="button" className="btn btn-primary btn-label rounded-pill waves-effect waves-light" onClick={() => setOpen(true)}><i className="ri-file-add-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sample.label.button.add')}</button>
                </div>
                </div>
              <div className='list-area'>
                {
                  list.map((e: any) => (
                    <div className='row' key={e.id}>
                      <div className='col-lg-8 col-12 col-sm-12'>
                        <h2 className='card-title profile-name-tag sam-cursor' onClick={() => navigate("/sam/sam0103/" + e.id)}>{e.title}</h2>
                      </div>
                      <div className='d-flex col-lg-4 col-12 col-sm-12 justify-content-end'>
                        <span><i className='ri-account-pin-circle-line'></i> {e.createdByNm}</span>
                        <span className='ms-3'><i className='ri-time-line'></i> {dayjs(e.createdDate).format(Constant.FORMAT_DATE_EN)}</span>
                        <div className='d-flex ms-3'>
                          <i className='ri-reply-line'></i>
                          <span className='ms-2'>{e.numberComment} comment</span>
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                  ))
                }
              </div>
              
              <div className='d-flex justify-content-end'>
                {
                  list.length > 0 && <AppPagination page={modelSearch.page} onChange={changePage} count={totalPage.current} />
                }
              </div>
            </div>
          </div>
        </> : <>
          {/* <div className="card">
            <div className="card-body">
              <div className='d-flex justify-content-between mb-3'>
                <div>

                </div>
                <div>
                  <button onClick={clickBack} type="button" className="btn btn-light btn-label rounded-pill waves-effect waves-light ms-3" ><i className="ri-arrow-go-back-line label-icon align-middle rounded-pill fs-16 me-2"></i> Back</button>
                </div>
              </div>
              <div className='d-flex justify-content-center'>
                <div className='col-lg-8 profile-info'>
                  <h3 className='profile-name'>{item?.title}</h3>
                  <div className='short-descrip color-community fs-4'>{translate(item?.topic, topicSearch)}</div>
                  <div className='author-bio fs-5 innerHtml' dangerouslySetInnerHTML={{ __html: item?.content }}></div>
                  <div className='mt-3'>
                    <label className='color-community fs-5'>{t('same0103.view.comment')}</label>
                    <div className='mt-2 mb-3'>
                      <OutlinedInput className='col-lg-12'
                        value={newComment == null ? "" : newComment}
                        onKeyUp={(e: any) => {
                          if (e.keyCode === 13) {
                            sendComment();
                          }
                        }}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNewComment(event.target.value) }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton onClick={sendComment} edge="end">
                              <SendIcon />
                            </IconButton>
                          </InputAdornment>
                        } placeholder={`${t('same0103.input.comment')}`}
                      />
                      <div className={newComment?.trim() === "" ? "error-required" : "display-none"}>
                        {t('same0103.required.comment')}
                      </div>
                    </div>
                    <Sam0103Comment lists={commentList} sendCommentAction={() => { getListComment(item) }} />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </>
      }
    </>
  )
}
