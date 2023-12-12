import { HttpStatusCode } from "axios";
import QRCode from "qrcode.react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { showAndHideSpinner } from "../../../reducers/spinnerSlice";
import { updateUserInfo } from "../../../reducers/userSlice";
import { UserInfoService } from "../../../services/profile/UserInfoService";

import { useAppDispatch, useAppSelector } from "../../../store/hook";

export default function EnableTwoFaAuthPopup(props: any) {
    const { t } = useTranslation();
  const userInfo = props.data.userInfo;
  const dispatch = useAppDispatch();
  const [secretKey, setSecretKey] = useState<string>("");
  const [otpauth, setOtpauth] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const handleChangeOtp = (event: any) => {
    setOtp(event.target.value);
  };

  useEffect(() => {
    if (!userInfo.twoFAEnable) {
      UserInfoService.getInstance()
        .generateSecretKey({})
        .then((resp) => {
          if (resp.status == HttpStatusCode.Ok) {
            if (resp.data.status) {
              const data = resp.data.responseData;
              setSecretKey(data.result);
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
    } else {
      setSecretKey(userInfo.twoFAKey);
    }
  }, []);

  const genOtpAuth = () => {
    const value =
      "otpauth://totp/" +
      userInfo.userId +
      "?secret=" +
      secretKey +
      "&issuer=" +
      userInfo.fullName;
    setOtpauth(value);
  };

  useEffect(() => {
    genOtpAuth();
  }, [secretKey]);

  const handleVerify = () => {
    const params = {
      otpCode: otp,
      twoFAEnable: !userInfo.twoFAEnable,
    };
    UserInfoService.getInstance()
      .verifyOTP(params)
      .then((resp) => {
        if (resp.status == HttpStatusCode.Ok) {
          if (resp.data.status) {
            const data = resp.data.responseData;
            toast.success("Successfully");

            let newUserInfo = Object.assign({}, userInfo);
            newUserInfo.twoFAEnable = params.twoFAEnable;
            dispatch(updateUserInfo(newUserInfo));
            props.onClose(true);
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

  return (
    <>
      <div className="card-body p-4">
        {props?.data.isEnable ? (
          <div className="mb-4">
            <div className="text-center">
              <QRCode value={otpauth} renderAs="canvas" />
              <p>{secretKey}</p>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="p-2 mt-4">
          <div className="text-muted text-center mb-4 mx-lg-3">
            <h4 className="">{t("sys0301.table.header.verifyTwoFa")}</h4>
            <p>
              Please enter the 6 digit code in{" "}
              <span className="fw-semibold">authenticator app</span>
            </p>
          </div>

          <form>
            <div className="mb-4">
              <input
                name="token"
                type="tel"
                className="form-control"
                placeholder="Enter your OTP"
                pattern="[0-9]{6}"
                required
                onChange={handleChangeOtp}
              />
            </div>
          </form>

          <div className="mt-3">
            <button
              onClick={() => handleVerify()}
              type="button"
              className="btn btn-success w-100"
            >
              {t("confirm.label.title")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// https://codesandbox.io/s/2fa-otp-with-qrcode-forked-z60yhg?file=/components/App.js
// https://www.npmjs.com/package/qrcode.react?activeTab=readme
// https://www.npmjs.com/package/otplib?activeTab=readme
