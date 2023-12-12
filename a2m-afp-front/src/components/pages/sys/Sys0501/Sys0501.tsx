import { Column, ColumnEditorOptions } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { TreeTable, TreeTableSelectionEvent } from 'primereact/treetable';
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from "react-toastify";
import { showAndHideSpinner } from '../../../../reducers/spinnerSlice';
import { Sys0501Service } from '../../../../services/sys/Sys0501Service';
import { useAppDispatch } from '../../../../store/hook';
import AppDialog from '../../../commons/AppDialog';
import AppSelect from '../../../commons/AppSelect';
import Sys0501Form from './form/Sys0501Form';

export class Sys0501Search {
  libName: string;
  status: string;
  constructor(libName: string, status: string) {
    this.libName = libName;
    this.status = status;
  }
}

export default function Sys0501() {

  const status: any[] = [
    { label: "All", value: "null", labelKr: "모두" },
    { label: "Active", value: "1", labelKr: "활동적인" },
    { label: "Inactive", value: "0", labelKr: "비활성" },
  ]

  const { t } = useTranslation();
  const [openDialog, setOpen] = useState(false);
  const [listManual, setListManual] = useState<any>([]);
  const [modelSearch, setModelSearch] = useState<Sys0501Search>(new Sys0501Search("", "null"))
  const [selectedItem, setSelectedItem] = useState('')
  const [isReset, setIsReset] = useState(false)


  useEffect(() => {
    _getList()
  }, [])

  const search = () => {
    _getList()
  }

  const closeDialog = (data?: any) => {    
    setOpen(false);
    
  };

  const handleChangeLibName = (event: any) => {
    setModelSearch({
      ...modelSearch,
      libName: event.target.value
    })
  }

  const dispatch = useAppDispatch();

  function _getList() {
    dispatch(showAndHideSpinner(true));
    Sys0501Service.getInstance().getListLib(modelSearch).then((response: any) => {                        
      response.data.responseData.forEach((element: any) => {
        element['data'] = element
        if(element.libId){
          element['key'] = element.libId
          element.type = 0
        }else{
          element['key'] = element.categoryId + "P"
          element.type = 1
        }
        
        
        if (element.children.length > 0) {
          element.children.forEach((child: any) => {
            child['data'] = child
            if(child.dependId){
              child['key'] = child.dependId 
              child.type = 0
            }else{
              child['key'] = child.projectId + "P"
              child.type = 1
            }
          });
        }
      })
      setListManual(response.data.responseData)
      dispatch(showAndHideSpinner(false));
    })
  }

  const handleChangeSelect = (data: any) => {
    setModelSearch({
      ...modelSearch, status: data
    })
  }

  useEffect(() => {
    if (isReset) {
      _getList()
      setIsReset(false)
    }

  }, [isReset])

  const reset = (data: any) => {
    setIsReset(true)
    setModelSearch({
        ...(new Sys0501Search('', 'null'))
    })
  }

  const setSelectedNodeKey = (value: any) => {
  }

  const changeStatus = (event:any, item:any) => {    
    let lstLib = [...listManual]
    lstLib.forEach((ele:any)=>{
      // change status library
      if(item.children && item.libId === ele.libId){
        const data ={
          enable: event,
          type: 0,
          id : item.libId
        }
        Sys0501Service.getInstance().changeStatus(data).then((res)=>{
          if(res.data.status === true){
            ele.enable = event;
            setListManual(lstLib);
          }else{
            toast.error(`${t('sys0501.message.error.changeStatus')}`)
          }
        })
        
      }else{
        // change status dependency
        ele.children.forEach((child:any)=>{
          if(child.dependId === item.dependId){
            const data ={
              enable: event,
              type: 1,
              id : item.dependId
            }
            Sys0501Service.getInstance().changeStatus(data).then((res)=>{
              if(res.data.status === true){
                child.enable = event;
                setListManual(lstLib);
              }else{
                toast.error(`${t('sys0501.message.error.changeStatus')}`)
              }
            })
          }
        })
      }
      
    })
  } 

  const statusBodyTemplate = (item: any) => {
    return <>
    {
      item.type === 1 ? <></>
      :
      <>
        {
          item.children?
          <Tag className={item.enable === true ? 'badge-status-active' : 'badge-status-inactive'} value={item.enable === true ? `${t('sys0101.title.status.active')}` : `${t('sys0101.title.status.inactive')}`} rounded></Tag>
          :
          <Tag className={item.enable === 1 ? 'badge-status-active' : item.enable === 0 ? 'badge-status-inactive': '' } value={item.enable === 1 ? `${t('sys0101.title.status.active')}` : item.enable === 0 ?`${t('sys0101.title.status.inactive')}` : 'Progress'} rounded></Tag>
        }
      </>
      // <InputSwitch checked={item.enable === 1 || item.enable === true} onChange={(e: InputSwitchChangeEvent) => changeStatus(e,item)} />
    }
    
      {/* <Tag className={item.enable === true ? 'badge-status-active' : 'badge-status-inactive'} value={item.enable === true ? `${t('sys0101.title.status.active')}` : `${t('sys0101.title.status.inactive')}`} rounded></Tag> */}
    </>;
  };

  const actionBodyTemplate = (item: any) => {
    return <>
      {item.children ?
        <></>
        :
        <i className="icon ri-eye-line" onClick={() => editManual(item)}></i>
      }
    </>;
  };

  const editManual = (item: any) => {
    setSelectedItem(item);
    setOpen(true);
  }

  const onCloseDialog = (data:any)=>{  
    setOpen(false);
  }
  const statusDepend = [
    { label: "Progress", value: 2, labelKr: "진전"},
    { label: "Active", value: 1, labelKr: "활동적인" },
    { label: "Inactive", value: 0, labelKr: "비활성" },
  ];
  const statusLib = [
    { label: "Active", value: true, labelKr: "활동적인" },
    { label: "Inactive", value: false, labelKr: "비활성" },
  ];
  const selectStatusEditor = (options: ColumnEditorOptions) => {
    return <div className='w-100'>
    {options.node.children ?
      <AppSelect dataSource={statusLib} onChange={(data:any)=>changeStatus(data, options.node)} value={options.node.enable}></AppSelect>
      :
      <AppSelect dataSource={statusDepend} onChange={(data:any)=>changeStatus(data, options.node)} value={options.node.enable}></AppSelect>
    }
  </div>;
  };


  return (
    <>
      <ToastContainer></ToastContainer>
      <AppDialog
        open={openDialog}
        width={{ maxWidth: "sm", fullWidth: true }}
        onClose={closeDialog}
        title="Edit Manual"
        style={{ width: "80%" }}
      >
        <Sys0501Form onClose={onCloseDialog} data={selectedItem}></Sys0501Form>
      </AppDialog>
      <div className="card">
        <div className="card-body">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <div className="d-flex justify-content-between">
                  <h2 className="mb-sm-0 card-title mb-0 flex-grow-1">
                    {t("sample.label.search")}
                  </h2>
                </div>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#default-accordion-example"
            >
              <div className="accordion-body">
                <div className="row mb-3">
                  <div className="col-xl-10 col-12 col-sm-12">
                    <div className="row">
                      <div className="search-el col-xl-3 col-12 col-sm-12">
                        <label className="form-label">
                          {" "}
                          {t("sys0301.label.fullName")}
                        </label>
                        <input
                          value={modelSearch.libName}
                          className={`form-control`}
                          name="fullName"
                          placeholder="Full name"
                          onChange={handleChangeLibName}
                          onKeyUp={(e: any) => {
                            if (e.key === "Enter") search();
                          }}
                        />
                      </div>
                      <div className="search-el col-xl-3 col-12 col-sm-12">
                        <label className="form-label">
                          {" "}
                          {t("sys0301.label.status")}
                        </label>
                        <AppSelect
                          dataSource={status}
                          onChange={handleChangeSelect}
                          value={modelSearch.status}
                        />
                      </div>

                    </div>
                  </div>
                  <div className="col-xl-2 col-12 col-sm-12 area-btn-search">
                    <div>
                      <button
                        type="button"
                        className="btn btn-label rounded-pill btn-forth waves-effect waves-light"
                        onClick={search}
                      >
                        <i className="ri-search-2-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                        {t("sys0301.label.search")}
                      </button>
                      <button
                        type="button"
                        className="btn btn-light btn-label rounded-pill waves-effect waves-light ms-3"
                        onClick={reset}
                      >
                        <i className="ri-refresh-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                        {t("sys0301.label.reset")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <div className='title-head-body'>
              <h2 className="mb-sm-0 card-title mb-0 flex-grow-1">
                {t('sys0501.title.table.manualMng')}
              </h2>
            </div>
          </div>
          <div className="table-responsive">
            <TreeTable value={listManual} scrollable scrollHeight="700px"
              onSelectionChange={(e: TreeTableSelectionEvent) => setSelectedNodeKey(e.value)} metaKeySelection={false}>
              <Column field="name" header={`${t('sys0501.table.header.name')}`} expander></Column>
              <Column style={{ width: '150px' }} editor={selectStatusEditor} body={statusBodyTemplate} header={`${t('sys0101.table.header.status')}`}></Column>
              <Column style={{ width: '100px' }} body={actionBodyTemplate} header=""></Column>
            </TreeTable>
          </div>
        </div>
      </div>
    </>
  )
}
