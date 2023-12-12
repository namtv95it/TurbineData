import { HttpStatusCode } from "axios";
import QRCode from "qrcode.react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { showAndHideSpinner } from "../../../reducers/spinnerSlice";
import { updateUserInfo } from "../../../reducers/userSlice";
import { UserInfoService } from "../../../services/profile/UserInfoService";

import { useAppDispatch, useAppSelector } from "../../../store/hook";

type ChangePasswordModel = {
  userUid: string;

  oldPwd: string;
  newPwd: string;
  confirmNewPwd: string;

  hashPwd: string | null | "";
  updatedDate: string | null;
  updatedBy: string;

  pwdExpr: Date | null | "";
};

export default function ChangePassPopup(props: any) {
  const { t } = useTranslation();
  const [model, setModel] = useState<ChangePasswordModel>(props.data.userInfo);
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

  function chk(params: ChangePasswordModel) {
    let _chk = true;
    if (params.oldPwd == null || params.oldPwd.trim() === "") {
      toast.error(`${t("sys0301w.required.message.password")}`);
      _chk = false;
    } else if (params.newPwd == null || params.newPwd.trim() === "") {
      toast.error(`${t("sys0301w.required.message.password")}`);
      _chk = false;
    } else if (params.newPwd !== params.confirmNewPwd) {
      toast.error(`${t("sys0301w.required.message.matchPassword")}`);
      _chk = false;
    }

    if (!_chk) {
      setModel((prveState: ChangePasswordModel) => {
        return {
          ...prveState,
          oldPwd: prveState.oldPwd || "",
          newPwd: prveState.newPwd || "",
          confirmNewPwd: prveState.confirmNewPwd || "",
        };
      });
    }
    return _chk;
  }

  function _save() {
    UserInfoService.getInstance()
      .changePassword(model)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {


          if (resp.data.status) {
            toast.success("Updated Password successfully");
            props.onClose()
          } else {
            toast.error("Updated Password failed");
          }


        } else {
          toast.error("Updated Password failed");
        }
      })
      .catch((error) => {
        toast.error("Updated Password failed");
      });
  }

  const handleChange = (event: any) => {
    setModel({
      ...model,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <form onSubmit={handleSave}>
        <div className="col-lg-12 mb-3">
          <label htmlFor="validationNewPassword" className="form-label">
            {t("sys0301.table.header.oldPassword")}
            <strong className="strong-required">*</strong>
          </label>
          <input
            type={"password"}
            value={model.oldPwd || ""}
            className="form-control"
            name="oldPwd"
            id="validationNewPassword"
            onChange={handleChange}
          />

          <div
            className={`${
              model.oldPwd?.trim() === "" ? "error-required" : "display-none"
            }`}
          >
            {t("sys0301w.required.message.oldPassword")}
          </div>
        </div>

        <div className="col-lg-12 mb-3">
          <label htmlFor="validationNewPassword" className="form-label">
            {t("sys0301.table.header.password")}
            <strong className="strong-required">*</strong>
          </label>
          <input
            type={"password"}
            value={model.newPwd || ""}
            className="form-control"
            name="newPwd"
            id="validationNewPassword"
            onChange={handleChange}
          />

          <div
            className={`${
              model.newPwd?.trim() === "" ? "error-required" : "display-none"
            }`}
          >
            {t("sys0301w.required.message.password")}
          </div>
        </div>
        <div className="col-lg-12 mb-3">
          <label htmlFor="validationMatchNewPassword" className="form-label">
            {t("sys0301.table.header.matchPassword")}
            <strong className="strong-required">*</strong>
          </label>
          <input
            type={"password"}
            value={model.confirmNewPwd || ""}
            className="form-control"
            name="confirmNewPwd"
            id="validationMatchNewPassword"
            onChange={handleChange}
          />

          <div
            className={`${
              model.newPwd?.trim() !== model.confirmNewPwd?.trim()
                ? "error-required"
                : "display-none"
            }`}
          >
            {t("sys0301w.required.message.matchPassword")}
          </div>
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

// https://codesandbox.io/s/2fa-otp-with-qrcode-forked-z60yhg?file=/components/App.js
// https://www.npmjs.com/package/qrcode.react?activeTab=readme
// https://www.npmjs.com/package/otplib?activeTab=readme
