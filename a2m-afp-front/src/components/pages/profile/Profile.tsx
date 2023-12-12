import { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { VariablesConstant } from "../../../constants/variables";
import { showAndHideSpinner } from "../../../reducers/spinnerSlice";
import { updateUserInfo } from "../../../reducers/userSlice";
import { UserInfoService } from "../../../services/profile/UserInfoService";
import { Sys0301Service } from "../../../services/sys/Sys0301Service";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { ValidationUtil } from "../../../utils/validationUtil";
import AppDatePicker from "../../commons/AppDatePicker";
import AppDialog from "../../commons/AppDialog";
import AppRadioButton from "../../commons/AppRadioButton";
import Sys0101Form from "../sys/Sys0101/form/Sys0101Form";
import ChangeEmailPopup from "./ChangeEmailPopup";
import ChangePassPopup from "./ChangePassPopup";
import EnableTwoFaAuthPopup from "./EnableTwoFaAuthPopup";
import TwoFaVerifyPopup from "./TwoFaVerifyPopup";

type Sys0301Model = {
  userUid: string;
  userId: string;
  password: string;
  status: string;
  address: string | null | "";
  cellPhone: string | null;
  email: string;
  fullName: string | null | "";
  dob: Date | null | "";
  gender: boolean;
  organization: string | null | "";
  userInfoId: string;
  newPwdUpdate: string;
  changePwd: boolean;
  matchPassword: string;
};

export default function Profile() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const gender: any[] = VariablesConstant.GEN;
  const status: any[] = VariablesConstant.STATUS;

  const userInfo = useAppSelector((state) => state.userInfo.userInfo);

  const [model, setModel] = useState<Sys0301Model>(userInfo);

  const [avatar, setAvatar] = useState<File>();

  const baseUrl = process.env.REACT_APP_API_URL

  const onChangeAvatar = (event: any) => {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }
      let file = event.target.files[ event.target.files.length-1 ];

      setAvatar(file);
  };

  useEffect(() => {
    if(avatar == null) {
        return
    }
    dispatch(showAndHideSpinner(true));
    UserInfoService.getInstance()
        .changeAvatar(avatar)
        .then((resp) => {
          if (resp.status === HttpStatusCode.Ok) {
            if (resp.data.status) {
              setUserInfoSlice(resp.data.responseData.result)
              dispatch(showAndHideSpinner(false));
              toast.success("Updated User successfully");
            } else {
              toast.error("Updated User failed");
            }
          } else {
            toast.error("Updated User failed");
          }
        })
        .catch((error) => {
            dispatch(showAndHideSpinner(true));
          toast.error("Updated User failed");
        });
  }, [avatar]);

  const setUserInfoSlice = ( base64: string) => {
    let newUserInfo = Object.assign({}, userInfo);
    newUserInfo.imgPathBase64 = base64;
    dispatch(updateUserInfo(newUserInfo));
  };

  useEffect(() => {
    setModel(userInfo);
  }, [userInfo]);

  // useEffect(() => {
  //   setModel({
  //     ...userInfo,
  //     gender: userInfo.gender,
  //   });
  // }, [userInfo]);

  const changeGender = (data: any) => {
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
    if (model.userInfoId) {
      UserInfoService.getInstance()
        .update(model)
        .then((resp) => {
          if (resp.status === HttpStatusCode.Ok) {
            if (resp.data.status) {
              toast.success("Updated User successfully");
            } else {
              toast.error("Updated User failed");
            }
          } else {
            toast.error("Updated User failed");
          }
        })
        .catch((error) => {
          toast.error("Updated User failed");
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
      false
    ) {
      toast.error(`${t("sys0301w.required.message.password")}`);
      _chk = false;
    } else if (params.password !== params.matchPassword && false) {
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

  const [openDialog, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [formStatus, setFormStatus] = useState("");

  const closeDialog = (data?: any) => {
    setOpen(false);
    if (data) {
    }
  };

  const handleOpenDialog = (isEnable?: any) => {
    setOpen(true);
    setData({ isEnable, userInfo });
    if (isEnable) {
      setFormStatus("ON");
    } else {
      setFormStatus("OFF");
    }
  };

  const onChangeTwoFa = (event: any) => {
    let isChecked = event.target.checked;
    handleOpenDialog(isChecked);
  };

  const [openChangePassDialog, setOpenChangePass] = useState(false);
  const [dataChangePass, setDataChangePass] = useState({});

  const closeChangePassDialog = (data?: any) => {
    setOpenChangePass(false);
    if (data) {
    }
  };

  const handleOpenChangePassDialog = () => {
    setOpenChangePass(true);
    setDataChangePass({ userInfo });
  };

  const [openVerifyTwoFaDialog, setOpenVerifyTwoFa] = useState(false);
  const [dataVerifyTwoFa, setDataVerifyTwoFa] = useState({});

  const [verifyFor, setVerifyFor] = useState("");

  const closeVerifyTwoFaDialog = (data?: any) => {
    setOpenVerifyTwoFa(false);
    if (data) {
      if (data.isVerify) {
        if (verifyFor === "PASSWORD") {
          handleOpenChangePassDialog();
        } else if (verifyFor === "EMAIL") {
          handleOpenChangeEmailDialog();
        }
      }
    }
  };

  const handleOpenVerifyTwoFaDialog = (verifyFor: any) => {
    setVerifyFor(verifyFor);
    setOpenVerifyTwoFa(true);
    setDataVerifyTwoFa({ userInfo });
  };

  const handleChangePassWord = () => {
    if (!userInfo.twoFAEnable) {
      handleOpenChangePassDialog();
    } else {
      handleOpenVerifyTwoFaDialog("PASSWORD");
    }
  };

  const [openChangeEmailDialog, setOpenChangeEmailDialog] = useState(false);
  const [dataChangeEmail, setDataChangeEmail] = useState({});

  const closeChangeEmailDialog = (data?: any) => {
    setOpenChangeEmailDialog(false);
    if (data) {
    }
  };

  const handleChangeEmail = () => {
    if (!userInfo.twoFAEnable) {
      handleOpenChangeEmailDialog();
    } else {
      handleOpenVerifyTwoFaDialog("EMAIL");
    }
  };

  const handleOpenChangeEmailDialog = () => {
    setOpenChangeEmailDialog(true);
    setDataChangeEmail({ userInfo });
  };

  return (
    <>
      <AppDialog
        open={openChangeEmailDialog}
        width={{ maxWidth: "sm", fullWidth: true }}
        onClose={closeChangeEmailDialog}
        title={`${t("sys0301.table.header.changeEmail")}`}
        style={{ width: "30%" }}
      >
        <ChangeEmailPopup
          onClose={closeChangeEmailDialog}
          data={dataChangeEmail}
        />
      </AppDialog>

      <AppDialog
        open={openDialog}
        width={{ maxWidth: "sm", fullWidth: true }}
        onClose={closeDialog}
        title={
          formStatus === "ON"
            ? `${t("profile.button.enable.2FA")}`
            : `${t("profile.button.Disable.2FA")}`
        }
        style={{ width: "30%" }}
      >
        <EnableTwoFaAuthPopup onClose={closeDialog} data={data} />
      </AppDialog>

      <AppDialog
        open={openChangePassDialog}
        width={{ maxWidth: "sm", fullWidth: true }}
        onClose={closeChangePassDialog}
        title={`${t("sys0301.table.header.changePassword")}`}
        style={{ width: "30%" }}
      >
        <ChangePassPopup
          onClose={closeChangePassDialog}
          data={dataChangePass}
        />
      </AppDialog>

      <AppDialog
        open={openVerifyTwoFaDialog}
        width={{ maxWidth: "sm", fullWidth: true }}
        onClose={closeVerifyTwoFaDialog}
        title={`${t("sys0301.table.header.verifyTwoFa")}`}
        style={{ width: "30%" }}
      >
        <TwoFaVerifyPopup
          onClose={closeVerifyTwoFaDialog}
          data={dataVerifyTwoFa}
        />
      </AppDialog>

      <div className="position-relative mx-n4 mt-n4">
        <div className="profile-wid-bg profile-setting-img">
          <img
            src="assets/images/profile-bg.jpg"
            className="profile-wid-img"
            alt=""
          />
         
          {/* <div className="overlay-content">
            <div className="text-end p-3">
              <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                <input
                  id="profile-foreground-img-file-input"
                  type="file"
                  className="profile-foreground-img-file-input"
                />
                <label
                  htmlFor="profile-foreground-img-file-input"
                  className="profile-photo-edit btn btn-light"
                >
                  <i className="ri-image-edit-line align-bottom me-1"></i>{" "}
                  Change Cover
                </label>
              </div>
            </div>
          </div> change back ground btn */} 
        </div>
      </div>
      <div className="row">
        <div className="col-xxl-3">
          <div className="card mt-n5">
            <div className="card-body p-4">
              <div className="text-center">
                <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                  <img
                    src={ userInfo.imgPathBase64? `data:image/jpeg;base64,${userInfo.imgPathBase64}` : `assets/images/users/user-dummy-img.jpg`}
                    className="rounded-circle avatar-xl img-thumbnail user-profile-image  shadow"
                    alt="user-profile-image"
                  />
                  <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                    <input
                      id="profile-img-file-input" onChange={onChangeAvatar} accept="image/png, image/gif, image/jpeg"
                      type="file"
                      className="profile-img-file-input"
                    />
                    <label
                      htmlFor="profile-img-file-input"
                      className="profile-photo-edit avatar-xs"
                    >
                      <span className="avatar-title rounded-circle bg-light text-body shadow">
                        <i className="ri-camera-fill"></i>
                      </span>
                    </label>
                  </div>
                </div>
                <h5 className="fs-16 mb-1">{userInfo.fullName}</h5>
                <p className="text-muted mb-0">{userInfo.email}</p>
              </div>
            </div>
          </div>
          {/*<!--end card-->*/}
          {/* <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-0">Portfolio</h5>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href="#javascript"
                    className="badge bg-light text-primary fs-12"
                  >
                    <i className="ri-add-fill align-bottom me-1"></i> Add
                  </a>
                </div>
              </div>
              <div className="mb-3 d-flex">
                <div className="avatar-xs d-block flex-shrink-0 me-3">
                  <span className="avatar-title rounded-circle fs-16 bg-dark text-light shadow">
                    <i className="ri-github-fill"></i>
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control"
                  id="gitUsername"
                  placeholder="Username"
                  defaultValue="@daveadame"
                />
              </div>
              <div className="mb-3 d-flex">
                <div className="avatar-xs d-block flex-shrink-0 me-3">
                  <span className="avatar-title rounded-circle fs-16 bg-primary shadow">
                    <i className="ri-global-fill"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="websiteInput"
                  placeholder="www.example.com"
                  defaultValue="www.velzon.com"
                />
              </div>
              <div className="mb-3 d-flex">
                <div className="avatar-xs d-block flex-shrink-0 me-3">
                  <span className="avatar-title rounded-circle fs-16 bg-success shadow">
                    <i className="ri-dribbble-fill"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="dribbleName"
                  placeholder="Username"
                  defaultValue="@dave_adame"
                />
              </div>
              <div className="d-flex">
                <div className="avatar-xs d-block flex-shrink-0 me-3">
                  <span className="avatar-title rounded-circle fs-16 bg-danger shadow">
                    <i className="ri-pinterest-fill"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="pinterestName"
                  placeholder="Username"
                  defaultValue="Advance Dave"
                />
              </div>
            </div>
          </div> */}
          {/*<!--end card-->*/}
        </div>
        {/*<!--end col-->*/}
        <div className="col-xxl-9">
          <div className="card mt-xxl-n5">
            <div className="card-header">
              <ul
                className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-bs-toggle="tab"
                    href="#personalDetails"
                    role="tab"
                  >
                    <i className="fas fa-home"></i> Personal Details
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#privacy"
                    role="tab"
                  >
                    <i className="far fa-envelope"></i> Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body p-4">
              <div className="tab-content">
                <div
                  className="tab-pane active"
                  id="personalDetails"
                  role="tabpanel"
                >
                  <form onSubmit={handleSave}>
                    <div className="col-lg-12 mb-3">
                      <label htmlFor="validationUserId" className="form-label">
                        {t("sys0301.table.header.userName")}
                        {/* <strong className="strong-required">*</strong> */}
                      </label>
                      <input
                        value={model?.userId || ""}
                        className="form-control"
                        name="userId"
                        id="validationUserId"
                        onChange={handleChange}
                        readOnly={!!model?.userUid}
                      />
                      <div
                        className={`${
                          model?.userId?.trim() === ""
                            ? "error-required"
                            : "display-none"
                        }`}
                      >
                        {t("sys0301w.required.message.userId")}
                      </div>
                    </div>

                    <div className="col-lg-12 mb-3">
                      <label
                        htmlFor="validationInputEmail"
                        className="form-label"
                      >
                        {t("sys0301.table.header.email")}
                        {/* <strong className="strong-required">*</strong> */}
                      </label>
                      <input
                        value={model?.email || ""}
                        className="form-control"
                        name="email"
                        id="validationInputEmail"
                        onChange={handleChange}
                        readOnly={!!model?.email}
                      />
                      <div
                        className={`${
                          model?.userId?.trim() === ""
                            ? "error-required"
                            : "display-none"
                        }`}
                      >
                        {t("sys0301w.required.message.email")}
                      </div>
                    </div>

                    {/* <div className="col-lg-12 mb-3">
                      <h5 className="card-title text-decoration-underline mb-3">
                        Security:
                      </h5>
                      <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0">
                        <div className="flex-grow-1">
                          <h6 className="fs-14 mb-1">
                            Two-factor Authentication
                          </h6>
                          <p className="text-muted">
                            Two-factor authentication is an enhanced security
                            meansur. Once enabled, you'll be required to give
                            two types of identification when you log into Google
                            Authentication and SMS are Supported.
                          </p>
                        </div>
                        <div className="flex-shrink-0 ms-sm-3">
                          {!userInfo?.twoFAEnable ? (
                            <a
                              onClick={() => handleOpenDialog(true)}
                              className="btn btn-sm btn-primary"
                            >
                              Enable Two-facor Authentication
                            </a>
                          ) : (
                            <a
                              onClick={() => handleOpenDialog(false)}
                              className="btn btn-sm btn-dark"
                            >
                              Disable Two-facor Authentication
                            </a>
                          )}
                        </div>
                      </div>
                    </div> */}

                    {/* 
                    <div className="col-lg-12 mb-3">
                      <label
                        htmlFor="validationInputEmail"
                        className="form-label"
                      >
                        {t("sys0301.table.header.email")}{" "}
                        <strong className="strong-required">*</strong>
                      </label>
                      <input
                        value={model?.email || ""}
                        className="form-control"
                        name="email"
                        id="validationInputEmail"
                        onChange={handleChange}
                      />
                      <div
                        className={`${
                          model?.email?.trim() === ""
                            ? "error-required"
                            : "display-none"
                        }`}
                      >
                        {t("sys0301w.required.message.email")}
                      </div>
                      <div
                        className={`${
                          model?.email?.trim() != null &&
                          model?.email.trim() !== "" &&
                          !ValidationUtil.isEmail(model?.email?.trim())
                            ? "error-required"
                            : "display-none"
                        }`}
                      >
                        Email invalidate
                      </div>
                    </div> */}

                    <div className="col-lg-12 mb-3">
                      <label
                        htmlFor="validationFullName"
                        className="form-label"
                      >
                        {t("sys0301.table.header.fullName")}
                      </label>
                      <input
                        value={model?.fullName || ""}
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
                        value={model?.address || ""}
                        className="form-control"
                        name="address"
                        id="validationAddress"
                        onChange={handleChange}
                      ></input>
                    </div>
                    {/* 
                    <div className="col-lg-12 mb-3">
                      <label
                        htmlFor="validationOrganization"
                        className="form-label"
                      >
                        {t("sys0301.table.header.organization")}
                      </label>
                      <input
                        value={model?.organization || ""}
                        className="form-control"
                        name="organization"
                        id="validationOrganization"
                        onChange={handleChange}
                      ></input>
                    </div> */}

                    <div className="col-lg-12 mb-3">
                      <label htmlFor="validationPhone" className="form-label">
                        {t("sys0301.table.header.cellPhone")}{" "}
                        <strong className="strong-required">*</strong>
                      </label>
                      <input
                        value={model?.cellPhone || ""}
                        className="form-control"
                        name="cellPhone"
                        id="validationPhone"
                        onChange={handleChange}
                      />
                      <div
                        className={`${
                          model?.cellPhone?.trim() === ""
                            ? "error-required"
                            : "display-none"
                        }`}
                      >
                        Please enter a phone in the input
                      </div>
                      <div
                        className={`${
                          model?.cellPhone?.trim() != null &&
                          model?.cellPhone.trim() !== "" &&
                          !ValidationUtil.isPhone(model?.cellPhone?.trim())
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
                      <AppDatePicker
                        onChange={handleChangeDate}
                        value={model?.dob || ""}
                      />
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
                          value={{ value: model.gender ? "1" : "0"}}
                        />
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
                      {/* <button
                        type="button"
                        onClick={() => props.onClose(false)}
                        className="btn btn-light btn-label rounded-pill waves-effect waves-light ms-2"
                      >
                        <i className="ri-close-circle-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                        {t("confirm.button.cancel.text")}
                      </button> */}
                    </div>
                  </form>
                </div>
                {/* <!--end tab-pane--> */}
                <div className="tab-pane" id="privacy" role="tabpanel">
                  <div className="mb-4 pb-2">
                    {/* <h5 className="card-title mb-3">
                      Change password
                    </h5> */}
                    <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0">
                      <div className="flex-grow-1">
                        <h6 className="fs-14 mb-1">{t("sys0301.table.header.changePassword")}</h6>
                        <p className="text-muted">
                          For your safety, you should change your password
                          regularly.
                        </p>
                      </div>
                      <div className="flex-shrink-0 ms-sm-3">
                        <a
                          onClick={() => handleChangePassWord()}
                          className="btn btn-sm waves btn-primary"
                          style={{
                            borderRadius: "10px",
                            border: "none",
                            background: "#407F3E",
                            color: "#FFF",
                          }}
                        >
                          {t("sys0301.table.header.changePassword")}
                        </a>
                      </div>
                    </div>
                    <hr></hr>

                    <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0">
                      <div className="flex-grow-1">
                        <h6 className="fs-14 mb-1">{t("sys0301.table.header.changeEmail")}</h6>
                        <p className="text-muted">{t("sys0301.table.header.changeEmail")}</p>
                      </div>
                      <div className="flex-shrink-0 ms-sm-3">
                        <a
                          onClick={() => handleChangeEmail()}
                          className="btn btn-sm waves btn-primary"
                          style={{
                            borderRadius: "10px",
                            border: "none",
                            background: "#407F3E",
                            color: "#FFF",
                          }}
                        >
                          {t("sys0301.table.header.changeEmail")}
                        </a>
                      </div>
                    </div>
                    <hr></hr>

                    <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                      <div className="flex-grow-1">
                        <h6 className="fs-14 mb-1">
                          {t("sys0301.table.header.verifyTwoFa")}
                        </h6>
                        <p className="text-muted mb-sm-0">
                          Two-factor authentication is an enhanced security
                          meansur. Once enabled, you'll be required to give two
                          types of identification when you log into Google
                          Authentication and SMS are Supported.
                        </p>
                      </div>
                      <div className="flex-shrink-0 ms-sm-3">
                        <div className="form-check form-switch form-switch-right form-switch-md">
                          <label
                            htmlFor="toggle-button"
                            className="form-label text-muted"
                          ></label>

                          {/* {!userInfo?.twoFAEnable ? (
                            <input onChange={onChangeTwoFa} className="form-check-input code-switcher" type="checkbox" id="toggle-button"/>
                          ) : (
                            <input onChange={onChangeTwoFa} className="form-check-input code-switcher" type="checkbox" id="toggle-button" checked/>
                          )} */}

                          <input
                            onChange={onChangeTwoFa}
                            className="form-check-input code-switcher"
                            type="checkbox"
                            id="toggle-button"
                            checked={userInfo?.twoFAEnable}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--end tab-pane--> */}
              </div>
            </div>
          </div>
        </div>
        {/*<!--end col-->*/}
      </div>
    </>
  );
}
