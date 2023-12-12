import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Constant } from "../../../../constants/constant";
import { SwaggerConstant } from "../../../../constants/swaggerConstant";
import { Sam0104Service } from "../../../../services/sam/Sam0104Service";
import { ApiUrlUtil } from "../../../../utils/apiUrlUtil";
import { ParamUtil } from "../../../../utils/paramUtil";
import "./Sam0104.css";

export default function ApiDetail(prop: any) {
  const [param, setParam] = useState<any>({});
  const [api, setApi] = useState(prop.api);
  const [models, setModel] = useState(prop.models);
  const [reqBody, setReqBody] = useState<any>();

  const handleClickTry = (ele: any) => {
    if (ele.detail.parameters) {
      ele.detail.parameters.forEach((element: any) => {
        if (element.in == SwaggerConstant.REQUEST_BODY || (element.in == SwaggerConstant.REQUEST_PARAM && element.type == SwaggerConstant.OBJECT_TYPE)) {
          document.getElementById(`request-body-input ${ele.name}`)?.classList.add("active");
          document.getElementById(`request-body-example ${ele.name}`)?.classList.remove("active");
        }
      });
    }
    setApi({ ...api, canExecute: true });
  };

  const handleClickCancel = (ele: any) => {
    if (ele.detail.parameters) {
      ele.detail.parameters.forEach((element: any) => {
        if (element.in == "body" || (element.in == SwaggerConstant.REQUEST_PARAM && element.type == SwaggerConstant.OBJECT_TYPE)) {
          document.getElementById(`request-body-input ${ele.name}`)?.classList.remove("active");
          document.getElementById(`request-body-example ${ele.name}`)?.classList.add("active");
        }
      });
    }
    setApi({ ...api, canExecute: false });
  };

  const onExecute = (api: any) => {
    if (api.detail.method == Constant.GET_METHOD) {
      if (!chkValidateParam()) return;
      let params = ParamUtil.toRequestParams(param);
      let url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_MAIN_URL + api.name, params);
      Sam0104Service.get(url)
        .then((res) => {
          setApi({ ...api, responseURL: url, responseCode: res.status });
          showResponseBody(api, res.data);
        })
        .catch((err) => {
          setApi({ ...api, responseURL: url, responseCode: err.statusCode });
          showResponseBody(api, err.details);
        });
    } else if (api.detail.method == Constant.POST_METHOD) {
      let url = process.env.REACT_APP_MAIN_URL + api.name;
      Sam0104Service.post(api.name, JSON.parse(reqBody))
        .then((res) => {
          setApi({ ...api, responseURL: url, responseCode: res.status });
          showResponseBody(api, res.data);
        })
        .catch((err) => {
          setApi({ ...api, responseURL: url, responseCode: err.statusCode });
          showResponseBody(api, err.details);
        });
    } else if (api.detail.method == Constant.PUT_METHOD) {
      let url = process.env.REACT_APP_MAIN_URL + api.name;
      Sam0104Service.put(api.name, JSON.parse(reqBody))
        .then((res) => {
          setApi({ ...api, responseURL: url, responseCode: res.status });
          showResponseBody(api, res.data);
        })
        .catch((err) => {
          setApi({ ...api, responseURL: url, responseCode: err.statusCode });
          showResponseBody(api, err.details);
        });
    } else if (api.detail.method == Constant.DELETE_METHOD) {
      if (!chkValidateParam()) return;
      let url = api.name;
      api.detail.parameters.forEach((ele: any) => {
        url = url.replace(`{${ele.name}}`, param[ele.name as keyof typeof param]);
      });
      Sam0104Service.delete(url)
        .then((res) => {
          setApi({ ...api, responseURL: url, responseCode: res.status });
          showResponseBody(api, res.data);
        })
        .catch((err) => {
          setApi({ ...api, responseURL: url, responseCode: err.statusCode });
          showResponseBody(api, err.details);
        });
    }
    document.getElementById(`server-response ${api.name}`)?.classList.add("active");
  };

  function chkValidateParam() {
    let chk = true;
    api.detail.parameters.forEach((ele: any) => {
      if (!param[ele.name]) {
        chk = false;
        document.getElementById(`form-${ele.name}`)?.classList.add("required");
      } else {
        document.getElementById(`form-${ele.name}`)?.classList.remove("required");
      }
    });
    return chk;
  }

  function showResponseBody(api: any, data: any) {
    document.getElementById(`response-body ${api.name}`)!.innerHTML = JSON.stringify(data, null, 2);
  }

  useEffect(() => {
    if (api.detail.parameters) {
      api.detail.parameters.forEach((param: any) => {
        models.forEach((model: any) => {
          if (param.in == SwaggerConstant.REQUEST_BODY) {
            if (param.schema["$ref"] && param.schema["$ref"]?.includes(model.title)) {
              api.model = {};
              api.model = { ...model };
              setApi(api);
              param.object = {};
              model.props.forEach((prop: any) => {
                param.object = { ...param.object, [prop.name]: prop.type };
              });
            }
            if (param.schema.type == SwaggerConstant.ARRAY_TYPE) {
              if (param.schema.items && param.schema.items["$ref"]?.includes(model.title)) {
                api.model = {};
                api.model = { ...model };
                setApi(api);
                param.objectTmp = {};
                model.props.forEach((prop: any) => {
                  param.objectTmp = { ...param.objectTmp, [prop.name]: prop.type };
                });
                param.object = [];
                param.object.push(param.objectTmp);
              } else {
                param.object = [{}];
              }
            }
            if (param.schema.type == SwaggerConstant.OBJECT_TYPE) {
              param.object = {};
            }
            setReqBody(JSON.stringify(param.object, null, 2));
          }
          if (param.in == SwaggerConstant.REQUEST_PARAM) {
            if (param.type == SwaggerConstant.OBJECT_TYPE) {
              param.object = {};
            }
            setReqBody(JSON.stringify(param.object, null, 2));
          }
        });
      });
    }
  }, []);

  const onShowExpVal = (api: any) => {
    document.getElementById(`model ${api.name}`)?.classList.remove("show");
    document.getElementById(`exp-title ${api.name}`)?.classList.add("active");
    document.getElementById(`model-title ${api.name}`)?.classList.remove("active");
    document.getElementById(`request-body-input ${api.name}`)?.classList.remove("hide");
    document.getElementById(`request-body-example ${api.name}`)?.classList.remove("hide");
  };

  const onShowModel = (api: any) => {
    document.getElementById(`model ${api.name}`)?.classList.add("show");
    document.getElementById(`exp-title ${api.name}`)?.classList.remove("active");
    document.getElementById(`model-title ${api.name}`)?.classList.add("active");
    document.getElementById(`request-body-input ${api.name}`)?.classList.add("hide");
    document.getElementById(`request-body-example ${api.name}`)?.classList.add("hide");
  };

  const onHandleChange = (event: any) => {
    setParam({ ...param, [event.target.name]: event.target.value });
  };

  const onHandleChangeObj = (event: any) => {
    setReqBody(event.target.value);
  };

  return (
    <>
      <Accordion multiple>
        <AccordionTab
          header={
            <>
              <div className="row flex-nowrap align-items-center ms-1">
                <div className={"tag-api " + api.detail.method.toLowerCase()}>
                  <span>{api.detail.method}</span>
                </div>
                <div>
                  <div className="api-name">
                    <span>{api.name}</span>
                  </div>
                  <div className="api-summary ms-1">
                    <span>{api.detail.summary}</span>
                  </div>
                </div>
              </div>
            </>
          }
          headerClassName={api.detail.method.toLowerCase()}
          contentClassName={"accordion-content-" + api.detail.method.toLowerCase()}>
          <>
            <div className="row mb-3 bg-white border-bottom border-2">
              <div className="mb-2 d-flex align-items-center justify-content-between">
                <span className="api-param">Parameters</span>
                <span>
                  {!api.canExecute ? (
                    <Button label="Try it out" outlined onClick={() => handleClickTry(api)} />
                  ) : (
                    <Button label="Cancel" severity="danger" outlined onClick={() => handleClickCancel(api)} />
                  )}
                </span>
              </div>
            </div>
            {api.detail.parameters ? (
              <>
                <div className="row mb-3 border-bottom border-1 border-dark">
                  <div className="col-lg-2">
                    <span>
                      <b>Name</b>
                    </span>
                  </div>
                  <div className="col-lg-10">
                    <span>
                      <b>Description</b>
                    </span>
                  </div>
                </div>
                {api.detail.parameters.map((param: any, index: any) => (
                  <div key={index}>
                    <div className="row mb-5">
                      <div className="col-lg-2">
                        <div className="param-name">
                          <span>{param.name}</span>
                          {param.required == true && <span className="param-required ms-1">* required</span>}
                        </div>
                        <div className="param-type">
                          <span>{param.type}</span>
                        </div>
                      </div>
                      {((param.in == SwaggerConstant.REQUEST_PARAM && param.type != SwaggerConstant.OBJECT_TYPE) || param.in == SwaggerConstant.PATH_VARIABLE) && (
                        <div className="col-lg-10">
                          <span>{param.description}</span>
                          {api.canExecute ? (
                            <input className={`form-control ${param.name}`} id={`form-${param.name}`} name={param.name} onChange={(e) => onHandleChange(e)} />
                          ) : (
                            <input className={`form-control`} disabled />
                          )}
                        </div>
                      )}
                      {(param.in == SwaggerConstant.REQUEST_BODY || (param.in == SwaggerConstant.REQUEST_PARAM && param.type == SwaggerConstant.OBJECT_TYPE)) && (
                        <div className="col-lg-10">
                          <span className="fs-4">{param.description}</span>
                          <div>
                            <a className={`exp-title ${api.name} ms-1 active`} id={`exp-title ${api.name}`} onClick={() => onShowExpVal(api)}>
                              Example Value |
                            </a>
                            <a className={`model-title ${api.name} ms-1`} id={`model-title ${api.name}`} onClick={() => onShowModel(api)}>
                              Model
                            </a>
                          </div>
                          <div className={"model-detail model " + api.name} id={"model " + api.name}>
                            {api.model != undefined &&
                              api.model.props.map((ele: any, index: any) => (
                                <div key={index}>
                                  <div className="row">
                                    <div className="col-lg-2">{ele.name}</div>
                                    <div className="col-lg-10" style={{ color: "blue" }}>
                                      {ele.type ? (
                                        <>
                                          {ele.type} {ele.format && <>({ele.format})</>}
                                        </>
                                      ) : (
                                        <>object</>
                                      )}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-2"></div>
                                    <div className="col-lg-10">{ele.description}</div>
                                  </div>
                                </div>
                              ))}
                          </div>
                          <textarea className={"request-body-input " + api.name} id={"request-body-input " + api.name} value={reqBody} rows={20} onChange={(e) => onHandleChangeObj(e)} />
                          <pre className={"request-body-example " + api.name + " active"} id={"request-body-example " + api.name}>
                            {reqBody}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="row mb-3 border-bottom border-1 border-dark">
                <span className="mb-5">No parameters</span>
              </div>
            )}

            <div className="row mb-3">{api.canExecute && <Button label="Execute" severity="info" onClick={() => onExecute(api)} />}</div>
            <div className="row mb-3 bg-white border-bottom border-2">
              <span className="api-responses mb-2">Responses</span>
            </div>
            <div id={"server-response " + api.name} className={"server-response " + api.name}>
              <div className="row mb-3">
                <span>
                  <b>Request URL</b>
                </span>
                <span className="request-url">{api.responseURL}</span>
              </div>
              <div className="row mb-3">
                <span>
                  <b>Server response</b>
                </span>
              </div>
              <div className="row mb-3 border-bottom border-1 border-dark">
                <div className="col-lg-1">
                  <span>
                    <b>Code</b>
                  </span>
                </div>
                <div className="col-lg-11">
                  <span>
                    <b>Details</b>
                  </span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-1">
                  <span>
                    <b>{api.responseCode}</b>
                  </span>
                </div>
                <div className="col-lg-11">
                  <span>
                    <b>Response body</b>
                  </span>
                  <pre className={"response-body " + api.name} id={"response-body " + api.name}></pre>
                </div>
              </div>
              <div className="row">
                <span>
                  <b>Responses</b>
                </span>
              </div>
            </div>

            <div className="row mb-3 border-bottom border-1 border-dark">
              <div className="col-lg-1">
                <span>
                  <b>Code</b>
                </span>
              </div>
              <div className="col-lg-11">
                <span>
                  <b>Description</b>
                </span>
              </div>
            </div>
            {Object.entries(api.detail.responses).map((res: any, index: any) => (
              <div key={index}>
                <div className="row mb-3">
                  <div className="col-lg-1">
                    <div className="res-code">
                      <span>{res[0]}</span>
                    </div>
                  </div>
                  <div className="col-lg-11">
                    <span>{res[1].description}</span>
                  </div>
                </div>
              </div>
            ))}
          </>
        </AccordionTab>
      </Accordion>
    </>
  );
}
