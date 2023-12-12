import { ToastContainer } from "react-toastify";
// import "swagger-ui-react/swagger-ui.css";
import FooterHashTag from "../common/FooterHashTag";
import { useEffect, useState } from "react";
import { Sam0104Service } from "../../../../services/sam/Sam0104Service";
import { Accordion, AccordionTab } from "primereact/accordion";
import ApiDetail from "./ApiDetail";

export default function Sam0104() {
  const [swaggerData, setSwaggerData] = useState<any>(null);
  const [apiList, setApiList] = useState<any>([]);
  const [tagList, setTagList] = useState<any>([]);
  const [modelList, setModelList] = useState<any>([]);
  const [swagger, setSwagger] = useState<any>({});

  const getApiList = () => {
    Sam0104Service.getListApi()
      .then((res) => {
        setSwaggerData((preVal: any) => (preVal = res.data));
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (swaggerData != null) {
      convertTagList();
      convertApiList();
      convertModelList();
    }
  }, [swaggerData]);

  useEffect(() => {
    if (apiList.length != 0 && tagList.length != 0 && modelList.length != 0) {
      convertSwaggerObject();
    }
  }, [tagList, apiList, modelList]);

  useEffect(() => {
    getApiList();
  }, []);

  function convertTagList() {
    const tags = swaggerData.tags;
    const tmpArr: any = [];
    const apiEntries = new Map([]);
    tags.forEach((tag: any) => {
      apiEntries.set("name", tag.name);
      apiEntries.set("apis", []);
      tmpArr.push(Object.fromEntries(apiEntries));
    });
    setTagList(tmpArr);
  }

  function convertApiList() {
    const apiArrList = Object.entries(swaggerData.paths);
    const apiEntries = new Map([]);
    const tmpArr: any = [];
    apiArrList.forEach((apiEntry: any) => {
      let apiMethod: any = Object.keys(apiEntry[1]).toString();
      apiEntries.set("name", apiEntry[0]);
      apiEntries.set("detail", apiEntry[1][apiMethod]);
      let apiObject = Object.fromEntries(apiEntries);
      apiObject.detail.method = apiMethod.toUpperCase();
      tmpArr.push(apiObject);
    });

    setApiList(tmpArr);
  }

  function convertModelList() {
    const modelList = swaggerData.definitions;
    const keyModelList = Object.keys(modelList);
    const modelArr: any = [];

    keyModelList.forEach((key: any) => {
      modelArr.push(modelList[key]);
    });

    modelArr.forEach((model: any) => {
      let keyProp = Object.keys(model.properties);
      model.props = [];
      keyProp.forEach((key: any) => {
        model.properties[key].name = "";
        model.properties[key].name = key;
        model.props.push(model.properties[key]);
      });

      delete model["properties"];
    });

    setModelList(modelArr);
  }

  function convertSwaggerObject() {
    let swaggerObj: any = {};
    const swaggerTmpEntries = new Map([]);

    apiList.forEach((api: any) => {
      tagList.forEach((tag: any) => {
        if (tag.name == api.detail.tags.toString()) {
          tag.apis.push(api);
        }
      });
    });

    swaggerTmpEntries.set("models", modelList);
    swaggerTmpEntries.set("controllers", tagList);
    swaggerObj = Object.fromEntries(swaggerTmpEntries);

    setSwagger(swaggerObj);
  }

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="card table-area">
        <div className="card-body">
          <div className="row mb-3">
            <h2 className="accordion-header card-title" id="headingOne">
              List API
            </h2>
          </div>
          <div className="row mb-3">
            {swagger.controllers != undefined && swagger.models != undefined && (
              <div>
                {swagger.controllers.map((element: any, index: number) => (
                  <div key={index}>
                    <Accordion multiple>
                      <AccordionTab header={element.name}>
                        {element.apis.map((api: any, index: any) => (
                          <div key={index}>
                            <ApiDetail api={api} models={swagger.models} />
                          </div>
                        ))}
                      </AccordionTab>
                    </Accordion>
                  </div>
                ))}
              </div>
            )}
          </div>
          <hr />
          <div className="row mb-3">
            <Accordion multiple>
              <AccordionTab header="Models">
                {swagger.models != undefined && (
                  <div>
                    {swagger.models.map((model: any, index: any) => (
                      <div key={index}>
                        <Accordion multiple>
                          <AccordionTab header={model.title}>
                            {model.props.map((ele: any, index: any) => (
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
                          </AccordionTab>
                        </Accordion>
                      </div>
                    ))}
                  </div>
                )}
              </AccordionTab>
            </Accordion>
          </div>
        </div>
      </div>
      <FooterHashTag />
    </>
  );
}
