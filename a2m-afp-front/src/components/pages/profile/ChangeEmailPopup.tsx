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
import { ValidationUtil } from "../../../utils/validationUtil";

export default function ChangeEmailPopup(props: any) {
  const userInfo = props.data.userInfo;
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [oldPwd, setOldPwd] = useState("");
  const [isVerifyPassword, setIsVerifyPassword] = useState(false);
  const handleChangeOldPwd = (event: any) => {
    setOldPwd(event.target.value);
  };

  const [newEmail, setNewEmail] = useState("");
  const [isInputEmail, setIsInputEmail] = useState(false);
  const handleChangeNewEmail = (event: any) => {
    setNewEmail(event.target.value);
  };

  const [otpEmail, setOtpEmail] = useState("");
  const [isVerifyOtpEmail, setIsVerifyOtpEmail] = useState(false);
  const handleChangeOtpEmail = (event: any) => {
    setOtpEmail(event.target.value);
  };

  const handleVerifyPassword = () => {
    const params = {
      oldPassword: oldPwd,
    };

    UserInfoService.getInstance()
      .verifyPassword(params)
      .then((resp) => {
        if (resp.status == HttpStatusCode.Ok) {
          if (resp.data.status) {
            let data = resp.data.responseData;

            setIsVerifyPassword(data);
            setIsInputEmail(data);
            if (!data) {
              toast.error("wrong password");
            }
          } else {
            toast.error(resp.data.message);
          }
        } else {
          toast.error(resp.statusText);
        }
        dispatch(showAndHideSpinner(false));
      })
      .catch((error) => {
        toast.error("Server error !!!");
        dispatch(showAndHideSpinner(false));
      });
  };

  const handleSendOtpEmail = () => {
    const params = {
      newEmail: newEmail,
    };

    UserInfoService.getInstance()
      .sendOTPEmail(params)
      .then((resp) => {
        if (resp.status == HttpStatusCode.Ok) {
          if (resp.data.status) {
            let data = resp.data.responseData;
            if (data.status === "OK") {
              setIsInputEmail(false);
              setIsVerifyOtpEmail(true);
            }else{
                toast.error("Email not exist");
            }
          } else {
            toast.error(resp.data.message);
          }
        } else {
          toast.error(resp.statusText);
        }
        dispatch(showAndHideSpinner(false));
      })
      .catch((error) => {
        toast.error("Server error !!!");
        dispatch(showAndHideSpinner(false));
      });
  };

  const handleVerifyOtpEmail = () => {
    const params = {
      otpCode: otpEmail,
      newEmail: newEmail
    };

    UserInfoService.getInstance()
      .verifyOTPEmail(params)
      .then((resp) => {
        if (resp.status == HttpStatusCode.Ok) {
          if (resp.data.status) {
            let data = resp.data.responseData;
            if (data.status === "OK") {
                toast.success(`${t("sys0301.message.success.update")}`);
                updateEmailSuccess();
            }else{
                toast.error("OTP invalid");
              }
          } else {
            toast.error(resp.data.message);
          }
        } else {
          toast.error(resp.statusText);
        }
        dispatch(showAndHideSpinner(false));
      })
      .catch((error) => {
        toast.error("Server error !!!");
        dispatch(showAndHideSpinner(false));
      });
  };

  const updateEmailSuccess = () => {
    let newUserInfo = Object.assign({}, userInfo);
    newUserInfo.email = newEmail;
    dispatch(updateUserInfo(newUserInfo));
    props.onClose(true);
  };

//   const handleUpdateEmail = () => {
//     const params = {
//       newEmail: newEmail,
//     };

//     UserInfoService.getInstance()
//       .updateEmail(params)
//       .then((resp) => {
//         if (resp.status == HttpStatusCode.Ok) {
//           if (resp.data.status) {
//             let data = resp.data.responseData;
//             if (data.status === "OK") {
//               toast.success(`${t("sys0301.message.success.update")}`);
//               updateEmailSuccess();
//             } else {
//               toast.error(`${t("sys0301.message.error.update")}`);
//             }
//           } else {
//             toast.error(resp.data.message);
//           }
//         } else {
//           toast.error(resp.statusText);
//         }
//         dispatch(showAndHideSpinner(false));
//       })
//       .catch((error) => {
//         toast.error("Server error !!!");
//         dispatch(showAndHideSpinner(false));
//       });
//   };

//   console.log(oldPwd);

  return (
    <>
      {!isVerifyPassword ? (
        <>
          <div className="col-lg-12 mb-3">
            <label htmlFor="validationNewPassword" className="form-label">
              {t("sys0301.table.header.password")}
              <strong className="strong-required">*</strong>
            </label>
            <input
              type={"password"}
              value={oldPwd || ""}
              className="form-control"
              name="oldPwd"
              id="validationNewPassword"
              onChange={handleChangeOldPwd}
            />

            <div
              className={`${
                oldPwd?.trim() === "" ? "error-required" : "display-none"
              }`}
            >
              {t("sys0301w.required.message.oldPassword")}
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={handleVerifyPassword}
              className="btn btn-primary btn-label rounded-pill waves-effect waves-light"
            >
              <i className="ri-save-line label-icon align-middle rounded-pill fs-16 me-2"></i>
              {t("confirm.label.title")}
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
        </>
      ) : (
        <></>
      )}

      {isInputEmail ? (
        <>
          <div className="col-lg-12 mb-3">
            <label htmlFor="validationInputEmail" className="form-label">
              {t("sys0301.table.header.email")}{" "}
              <strong className="strong-required">*</strong>
            </label>
            <input
              value={newEmail || ""}
              className="form-control"
              name="email"
              id="validationInputEmail"
              onChange={handleChangeNewEmail}
            />
            <div
              className={`${
                newEmail?.trim() === "" ? "error-required" : "display-none"
              }`}
            >
              {t("sys0301w.required.message.email")}
            </div>
            <div
              className={`${
                newEmail?.trim() != null &&
                newEmail.trim() !== "" &&
                !ValidationUtil.isEmail(newEmail?.trim())
                  ? "error-required"
                  : "display-none"
              }`}
            >
              Email invalid
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={handleSendOtpEmail}
              className="btn btn-primary btn-label rounded-pill waves-effect waves-light"
            >
              <i className="ri-save-line label-icon align-middle rounded-pill fs-16 me-2"></i>
              {t("confirm.label.title")}
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
        </>
      ) : (
        <></>
      )}

      {isVerifyOtpEmail ? (
        <>
          <div className="col-lg-12 mb-3">
            <label htmlFor="validationInputEmail" className="form-label">
              {`Enter the code that was sent to the email `+newEmail+` (maybe in the trash)`}{" "}
              <strong className="strong-required">*</strong>
            </label>
            <input
              value={otpEmail || ""}
              className="form-control"
              name="email"
              id="validationInputEmail"
              onChange={handleChangeOtpEmail}
            />
            <div
              className={`${
                otpEmail?.trim() === "" ? "error-required" : "display-none"
              }`}
            >
              {t("sys0301w.required.message.email")}
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={handleVerifyOtpEmail}
              className="btn btn-primary btn-label rounded-pill waves-effect waves-light"
            >
              <i className="ri-save-line label-icon align-middle rounded-pill fs-16 me-2"></i>
              {t("confirm.label.title")}
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
        </>
      ) : (
        <></>
      )}
    </>
  );
}
