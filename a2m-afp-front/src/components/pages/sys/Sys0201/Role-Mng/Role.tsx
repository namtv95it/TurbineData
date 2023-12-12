import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Sys0201Service } from "../../../../../services/sys/Sys0201Service";
import { HttpStatusCode } from "axios";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { Constant } from "../../../../../constants/constant";
// import IconButton from "@mui/material/IconButton";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import AppPagination from "../../../../commons/AppPagination";
import AppDialog from "../../../../commons/AppDialog";
import RoleForm from "./Form/RoleForm";
// import { Badge } from "primereact/badge";
import { Tag } from "primereact/tag";
import AppSelect from "../../../../commons/AppSelect";
import { useAppDispatch } from "../../../../../store/hook";
import { showAndHideSpinner } from "../../../../../reducers/spinnerSlice";

export class RoleSearch {
  roleNm: string;
  useYn: string;
  page: number;
  limit: number;
  constructor(roleNm: string, useYn: string, page: number, limit: number,) {
    this.roleNm = roleNm;
    this.page = page;
    this.limit = limit;
    this.useYn = useYn;
  }
}

export default function Role() {
  // const status: any[] = VariablesConstant.SEARCH_STATUS;

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const useYn: any[] = [
    { label: "All", value: "null", labelKr: "모두" },
    { label: "Active", value: "Y", labelKr: "활동적인" },
    { label: "Inactive", value: "N", labelKr: "비활성" },
  ]

  const [openDialog, setOpen] = useState(false);
  const [data, setData] = useState({});

  const limit = Constant.ROWS_OF_PAGE;

  const totalPage = useRef(1);

  const [listRole, setListRole] = useState<any>([]);

  const [formStatus, setFormStatus] = useState("");

  const [modelSearch, setModelSearch] = useState<RoleSearch>(
    new RoleSearch("", "null", Constant.START_PAGE, limit)
  );

  useEffect(() => {
    _getList();
  }, [modelSearch.roleNm, modelSearch.useYn, modelSearch.page]);

  const closeDialog = (data?: any) => {
    setOpen(false);
    if (data) {
      _getList();
    }
  };

  const handleChangeRoleNm = (event: any) => {
    setModelSearch({
      ...modelSearch,
      roleNm: event.target.value,
    });
  };

  const handleChangeSearch = (data: any) => {
    setModelSearch({
      ...modelSearch, useYn: data
    })
  }

  const search = () => {
    setModelSearch({
      ...modelSearch,
      page: 1,
    });
  };

  function _getList() {
    dispatch(showAndHideSpinner(true));
    Sys0201Service.getInstance()
      .search_role(modelSearch)
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData.value;
            totalPage.current = response.data.responseData.totalElement;
            setListRole(data);
          } else {
            toast.error(`${t('sys0201.message.error.search')}`);
          }
        } else {
          toast.error(`${t('sys0201.message.error.search')}`);
        }
        dispatch(showAndHideSpinner(false));
      })
      .catch((error) => {
        toast.error(`${t('sys0201.message.error.system')}`);
        dispatch(showAndHideSpinner(false));
      });
  }

  const changePage = (page: number) => {
    setModelSearch({
      ...modelSearch,
      page: page,
    });
  };

  const reset = () => {
    setModelSearch({
      ...new RoleSearch("", "null", 1, limit),
    });
  };

  const hanldeAdd = () => {
    setData({
      roleId: null,
      roleNm: null,
      description: "",
      useYn: "N",
    });
    setOpen(true);
    setFormStatus("C");
  };

  const editData = (obj: any) => {
    setData(obj);
    setOpen(true);
    setFormStatus("U");
  };



  const deleteItem = (id: number) => {
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
        _delete(id);
      }
    });
  };

  function _delete(userInfoId: number) {
    dispatch(showAndHideSpinner(true));
    Sys0201Service.getInstance()
      .delete_role(userInfoId)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          if (resp.data.status) {
            toast.success(`${t('sys0201.message.success.delete')}`);
            _getList();
          } else {
            toast.error(`${t('sys0201.message.error.delete')}`);
          }
        } else {
          toast.error(`${t('sys0201.message.error.delete')}`);
        }
        dispatch(showAndHideSpinner(false));
      })
      .catch((error) => {
        toast.error(`${t('message.error.system')}`);
        dispatch(showAndHideSpinner(false));
      });
  }

  // const lang = localStorage.getItem(Constant.LANGUAGE) || Constant.SOUTH_KOREA;

  // const translateTitleDialog = useCallback(
  //   (item: any) => {
  //     if (!item) {
  //       return "";
  //     }
  //     if (Constant.SOUTH_KOREA === lang) {
  //       return item.menuNm;
  //     } else if (Constant.ENGLISH === lang) {
  //       return item.menuNmEn;
  //     }
  //   },
  //   [lang]
  // );

  return (
    <>
      <ToastContainer></ToastContainer>
      <AppDialog
        open={openDialog}
        width={{ maxWidth: "sm", fullWidth: true }}
        onClose={closeDialog}
        title={formStatus === "C" ? `${t('sys0201.title.dialog.addRole')}` : `${t('sys0201.title.dialog.editRole')}`}
        style={{ width: "30%" }}
      >
        <RoleForm onClose={closeDialog} data={data} />
      </AppDialog>
      <div className="card my-4">
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
                          {t("sys0201.label.roleNm")}
                        </label>
                        <input
                          value={modelSearch.roleNm}
                          className={`form-control`}
                          name="roleName"
                          placeholder={`${t('sys0201.label.roleNm')}`}
                          onChange={handleChangeRoleNm}
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
                          dataSource={useYn}
                          onChange={handleChangeSearch}
                          value={modelSearch.useYn}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-2 col-12 col-sm-12 area-btn-search">
                    <div>
                      <button
                        type="button"
                        className="btn  btn-label rounded-pill btn-forth waves-effect waves-light"
                        onClick={search}
                      >
                        <i className="ri-search-2-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                        {t("sys0201.title.button.search")}
                      </button>
                      <button
                        type="button"
                        className="btn btn-light btn-label rounded-pill waves-effect waves-light ms-3"
                        onClick={reset}
                      >
                        <i className="ri-refresh-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                        {t("sys0201.title.button.reset")}
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
                {t("sys0201.title.table.roleMng")}
              </h2>
            </div>
            <div className='button-head-body'>
              <button
                type="button"
                className="btn btn-primary btn-label rounded-pill waves-effect waves-light"
                onClick={hanldeAdd}
              >
                <i className="ri-file-add-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                {t("sys0201.title.button.add")}
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-nowrap mb-3">
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: "10%" }}>
                    {t("sys0201.table.header.no")}
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    {t("sys0201.table.header.roleId")}
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    {t("sys0201.table.header.roleNm")}
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    {t("sys0201.table.header.status")}
                  </th>
                  <th scope="col" style={{ width: "35%" }}>
                    {t("sys0201.table.header.description")}
                  </th>
                  <th scope="col" style={{ width: "10%" }}></th>
                </tr>
              </thead>
              <tbody>
                {listRole.map((element: any, index: number) => (
                  <tr key={element.roleId}>
                    {/* <td>{(modelSearch.page - 1) * limit + index + 1}</td> */}
                    <td>{(totalPage.current - (modelSearch.page - 1) * limit) - index}</td>
                    <td>{element.roleId}</td>
                    <td>{element.roleNm}</td>
                    <td>
                      <Tag
                        className={
                          element.useYn === "Y"
                            ? "badge-status-active"
                            : "badge-status-inactive"
                        }
                        value={
                          element.useYn === "Y"
                            ? Constant.ACTIVE_STATUS
                            : Constant.INACTIVE_STATUS
                        }
                        rounded
                      ></Tag>
                    </td>
                    <td>{element.description}</td>
                    <td className="d-flex">
                      {/* <IconButton
                      aria-label="edit"
                      onClick={() => editData(element)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteItem(element.roleId)}
                    >
                      <DeleteIcon />
                    </IconButton> */}
                      <i
                        className="icon ri-edit-2-fill"
                        style={{ cursor: "pointer" }}
                        onClick={() => editData(element)}
                      ></i>
                      <i
                        className="icon ri-delete-bin-2-fill ps-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteItem(element.roleId)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end">
            {listRole.length > 0 && (
              <AppPagination
                page={modelSearch.page}
                onChange={changePage}
                count={totalPage.current}
                rows={limit}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
