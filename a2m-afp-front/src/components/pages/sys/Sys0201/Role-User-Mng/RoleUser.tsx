import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Constant } from "../../../../../constants/constant";
import { Sys0201Service } from "../../../../../services/sys/Sys0201Service";
import { useTranslation } from "react-i18next";
import AppPagination from "../../../../commons/AppPagination";
import { Checkbox } from "primereact/checkbox";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../../../../store/hook";
import { showAndHideSpinner } from "../../../../../reducers/spinnerSlice";
export class RoleSearch {
  roleNm: string;
  useYn: string;
  page: number;
  limit: number;
  constructor(roleNm: string, useYn: string, page: number, limit: number) {
    this.roleNm = roleNm;
    this.limit = limit;
    this.page = page;
    this.useYn = useYn;
  }
}
export class UserSearch {
  fullName: string;
  page: number;
  limit: number;
  status: string;
  columnName: string;
  sortType: string;
  constructor(fullName: string, page: number, limit: number, status: string, columnName: string,
    sortType: string) {
    this.fullName = fullName;
    this.limit = limit;
    this.page = page;
    this.status = status;
    this.columnName = columnName;
    this.sortType = sortType;
  }
}

export default function RoleUser() {
  const totalPageRole = useRef(1);

  const totalPageUser = useRef(1);

  const { t, i18n } = useTranslation();

  const dispatch = useAppDispatch();


  const limit = Constant.ROWS_OF_PAGE;

  const [modelRoleSearch, setModelRoleSearch] = useState<RoleSearch>(
    new RoleSearch("", "null", Constant.START_PAGE, limit)
  );

  const [modelUserSearch, setModelUserSearch] = useState<UserSearch>(
    new UserSearch("", Constant.START_PAGE, limit, "", "null", "")
  );

  const [listRole, setListRole] = useState<any>([]);

  const [listUser, setListUser] = useState<any>([]);

  const [selectedItem, setSelectedItem] = useState("");

  const [listRoleUser, setListRoleUser] = useState<any>([]);

  const [originLstRoleUser, setOriginLstRoleUser] = useState<any>([]);

  useEffect(() => {
    _getListRole();
    _getListUser();
  }, [
    modelRoleSearch.roleNm,
    modelRoleSearch.page,
    modelUserSearch.fullName,
    modelUserSearch.page,
  ]);

  const search = () => {

    setModelUserSearch({
      ...modelUserSearch, page: 1
    })

    setModelRoleSearch({
      ...modelRoleSearch, page: 1
    })
    // _getListRole();
    // _getListUser();
  };

  const reset = () => {
    // _getList();
    setModelUserSearch({
      ...new UserSearch("", 1, limit, "null", "null", "")
    });

    setModelRoleSearch({
      ...new RoleSearch("", "null", 1, limit)
    });
  };

  const handleChangeRoleInput = (event: any) => {
    setModelRoleSearch({
      ...modelRoleSearch,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeUserInput = (event: any) => {
    setModelUserSearch({
      ...modelUserSearch,
      [event.target.name]: event.target.value,
    });
  };
  function _getListRole() {
    dispatch(showAndHideSpinner(true));
    Sys0201Service.getInstance()
      .search_role(modelRoleSearch)
      .then((res) => {
        setListRole(res.data.responseData.value);
        totalPageRole.current = res.data.responseData.totalElement;
        dispatch(showAndHideSpinner(false));
      })
      .catch((error) => {
        toast.error(`${t('sys0301.message.error.system')}`);
        dispatch(showAndHideSpinner(false));
      });
  }

  function _getListUser() {
    dispatch(showAndHideSpinner(true));
    Sys0201Service.getInstance()
      .searchUser(modelUserSearch)
      .then((res) => {
        setListUser(res.data.responseData.value);
        totalPageUser.current = res.data.responseData.totalElement;
        dispatch(showAndHideSpinner(false));
      })
      .catch((error) => {
        toast.error(`${t('sys0301.message.error.system')}`);
        dispatch(showAndHideSpinner(false));
      });
  }

  const changePageRole = (page: number) => {
    setModelRoleSearch({
      ...modelRoleSearch,
      page: page,
    });
  };

  const changePageUser = (page: number) => {
    setModelUserSearch({
      ...modelUserSearch,
      page: page,
    });
  };

  const changeSelectItem = (itemId: any) => {
    setSelectedItem(itemId);
    dispatch(showAndHideSpinner(true));
    Sys0201Service.getInstance()
      .search_user_role({ roleId: itemId })
      .then((response) => {
        setListRoleUser(response.data.responseData);
        setOriginLstRoleUser(response.data.responseData);
        dispatch(showAndHideSpinner(false));
      })
      .catch((error) => {
        toast.error(`${t('sys0301.message.error.system')}`);
        dispatch(showAndHideSpinner(false));
      });
  };

  const setChecked = (checked: any, element: any) => {
    let _listRoleUser = [...listRoleUser];

    if (checked) {
      const item = {
        roleId: selectedItem,
        userUid: element.userUid,
        checked: checked,
        touch: true,
      };
      _listRoleUser.push(item);
    } else {
      _listRoleUser = _listRoleUser.filter(
        (ele) => ele.userUid !== element.userUid
      );
    }
    setListRoleUser(_listRoleUser);
  };

  const save = () => {
    originLstRoleUser.forEach((item: any) => {
      if (
        !listRoleUser.some((element: any) => element.userUid === item.userUid)
      ) {
        item["checked"] = false;
        item["touch"] = true;
        listRoleUser.push(item);
      } else {
        item["touch"] = false;
      }
    });
    Swal.fire({
      title: `${t("confirm.label.title")}`,
      text: `${t("confirm.label.message.save")}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#809bf1",
      cancelButtonColor: "#727379",
      confirmButtonText: `${t("confirm.button.yes.text")}`,
      cancelButtonText: `${t("confirm.button.no.text")}`,
    }).then((result) => {
      if (result.value) {
        dispatch(showAndHideSpinner(true));
        Sys0201Service.getInstance()
          .save_user_role(listRoleUser)
          .then((res) => {
            if (res.data.success) {
              toast.success(`${t('sys0201.message.success.save')}`);
              // get new list role user
              changeSelectItem(selectedItem);
            } else {
              toast.error(`${t('sys0201.message.error.save')}`);
            }
            dispatch(showAndHideSpinner(false));
          })
          .catch((error) => {
            toast.error(`${t('sys0201.message.error.system')}`);
            dispatch(showAndHideSpinner(false));
          });
      }
    });
  };

  return (
    <>
      <ToastContainer></ToastContainer>
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
                          {t("sys0201.table.header.roleNm")}
                        </label>
                        <input
                          value={modelRoleSearch.roleNm}
                          className={`form-control`}
                          name="roleNm"
                          placeholder={`${t('sys0201.table.header.roleNm')}`}
                          onChange={handleChangeRoleInput}
                          onKeyUp={(e: any) => {
                            if (e.key === "Enter") search();
                          }}
                        />
                      </div>
                      <div className="search-el col-xl-3 col-12 col-sm-12">
                        <label className="form-label">
                          {t("sys0301.table.header.fullName")}
                        </label>
                        <input
                          value={modelUserSearch.fullName}
                          className={`form-control`}
                          name="fullName"
                          placeholder={`${t('sys0301.table.header.fullName')}`}
                          onChange={handleChangeUserInput}
                          onKeyUp={(e: any) => {
                            if (e.key === "Enter") search();
                          }}
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
                {" "}
                {t("sys0201.title.table.roleUserMng")}
              </h2>
            </div>
            <div className='button-head-body'>
              <button
                type="button"
                className="btn btn-primary btn-label rounded-pill waves-effect waves-light"
                onClick={save} disabled={!selectedItem}
              >
                <i className="mdi mdi-check label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                {t("sys0201.title.button.save")}
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-md-5">
              <div className="table-responsive">
                <table className="table table-hover mb-3">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">{t("sample.table.header.no")}</th>
                      <th scope="col">{t("sys0201.table.header.roleId")}</th>
                      <th scope="col">{t("sys0201.table.header.roleNm")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listRole.map((element: any, index: number) => (
                      <tr
                        key={element.roleId}
                        className={
                          selectedItem === element.roleId
                            ? "cus-cursor selected-row"
                            : "cus-cursor"
                        }
                        onClick={() => changeSelectItem(element.roleId)}
                      >
                        <td>{(totalPageRole.current - (modelRoleSearch.page - 1) * limit) - index}</td>
                        <td>{element.roleId}</td>
                        <td>{element.roleNm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-end">
                {listRole.length > 0 && (
                  <AppPagination
                    page={modelRoleSearch.page}
                    onChange={changePageRole}
                    rows={limit}
                    count={totalPageRole.current}
                  />
                )}
              </div>
            </div>
            <div className="col-md-7">
              <div className="table-responsive">
                <table className="table table-hover mb-3">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">{t("sys0301.table.header.no")}</th>
                      <th scope="col">{t("sys0301.table.header.userName")}</th>
                      <th scope="col">{t("sys0301.table.header.fullName")}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listUser.map((element: any, index: number) => (
                      <tr key={element.userUid} className="cus-cursor ">

                        <td>{(totalPageUser.current - (modelUserSearch.page - 1) * limit) - index}</td>
                        <td>{element.userId}</td>
                        <td>{element.fullName}</td>
                        <td>
                          {selectedItem === "" ? (
                            ""
                          ) : (
                            <Checkbox
                              onChange={(e) => setChecked(e.checked, element)}
                              value={element.userUid}
                              checked={listRoleUser.some(
                                (item: any) => item.userUid === element.userUid
                              )}
                            ></Checkbox>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-end">
                {listUser.length > 0 && (
                  <AppPagination
                    page={modelUserSearch.page}
                    onChange={changePageUser}
                    rows={limit}
                    count={totalPageUser.current}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
