import { HttpStatusCode } from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { VariablesConstant } from "../../../../../constants/variables";
import { Sys0301Service } from "../../../../../services/sys/Sys0301Service";

import { ValidationUtil } from "../../../../../utils/validationUtil";
import AppDatePicker from "../../../../commons/AppDatePicker";
import AppRadioButton from "../../../../commons/AppRadioButton";
import { useAppDispatch } from "../../../../../store/hook";
import { showAndHideSpinner } from "../../../../../reducers/spinnerSlice";

type Sys0301Model = {
  userUid: string;
  userId: string | null;
  password: string | null;
  status: string;
  address: string | null | "";
  cellPhone: string | null;
  email: string | null;
  fullName: string | null | "";
  dob: Date | null | "";
  gender: boolean;
  organization: string | null | "";
  userInfoId: string;
  newPwdUpdate: string;
  changePwd: boolean;
  matchPassword: string | null;
};

export default function Sys0301Form(props: any) {
  const { t } = useTranslation();

  const gender: any[] = VariablesConstant.GEN;
  const status: any[] = VariablesConstant.STATUS;

  const dispatch = useAppDispatch();

  const [model, setModel] = useState<Sys0301Model>(props.data);

  var isPopupCreate: boolean;

  if (model.userUid) {
    isPopupCreate = false;
  } else {
    isPopupCreate = true;
  }

  const changeGender = (data?: any) => {
    setModel({
      ...model,
      gender: data.value === "1" ? true : false,
    });
  };

  const handleChange = (event: any) => {
    setModel({
      ...model,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeDate = (event: Date) => {
    setModel({
      ...model,
      dob: event,
    });
  };

  const handlePass = () => {
    setModel({
      ...model,
      changePwd: true,
    });
  };

  const changeStatus = (data?: any) => {
    setModel({
      ...model,
      status: data.value,
    });
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (chk(model)) {
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
          _save();
        }
      });
    }
  };

  function _save() {
    dispatch(showAndHideSpinner(true));
    if (model.userInfoId) {
      Sys0301Service.getInstance()
        .update(model)
        .then((resp) => {
          if (resp.status === HttpStatusCode.Ok) {
            if (resp.data.status) {
              toast.success(`${t('sys0301.message.success.update')}`);
              props.onClose(true);
            } else {
              toast.error(`${t('sys0301.message.error.update')}`);
            }
          } else {
            toast.error(`${t('sys0301.message.error.update')}`);
          }
          dispatch(showAndHideSpinner(false));
        })
        .catch((error) => {
          toast.error(`${t('sys0301.message.error.system')}`);
          dispatch(showAndHideSpinner(false));

        });
    } else {

      let check = model;
      const { userId, email } = check;
      Sys0301Service.getInstance()
        .exists(check)
        .then((resp) => {
          // console.log(resp)
          if (resp.status === HttpStatusCode.Ok) {

            if (resp.data.responseData.existsByUserId === false) {

              if (resp.data.responseData.existsByEmail === false) {
                Sys0301Service.getInstance()
                  .save(model)
                  .then((resp) => {
                    if (resp.status === HttpStatusCode.Ok) {
                      if (resp.data.status) {
                        toast.success(`${t('sys0301.message.success.save')}`);
                        props.onClose(true);
                      } else {
                        toast.error(`${t('sys0301.message.error.save')}`);
                      }
                    } else {
                      toast.error(`${t('sys0301.message.error.save')}`);
                    }
                  })
                  .catch((error) => {
                    toast.error(`${t('sys0301.message.error.save')}`);
                  });
              } else {
                toast.error(`${t('sys0301.message.error.exitsEmail')}`);
              }
            } else {
              toast.error(`${t('sys0301.message.error.exitsUserId')}`);
            }
          } else {
            toast.error(`${t('sys0301.message.error.system')}`);
          }
          dispatch(showAndHideSpinner(false));
        })
        .catch((error) => {
          toast.error(`${t('sys0301.message.error.system')}`);
          dispatch(showAndHideSpinner(false));
        });
    }
  }

  function chk(params: Sys0301Model) {
    let _chk = true;
    if (params.userId == null || params.userId.trim() === "") {
      toast.error(`${t("sys0301w.required.message.userId")}`);
      _chk = false;
    } else if (
      (params.password == null || params.password.trim() === "") &&
      isPopupCreate
    ) {
      toast.error(`${t("sys0301w.required.message.password")}`);
      _chk = false;
    } else if (params.password !== params.matchPassword && isPopupCreate) {
      toast.error(`${t("sys0301w.required.message.matchPassword")}`);
      _chk = false;
    } else if (
      (params.newPwdUpdate == null || params.newPwdUpdate.trim() === "") &&
      model.changePwd
    ) {
      toast.error(`${t("sys0301w.required.message.password")}`);
      _chk = false;
    } else if (
      params.newPwdUpdate !== params.matchPassword &&
      model.changePwd
    ) {
      toast.error(`${t("sys0301w.required.message.matchPassword")}`);
      _chk = false;
    } else if (params.email == null || params.email.trim() === "") {
      toast.error(`${t("sys0301w.required.message.email")}`);
      _chk = false;
    } else if (params.cellPhone == null || params.cellPhone.trim() === "") {
      toast.error(`${t("sys0301w.required.message.cellPhone")}`);
      _chk = false;
    }

    if (!_chk) {
      setModel((prveState: Sys0301Model) => {
        return {
          ...prveState,
          userId: prveState.userId || "",
          password: prveState.password || "",
          status: prveState.status || "",
          address: prveState.address === "" ? null : prveState.address,
          cellPhone: prveState.cellPhone || "",
          email: prveState.email || "",
          fullName: prveState.fullName === "" ? null : prveState.fullName,
          dob: prveState.dob === "" ? null : prveState.dob,
          gender: prveState.gender,
          organization:
            prveState.organization === "" ? null : prveState.organization,
          matchPassword: prveState.matchPassword || "",
          newPwdUpdate: prveState.newPwdUpdate || "",
        };
      });
    }
    return _chk;
  }

  return (
    <>
      <ToastContainer></ToastContainer>
      <form onSubmit={handleSave}>
        <div className="col-lg-12 mb-3">
          <label htmlFor="validationUserId" className="form-label">
            {t("sys0301.table.header.userName")}
            <strong className="strong-required"> *</strong>
          </label>
          <input
            value={model.userId || ''}
            className="form-control"
            name="userId"
            id="validationUserId"
            onChange={handleChange}
            readOnly={!!model.userUid}
          />
          <div
            className={`${model.userId?.trim() === "" ? "error-required" : "display-none"
              }`}
          >
            {t("sys0301w.required.message.userId")}
          </div>
        </div>

        <div className="col-lg-12 mb-3">
          {!model.userUid ? (
            <>
              <div className="mb-3">
                <label htmlFor="validationPassword" className="form-label">
                  {t("sys0301.table.header.password")}
                  <strong className="strong-required"> *</strong>
                </label>
                <input
                  type={"password"}
                  value={model.password || ""}
                  className="form-control"
                  name="password"
                  id="validationPassword"
                  onChange={handleChange}
                />

                <div
                  className={`${model.password?.trim() === ""
                    ? "error-required"
                    : "display-none"
                    }`}
                >
                  {t("sys0301w.required.message.password")}
                </div>
              </div>
              <div>
                <label htmlFor="validationMatchPassword" className="form-label">
                  {t("sys0301.table.header.matchPassword")}
                  <strong className="strong-required"> *</strong>
                </label>
                <input
                  type={"password"}
                  value={model.matchPassword || ''}
                  className="form-control"
                  name="matchPassword"
                  id="validationMatchPassword"
                  onChange={handleChange}
                />

                <div
                  className={`${model.matchPassword?.trim() !== model.password?.trim()
                    ? "error-required"
                    : "display-none"
                    }`}
                >
                  {t("sys0301w.required.message.matchPassword")}
                </div>
              </div>
            </>
          ) : (
            <>
              {!model.changePwd ? (
                <button
                  // style={{
                  //   borderRadius: "10px",
                  //   border: "none",
                  //   background: "#407F3E",
                  //   color: "#FFF",
                  //   padding: "10px"
                  // }}
                  className="p-button p-component"
                  type={"button"}
                  onClick={() => handlePass()}
                >
                  {t("sys0301.table.header.changePassword")}
                </button>
              ) : (
                <></>
              )}

              {model.changePwd ? (
                <>
                  <div className="mb-3">
                    <label
                      htmlFor="validationNewPassword"
                      className="form-label"
                    >
                      {t("sys0301.table.header.password")}
                      <strong className="strong-required"> *</strong>
                    </label>
                    <input
                      type={"password"}
                      value={model.newPwdUpdate}
                      className="form-control"
                      name="newPwdUpdate"
                      id="validationNewPassword"
                      onChange={handleChange}
                    />

                    <div
                      className={`${model.newPwdUpdate?.trim() === ""
                        ? "error-required"
                        : "display-none"
                        }`}
                    >
                      {t("sys0301w.required.message.password")}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="validationMatchNewPassword"
                      className="form-label"
                    >
                      {t("sys0301.table.header.matchPassword")}
                      <strong className="strong-required"> *</strong>
                    </label>
                    <input
                      type={"password"}
                      value={model.matchPassword || ""}
                      className="form-control"
                      name="matchPassword"
                      id="validationMatchNewPassword"
                      onChange={handleChange}
                    />

                    <div
                      className={`${model.matchPassword?.trim() !==
                        model.newPwdUpdate?.trim()
                        ? "error-required"
                        : "display-none"
                        }`}
                    >
                      {t("sys0301w.required.message.matchPassword")}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </div>

        <div className="col-lg-12 mb-3">
          <label htmlFor="validationInputEmail" className="form-label">
            {t("sys0301.table.header.email")}{" "}
            <strong className="strong-required"> *</strong>
          </label>
          <input
            value={model.email || ""}
            className="form-control"
            name="email"
            id="validationInputEmail"
            onChange={handleChange}
          />
          <div
            className={`${model.email?.trim() === "" ? "error-required" : "display-none"
              }`}
          >
            {t("sys0301w.required.message.email")}
          </div>
          <div
            className={`${model.email?.trim() != null &&
              model.email.trim() !== "" &&
              !ValidationUtil.isEmail(model.email?.trim())
              ? "error-required"
              : "display-none"
              }`}
          >
            Email invalidate
          </div>
        </div>

        <div className="col-lg-12 mb-3">
          <label htmlFor="validationFullName" className="form-label">
            {t("sys0301.table.header.fullName")}
          </label>
          <input
            value={model.fullName || ""}
            className="form-control"
            name="fullName"
            id="validationFullName"
            onChange={handleChange}
          ></input>
        </div>

        <div className="col-lg-12 mb-3">
          <label htmlFor="validationAddress" className="form-label">
            {t("sys0301.table.header.address")}
          </label>
          <input
            value={model.address || ""}
            className="form-control"
            name="address"
            id="validationAddress"
            onChange={handleChange}
          ></input>
        </div>

        <div className="col-lg-12 mb-3">
          <label htmlFor="validationOrganization" className="form-label">
            {t("sys0301.table.header.organization")}
          </label>
          <input
            value={model.organization || ""}
            className="form-control"
            name="organization"
            id="validationOrganization"
            onChange={handleChange}
          ></input>
        </div>

        <div className="col-lg-12 mb-3">
          <label htmlFor="validationPhone" className="form-label">
            {t("sys0301.table.header.cellPhone")}{" "}
            <strong className="strong-required"> *</strong>
          </label>
          <input
            value={model.cellPhone || ""}
            className="form-control"
            name="cellPhone"
            id="validationPhone"
            onChange={handleChange}
          />
          <div
            className={`${model.cellPhone?.trim() === "" ? "error-required" : "display-none"
              }`}
          >
            Please enter a phone in the input
          </div>
          <div
            className={`${model.cellPhone?.trim() != null &&
              model.cellPhone.trim() !== "" &&
              !ValidationUtil.isPhone(model.cellPhone?.trim())
              ? "error-required"
              : "display-none"
              }`}
          >
            Phone invalidate
          </div>
        </div>

        <div className="col-lg-12 mb-3">
          <label className="form-check-label-radio">
            {t("sys0301.table.header.dob")}{" "}
            <strong className="strong-required"></strong>
          </label>
          <AppDatePicker onChange={handleChangeDate} value={model.dob || ''} />
        </div>

        <div className="d-flex col-lg-12 mb-3">
          <div className="col-lg-6">
            <label className="form-check-label-radio">
              {t("sys0301.label.gender")}{" "}
              <strong className="strong-required"></strong>
            </label>
            <AppRadioButton
              dataSource={gender}
              nameGroup="gender"
              onChange={changeGender}
              value={{ value: model.gender === true ? "1" : "0" }}
            />
          </div>
          {!isPopupCreate ? (
            <div className="col-lg-6">
              <label className="form-check-label-radio">
                {t("sys0301.table.header.status")}{" "}
                <strong className="strong-required"></strong>
              </label>
              <AppRadioButton
                dataSource={status}
                nameGroup="status"
                onChange={changeStatus}
                value={{ value: model.status }}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary btn-label rounded-pill waves-effect waves-light"
          >
            <i className="ri-save-line label-icon align-middle rounded-pill fs-16 me-2"></i>
            {t("confirm.button.save.text")}
          </button>
          <button
            type="button"
            onClick={() => props.onClose(false)}
            className="btn btn-light btn-label rounded-pill waves-effect waves-light ms-2"
          >
            <i className="ri-close-circle-line label-icon align-middle rounded-pill fs-16 me-2"></i>
            {t("confirm.button.cancel.text")}
          </button>
        </div>
      </form>
    </>
  );
}
