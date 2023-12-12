import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AppDialog from "../../../commons/AppDialog";
import AppSelect from "../../../commons/AppSelect";
import { VariablesConstant } from "../../../../constants/variables";
// import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";
// import DeleteIcon from "@mui/icons-material/Delete";
import AppPagination from "../../../commons/AppPagination";
import { Sys0301Service } from "../../../../services/sys/Sys0301Service";
import { HttpStatusCode } from "axios";
import { useTranslation } from "react-i18next";
import UserMngForm from "./form/UserMngForm";
import { Constant } from "../../../../constants/constant";
// import EditIcon from "@mui/icons-material/Edit";
// import { Badge } from "primereact/badge";
import { useAppDispatch } from "../../../../store/hook";
import { showAndHideSpinner } from "../../../../reducers/spinnerSlice";
import { Tag } from "primereact/tag";
import AppFilter from "../../../commons/AppFilter";

export class Sys0301Search {
  fullName: string;
  status: string;
  page: number;
  limit: number;
  time: number;
  columnName: string;
  sortType: string;
  constructor(
    fullName: string,
    status: string,
    page: number,
    limit: number,
    time: number,
    columnName: string,
    sortType: string
  ) {
    this.fullName = fullName;
    this.status = status;
    this.page = page;
    this.limit = limit;
    this.time = time
    this.columnName = columnName;
    this.sortType = sortType;
  }
}

export default function UserMng() {
  const status: any[] = VariablesConstant.SEARCH_STATUS;

  const { t } = useTranslation();

  const [openDialog, setOpen] = useState(false);
  const [data, setData] = useState({});

  const totalPage = useRef(1);

  const [listUser, setListUser] = useState<any>([]);

  let limit = Constant.ROWS_OF_PAGE;

  const [modelSearch, setModelSearch] = useState<Sys0301Search>(
    new Sys0301Search("", "null", Constant.START_PAGE, limit, 0, "null", "")
  );

  const dispatch = useAppDispatch();

  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    _getList();
  }, [modelSearch.fullName, modelSearch.time, modelSearch.status, modelSearch.page]);

  const closeDialog = (data?: any) => {
    setOpen(false);
    if (data) {
      _getList();
    }
  };

  const handleChangeFullName = (event: any) => {
    setModelSearch({
      ...modelSearch,
      fullName: event.target.value,
    });
  };

  const search = () => {
    setModelSearch({
      ...modelSearch,
      page: 1,
      time: new Date().getTime(),

    });
  };

  function _getList() {

    dispatch(showAndHideSpinner(true));
    Sys0301Service.getInstance()
      .search(modelSearch)
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData.value;
            totalPage.current = response.data.responseData.totalElement;
            setListUser(data);
          } else {
            toast.error(`${t('sys0301.message.error.search')}`);
          }

        } else {
          toast.error(`${t('sys0301.message.error.search')}`);
        }
        dispatch(showAndHideSpinner(false));
      })
      .catch((error) => {
        toast.error(`${t('sys0301.message.error.system')}`);
        dispatch(showAndHideSpinner(false));
      });
  }

  const handleChangeSearch = (data: any) => {
    setModelSearch({
      ...modelSearch,
      status: data,
      page: 1,
    });
  };

  const changePage = (page: number) => {
    setModelSearch({
      ...modelSearch,
      page: page,
    });
  };

  const reset = () => {
    setModelSearch({
      ...new Sys0301Search("", "null", 1, limit, new Date().getTime(), "null", ""),
    });
  };

  const hanldeAdd = () => {
    setData({
      userUid: null,
      userId: null,
      password: null,
      email: null,
      fullName: "",
      address: "",
      cellPhone: null,
      dob: "",
      gender: true,
      organization: "",
    });
    setOpen(true);
    setFormStatus("C");
  };

  const editData = (obj: any) => {
    setData(obj);
    setOpen(true);
    setFormStatus("U");
  };

  const deleteItem = (userUid: String) => {
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
        _delete(userUid);
      }
    });
  };

  function _delete(userUid: String) {
    Sys0301Service.getInstance()
      .deleteUser(userUid)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          if (resp.data.status) {
            toast.success(`${t('sys0301.message.success.delete')}`);
            _getList();
          } else {
            toast.error(`${t('sys0301.message.error.delete')}`);
          }
        } else {
          toast.error(`${t('sys0301.message.error.delete')}`);
        }
      })
      .catch((error) => {
        toast.error(`${t('sys0301.message.error.system')}`);
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

  const nameColumn = [
    { label: "All", value: "null", labelKr: "모두" },
    { label: "Full Name", value: "FULL_NAME", labelKr: "전체 이름" },
    { label: "Email", value: "EMAIL", labelKr: "이메일" },
  ];

  const handleChangeFilter = (data: any) => {
    setModelSearch({
      ...modelSearch,
      columnName: data["nameColumn"],
      sortType: data["sortType"],
      time: new Date().getTime(),
      page: 1,
    });
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <AppDialog
        open={openDialog}
        onClose={closeDialog}
        title={formStatus === "C" ? `${t('sys0301.title.dialog.addUser')}` : `${t('sys0301.title.dialog.editUser')}`}
        // style={{ width: "40%" }}
        className="width-dialog"
      >
        <UserMngForm onClose={closeDialog} data={data} />
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
                          value={modelSearch.fullName}
                          className={`form-control`}
                          name="fullName"
                          placeholder={`${t('sys0301.table.header.fullName')}`}
                          onChange={handleChangeFullName}
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
                        <AppSelect dataSource={status} onChange={handleChangeSearch} value={modelSearch.status} />
                      </div>

                      <div className="search-el col-xl-6 col-12 col-sm-12">
                        <label className="form-label">Sort</label>
                        <AppFilter
                          value={modelSearch.columnName}
                          nameColumn={nameColumn}
                          onChange={handleChangeFilter}
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
                        <i className="ri-search-2-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                        {t("sys0301.label.search")}
                      </button>
                      <button
                        type="button"
                        className="btn btn-light btn-label rounded-pill waves-effect waves-light ms-3"
                        onClick={reset}
                      >
                        <i className="ri-refresh-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
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
                {t("sys0301.label.table.list")}
              </h2>
            </div>
            <div className='button-head-body'>
              <button
                type="button"
                className="btn btn-primary btn-label rounded-pill waves-effect waves-light"
                onClick={hanldeAdd}
              >
                <i className="ri-file-add-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                {t("sample.label.button.add")}
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover mb-3">
              <thead className="table-light">
                <tr>
                  <th scope="col">{t("sys0301.table.header.no")}</th>
                  <th scope="col">{t("sys0301.table.header.fullName")}</th>
                  <th scope="col">{t("sys0301.table.header.email")}</th>
                  <th scope="col">{t("sys0301.table.header.cellPhone")}</th>
                  <th scope="col">{t("sys0301.table.header.address")}</th>
                  <th scope="col">{t("sys0301.table.header.organization")}</th>
                  <th scope="col">{t("sys0301.table.header.userName")}</th>
                  {/* <th scope="col">{t('sys0301.table.header.gender')}</th> */}
                  <th scope="col">{t("sys0301.table.header.status")}</th>
                  <th scope="col" style={{ width: "8%" }}></th>
                </tr>
              </thead>
              <tbody>
                {listUser.map((element: any, index: number) => (
                  <tr key={element.userUid}>
                    <td>{(totalPage.current - (modelSearch.page - 1) * limit) - index}</td>
                    <td>{element.fullName}</td>
                    <td>{element.email}</td>
                    <td>{element.cellPhone}</td>
                    <td>{element.address}</td>
                    <td>{element.organization}</td>
                    <td>{element.userId}</td>
                    {/* <td>{element.gender ? "Male" : "Female"}</td> */}
                    {/* <td>{element.statusString}</td> */}
                    <td>
                      <Tag
                        className={
                          element.status === Constant.ACTIVED
                            ? "badge-status-active"
                            : element.status === Constant.DISABLED
                              ? "badge-status-inactive"
                              : "badge-status-lock"
                        }
                        value={
                          element.status === Constant.ACTIVED
                            ? Constant.ACTIVE_STATUS
                            : element.status === Constant.DISABLED
                              ? Constant.DISABLED_STATUS
                              : Constant.LOCK_STATUS
                        }
                        rounded
                      ></Tag>
                    </td>
                    <td>
                      {/* <IconButton
                      aria-label="edit"
                      onClick={() => editData(element)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteItem(element.userInfoId)}
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
                        onClick={() => deleteItem(element.userUid)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end">
            {listUser.length > 0 && (
              <AppPagination
                page={modelSearch.page}
                rows={limit}
                onChange={changePage}
                count={totalPage.current}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
