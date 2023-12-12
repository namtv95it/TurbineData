import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Constant } from "../../../../../constants/constant";
import { Sys0201Service } from "../../../../../services/sys/Sys0201Service";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
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
  constructor(
    roleNm: string,
    useYn: string,
    page: number,
    limit: number,

  ) {
    this.roleNm = roleNm;
    this.limit = limit;
    this.page = page;
    this.useYn = useYn;
  }
}

export class MenuSearch {
  menuNm: string;
  page: number;
  limit: number;
  constructor(menuNm: string, page: number, limit: number) {
    this.menuNm = menuNm;
    this.limit = limit;
    this.page = page;
  }
}

export default function RoleUser() {
  const totalPageRole = useRef(1);

  const totalPageMenu = useRef(2);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const limit = Constant.ROWS_OF_PAGE;

  const [roleModelSearch, setRoleModelSearch] = useState<RoleSearch>(
    new RoleSearch("", "null", Constant.START_PAGE, limit)
  );

  const [menuModelSearch, setMenuModelSearch] = useState<MenuSearch>(
    new MenuSearch("", Constant.START_PAGE, limit)
  );

  const [listRole, setListRole] = useState<any>([]);

  const [listMenu, setListMenu] = useState<any>([]);

  const [listMenuRole, setListMenuRole] = useState<any>([]);

  const [selectedItem, setSelectedItem] = useState("");

  const [originLstMenuRole, setOriginLstMenuRole] = useState<any>([]);

  useEffect(() => {
    _getListRole();
    _getListMenu();
  }, [
    roleModelSearch.roleNm,
    roleModelSearch.page,
    menuModelSearch.menuNm,
    menuModelSearch.page,
  ]);

  const search = () => {
    setRoleModelSearch({
      ...roleModelSearch,
      page: 1,
    });
    setMenuModelSearch({
      ...menuModelSearch,
      page: 1,
    });
  };

  const reset = () => {
    setRoleModelSearch({
      ...new RoleSearch("", "null", 1, limit),
    });
    setMenuModelSearch({
      ...new MenuSearch("", 1, limit),
    });
  };

  const handleChangeInput = (event: any) => {
    setRoleModelSearch({
      ...roleModelSearch,
      [event.target.name]: event.target.value,
    });
    setMenuModelSearch({
      ...menuModelSearch,
      [event.target.name]: event.target.value,
    });
  };
  function _getListRole() {
    dispatch(showAndHideSpinner(true));
    Sys0201Service.getInstance()
      .search_role(roleModelSearch)
      .then((res) => {
        setListRole(res.data.responseData.value);
        // totalPageRole.current = Math.ceil(
        //   res.data.responseData.totalElement / roleModelSearch.limit
        // );
        totalPageRole.current = res.data.responseData.totalElement;
        dispatch(showAndHideSpinner(false));

      })
      .catch((error) => {
        toast.error(`${t('sys0301.message.error.system')}`);
        dispatch(showAndHideSpinner(false));
      });
  }

  function _getListMenu() {
    dispatch(showAndHideSpinner(true));
    Sys0201Service.getInstance()
      .search_menu(menuModelSearch)
      .then((res) => {
        setListMenu(res.data.responseData.value);
        // totalPageMenu.current = Math.ceil(
        //   res.data.responseData.totalElement / menuModelSearch.limit
        // );
        totalPageMenu.current = res.data.responseData.totalElement;
        dispatch(showAndHideSpinner(false));
      })
      .catch((error) => {
        toast.error(`${t('sys0301.message.error.system')}`);
        dispatch(showAndHideSpinner(false));
      });
  }

  const changePageRole = (page: number) => {
    setRoleModelSearch({
      ...roleModelSearch,
      page: page,
    });
  };

  const changePageMenu = (page: number) => {
    setMenuModelSearch({
      ...menuModelSearch,
      page: page,
    });
  };

  const changeSelectItem = (itemId: any) => {
    dispatch(showAndHideSpinner(true));
    setSelectedItem(itemId);
    Sys0201Service.getInstance()
      .search_menu_role({ menuId: itemId })
      .then((response) => {
        setListMenuRole(response.data.responseData);
        setOriginLstMenuRole(response.data.responseData);
        dispatch(showAndHideSpinner(false));
      })
      .catch((error) => {
        toast.error(`${t('sys0301.message.error.system')}`);
        dispatch(showAndHideSpinner(false));
      });
  };

  useEffect(() => {
    if (selectedItem !== "") {
      _getListRole();
    }
  }, [selectedItem]);

  const setChecked = (checked: any, element: any, type: number) => {
    let _listMenuRole = [...listMenuRole];
    if (checked) {
      switch (type) {
        case 1: {
          element.readYn = "Y";
          break;
        }
        case 2: {
          element.wrtYn = "Y";
          break;
        }
        case 3: {
          element.modYn = "Y";
          break;
        }
        case 4: {
          element.delYn = "Y";
          break;
        }
        case 5: {
          element.pntYn = "Y";
          break;
        }
        case 6: {
          element.excDnYn = "Y";
          break;
        }
        case 7: {
          element.mngYn = "Y";
          break;
        }
      }
    } else {
      var p = _listMenuRole.find(
        (ele) => ele.roleId === element.roleId && ele.menuId === selectedItem
      );
      switch (type) {
        case 1: {
          element.readYn = "N";
          if (p !== undefined) {
            element.wrtYn = p.wrtYn;
            element.modYn = p.modYn;
            element.delYn = p.delYn;
            element.pntYn = p.pntYn;
            element.excDnYn = p.excDnYn;
            element.mngYn = p.mngYn;
          } else {
            element.wrtYn = "N";
            element.modYn = "N";
            element.delYn = "N";
            element.pntYn = "N";
            element.excDnYn = "N";
            element.mngYn = "N";
          }
          break;
        }
        case 2: {
          element.wrtYn = "N";
          if (p !== undefined) {
            element.readYn = p.readYn;
            element.modYn = p.modYn;
            element.delYn = p.delYn;
            element.pntYn = p.pntYn;
            element.excDnYn = p.excDnYn;
            element.mngYn = p.mngYn;
          } else {
            element.readYn = "N";
            element.modYn = "N";
            element.delYn = "N";
            element.pntYn = "N";
            element.excDnYn = "N";
            element.mngYn = "N";
          }
          break;
        }
        case 3: {
          element.modYn = "N";
          if (p !== undefined) {
            element.wrtYn = p.wrtYn;
            element.readYn = p.readYn;
            element.delYn = p.delYn;
            element.pntYn = p.pntYn;
            element.excDnYn = p.excDnYn;
            element.mngYn = p.mngYn;
          } else {
            element.wrtYn = "N";
            element.readYn = "N";
            element.delYn = "N";
            element.pntYn = "N";
            element.excDnYn = "N";
            element.mngYn = "N";
          }
          break;
        }
        case 4: {
          element.delYn = "N";
          if (p !== undefined) {
            element.wrtYn = p.wrtYn;
            element.modYn = p.modYn;
            element.readYn = p.readYn;
            element.pntYn = p.pntYn;
            element.excDnYn = p.excDnYn;
            element.mngYn = p.mngYn;
          } else {
            element.wrtYn = "N";
            element.modYn = "N";
            element.readYn = "N";
            element.pntYn = "N";
            element.excDnYn = "N";
            element.mngYn = "N";
          }
          break;
        }
        case 5: {
          element.pntYn = "N";
          if (p !== undefined) {
            element.wrtYn = p.wrtYn;
            element.modYn = p.modYn;
            element.delYn = p.delYn;
            element.readYn = p.readYn;
            element.excDnYn = p.excDnYn;
            element.mngYn = p.mngYn;
          } else {
            element.wrtYn = "N";
            element.modYn = "N";
            element.delYn = "N";
            element.readYn = "N";
            element.excDnYn = "N";
            element.mngYn = "N";
          }
          break;
        }
        case 6: {
          element.excDnYn = "N";
          if (p !== undefined) {
            element.wrtYn = p.wrtYn;
            element.modYn = p.modYn;
            element.delYn = p.delYn;
            element.pntYn = p.pntYn;
            element.readYn = p.readYn;
            element.mngYn = p.mngYn;
          } else {
            element.wrtYn = "N";
            element.modYn = "N";
            element.delYn = "N";
            element.pntYn = "N";
            element.readYn = "N";
            element.mngYn = "N";
          }
          break;
        }
        case 7: {
          element.mngYn = "N";
          if (p !== undefined) {
            element.wrtYn = p.wrtYn;
            element.modYn = p.modYn;
            element.delYn = p.delYn;
            element.pntYn = p.pntYn;
            element.excDnYn = p.excDnYn;
            element.readYn = p.readYn;
          } else {
            element.wrtYn = "N";
            element.modYn = "N";
            element.delYn = "N";
            element.pntYn = "N";
            element.excDnYn = "N";
            element.readYn = "N";
          }
          break;
        }
      }

      _listMenuRole = _listMenuRole.filter(
        (ele) => ele.roleId !== element.roleId
      );
    }
    const item = {
      roleId: element.roleId,
      menuId: selectedItem,
      readYn: element.readYn,
      wrtYn: element.wrtYn,
      modYn: element.modYn,
      delYn: element.delYn,
      pntYn: element.pntYn,
      excDnYn: element.excDnYn,
      mngYn: element.mngYn,
    };
    _listMenuRole.unshift(item);
    setListMenuRole(_listMenuRole);
  };

  const save = () => {
    let _listMenuRole = listMenuRole.reverse();
    originLstMenuRole.forEach((item: any) => {
      if (
        !_listMenuRole.some((element: any) => element.menuId === item.menuId)
      ) {
        item["checked"] = false;
        _listMenuRole.push(item);
      } else {
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
          .save_menu_role(_listMenuRole)
          .then((res) => {
            if (res.data.success) {
              toast.success(`${t('sys0201.message.success.save')}`);
              // get new list role menu
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
                          {t("sys0101.label.menuName")}
                        </label>
                        <input
                          value={menuModelSearch.menuNm}
                          className={`form-control`}
                          name="menuNm"
                          placeholder={`${t('sys0101.label.menuName')}`}
                          onChange={handleChangeInput}
                          onKeyUp={(e: any) => {
                            if (e.key === "Enter") search();
                          }}
                        />
                      </div>
                      <div className="search-el col-xl-3 col-12 col-sm-12">
                        <label className="form-label">
                          {t("sys0201.label.roleNm")}
                        </label>
                        <input
                          value={roleModelSearch.roleNm}
                          className={`form-control`}
                          name="roleNm"
                          placeholder={`${t('sys0201.label.roleNm')}`}
                          onChange={handleChangeInput}
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
                {t("sys0201.title.table.menuRoleMng")}
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
                      <th scope="col">{t("sys0201.table.header.no")}</th>
                      <th scope="col">{t("sys0101.table.header.menuId")}</th>
                      <th scope="col">{t("sys0101.table.header.menuNm")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listMenu.map((element: any, index: number) => (
                      <tr
                        key={element.menuId}
                        className={
                          selectedItem === element.menuId
                            ? "cus-cursor selected-row"
                            : "cus-cursor"
                        }
                        onClick={() => changeSelectItem(element.menuId)}
                      >
                        <td>{(totalPageMenu.current - (menuModelSearch.page - 1) * limit) - index}</td>
                        <td>{element.menuId}</td>
                        <td>{element.menuNm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-end">
                {listMenu.length > 0 && (
                  <AppPagination
                    page={menuModelSearch.page}
                    onChange={changePageMenu}
                    count={totalPageMenu.current}
                    rows={limit}
                  />
                )}
              </div>
            </div>
            <div className="col-md-7">
              <div className="table-responsive">
                <table className="table table-hover mb-3">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" rowSpan={2}>
                        {t("sys0201.table.header.no")}
                      </th>
                      <th scope="col" rowSpan={2}>
                        {t("sys0201.table.header.roleId")}
                      </th>
                      <th scope="col" rowSpan={2}>
                        {t("sys0201.table.header.roleNm")}
                      </th>
                      <th scope="col" colSpan={7} className="text-center">
                        {t("sys0201.table.header.permission")}
                      </th>
                    </tr>
                    <tr>
                      <th className="text-center">
                        {t("sys0201.table.header.read")}
                      </th>
                      <th className="text-center">
                        {t("sys0201.table.header.create")}
                      </th>
                      <th className="text-center">
                        {t("sys0201.table.header.update")}
                      </th>
                      <th className="text-center">
                        {t("sys0201.table.header.delete")}
                      </th>
                      <th className="text-center">
                        {t("sys0201.table.header.print")}
                      </th>
                      <th className="text-center">
                        {t("sys0201.table.header.excel")}
                      </th>
                      <th className="text-center">
                        {t("sys0201.table.header.manager")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listRole.map((element: any, index: number) => (
                      <tr key={element.roleId} className="cus-cursor">
                        <td>{(totalPageRole.current - (roleModelSearch.page - 1) * limit) - index}</td>
                        <td>{element.roleId}</td>
                        <td>{element.roleNm}</td>
                        <td className="text-center">
                          {selectedItem === "" ? (
                            ""
                          ) : (
                            <Checkbox
                              onChange={(e) =>
                                setChecked(e.checked, element, 1)
                              }
                              value={element.readYn}
                              checked={listMenuRole.some(
                                (item: any) =>
                                  item.roleId === element.roleId &&
                                  item.menuId === selectedItem &&
                                  item.readYn === "Y"
                              )}
                            ></Checkbox>
                          )}
                        </td>
                        <td className="text-center">
                          {selectedItem === "" ? (
                            ""
                          ) : (
                            <Checkbox
                              onChange={(e) =>
                                setChecked(e.checked, element, 2)
                              }
                              value={element.wrtYn}
                              checked={listMenuRole.some(
                                (item: any) =>
                                  item.roleId === element.roleId &&
                                  item.menuId === selectedItem &&
                                  item.wrtYn === "Y"
                              )}
                            ></Checkbox>
                          )}
                        </td>
                        <td className="text-center">
                          {selectedItem === "" ? (
                            ""
                          ) : (
                            <Checkbox
                              onChange={(e) =>
                                setChecked(e.checked, element, 3)
                              }
                              value={element.modYn}
                              checked={listMenuRole.some(
                                (item: any) =>
                                  item.roleId === element.roleId &&
                                  item.menuId === selectedItem &&
                                  item.modYn === "Y"
                              )}
                            ></Checkbox>
                          )}
                        </td>
                        <td className="text-center">
                          {selectedItem === "" ? (
                            ""
                          ) : (
                            <Checkbox
                              onChange={(e) =>
                                setChecked(e.checked, element, 4)
                              }
                              value={element.delYn}
                              checked={listMenuRole.some(
                                (item: any) =>
                                  item.roleId === element.roleId &&
                                  item.menuId === selectedItem &&
                                  item.delYn === "Y"
                              )}
                            ></Checkbox>
                          )}
                        </td>
                        <td className="text-center">
                          {selectedItem === "" ? (
                            ""
                          ) : (
                            <Checkbox
                              onChange={(e) =>
                                setChecked(e.checked, element, 5)
                              }
                              value={element.pntYn}
                              checked={listMenuRole.some(
                                (item: any) =>
                                  item.roleId === element.roleId &&
                                  item.menuId === selectedItem &&
                                  item.pntYn === "Y"
                              )}
                            ></Checkbox>
                          )}
                        </td>
                        <td className="text-center">
                          {selectedItem === "" ? (
                            ""
                          ) : (
                            <Checkbox
                              onChange={(e) =>
                                setChecked(e.checked, element, 6)
                              }
                              value={element.excDnYn}
                              checked={listMenuRole.some(
                                (item: any) =>
                                  item.roleId === element.roleId &&
                                  item.menuId === selectedItem &&
                                  item.excDnYn === "Y"
                              )}
                            ></Checkbox>
                          )}
                        </td>
                        <td className="text-center">
                          {selectedItem === "" ? (
                            ""
                          ) : (
                            <Checkbox
                              onChange={(e) =>
                                setChecked(e.checked, element, 7)
                              }
                              value={element.mngYn}
                              checked={listMenuRole.some(
                                (item: any) =>
                                  item.roleId === element.roleId &&
                                  item.menuId === selectedItem &&
                                  item.mngYn === "Y"
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
                {listRole.length > 0 && (
                  <AppPagination
                    page={roleModelSearch.page}
                    onChange={changePageRole}
                    count={totalPageRole.current}
                    rows={limit}
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
