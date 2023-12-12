import { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { showAndHideSpinner } from "../../../reducers/spinnerSlice";
import { UserInfoService } from "../../../services/profile/UserInfoService";

import { useAppDispatch } from "../../../store/hook";

export default function TwoFaVerifyPopup(props: any) {
    const { t } = useTranslation();
  const userInfo = props.data.userInfo;
  const dispatch = useAppDispatch();

  const [otp, setOtp] = useState<string>("");

  const handleChangeOtp = (event: any) => {
    setOtp(event.target.value);
  };

  const handleVerify = () => {
    const params = {
      otpCode: otp
    };
    UserInfoService.getInstance()
      .verifyOTP(params)
      .then((resp) => {
        if (resp.status == HttpStatusCode.Ok) {
          if (resp.data.status) {
            toast.success("Successfully");
            props.onClose({
                isVerify: true
            });
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
        <div className="p-2 mt-4">
          <div className="text-muted text-center mb-4 mx-lg-3">
            <h4 className="">Verify Your OTP</h4>
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
