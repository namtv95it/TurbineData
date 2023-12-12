import { HttpStatusCode } from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

// import { Button } from "@mui/material";
import { Sys0201Service } from "../../../../../../services/sys/Sys0201Service";
import AppRadioButton from "../../../../../commons/AppRadioButton";
import { VariablesConstant } from "../../../../../../constants/variables";
import { useAppDispatch } from "../../../../../../store/hook";
import { showAndHideSpinner } from "../../../../../../reducers/spinnerSlice";

type RoleModel = {
  roleId: string;
  roleNm?: string;
  useYn: string;
  description: string | null | "";
};

export default function RoleForm(props: any) {
  const status: any[] = VariablesConstant.MENU_STATUS;

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [model, setModel] = useState<RoleModel>(props.data);

  var isPopupCreate: boolean;

  if (model.roleId) {
    isPopupCreate = false;
  } else {
    isPopupCreate = true;
  }

  const handleChange = (event: any) => {
    setModel({
      ...model,
      [event.target.name]: event.target.value,
    });
  };

  const changeRadioButton = (data?: any) => {
    setModel({
      ...model,
      useYn: data.value,
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
    if (model.roleId) {
      Sys0201Service.getInstance()
        .update_role(model)
        .then((resp) => {
          if (resp.status === HttpStatusCode.Ok) {
            if (resp.data.status) {
              toast.success(`${t('sys0201.message.success.update')}`);
              props.onClose(true);
            } else {
              toast.error(`${t('sys0201.message.error.update')}`);
            }
          } else {
            toast.error(`${t('sys0201.message.error.update')}`);
          }
          dispatch(showAndHideSpinner(false));
        })
        .catch((error) => {
          toast.error(`${t('sys0201.message.error.system')}`);
          dispatch(showAndHideSpinner(false));
        });
    } else {
      Sys0201Service.getInstance()
        .save_role(model)
        .then((resp) => {
          if (resp.status === HttpStatusCode.Ok) {
            if (resp.data.status) {
              toast.success(`${t('sys0201.message.success.save')}`);
              props.onClose(true);
            } else {
              toast.error(`${t('sys0201.message.error.save')}`);
            }
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
  }

  function chk(params: RoleModel) {
    let _chk = true;
    if (params.roleNm == null || params.roleNm.trim() === "") {
      toast.error(`${t("sys0201w.required.message.roleNm")}`);
      _chk = false;
    }
    if (!_chk) {
      setModel((prveState: RoleModel) => {
        return {
          ...prveState,
          roleId: prveState.roleId,
          roleNm: prveState.roleNm || "",
          useYn: prveState.useYn || "",
          description:
            prveState.description === "" ? null : prveState.description,
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
          <label htmlFor="validationInputRoleNm" className="form-label">
            {t("sys0201.table.header.roleNm")}{" "}
            <strong className="strong-required">*</strong>
          </label>
          <input
            value={model.roleNm || ""}
            className="form-control"
            name="roleNm"
            id="validationInputRoleNm"
            onChange={handleChange}
          />
          <div
            className={`${model.roleNm?.trim() === "" ? "error-required" : "display-none"
              }`}
          >
            {t("sys0201w.required.message.roleNm")}
          </div>
        </div>

        <div className="col-lg-12 mb-3">
          <label htmlFor="validationDescription" className="form-label">
            {t("sys0201.table.header.description")}
          </label>
          <input
            value={model.description || ""}
            className="form-control"
            name="description"
            id="validationDescription"
            onChange={handleChange}
          ></input>
        </div>

        <div className="d-flex col-lg-12 mb-3">
          {!isPopupCreate ? (
            <div>
              <label className="form-check-label-radio">
                {t("sys0201.table.header.status")}
                <strong className="strong-required"></strong>
              </label>
              <AppRadioButton
                dataSource={status}
                nameGroup="useYn"
                onChange={changeRadioButton}
                value={{ value: model.useYn }}
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
