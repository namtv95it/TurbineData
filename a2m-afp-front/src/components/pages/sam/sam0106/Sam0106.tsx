import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";

export class Sam0106Search {
  zipCode: string;
  address: string;
  constructor(zipCode: string, address: string) {
    this.zipCode = zipCode;
    this.address = address;
  }
}

export class Coordinate {
  lat: number;
  lng: number;
  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}

export default React.memo(Sam0106);

function Sam0106() {
  const { t, i18n } = useTranslation();

  const [center, setCenter] = useState<Coordinate>(
    new Coordinate(21.005488531688606, 105.77911843674069)
  );

  const [modelSearch, setModelSearch] = useState<Sam0106Search>(
    new Sam0106Search("", "")
  );

  const handleChangeZipcode = (event: any) => {
    setModelSearch({
      ...modelSearch,
      zipCode: event.target.value,
    });
  };
  const handlePressEnter = (event: any) => {
    setModelSearch({
      ...modelSearch,
      zipCode: event.target.value,
    });
    if (event.keyCode === 13) {
      onSearch();
    }
  };

  const onSearch = () => {
    let tmpCenter = getLatLngByZipcode(Number(modelSearch.zipCode));
    setCenter({ ...center, lat: tmpCenter.lat, lng: tmpCenter.lng });
  };

  useEffect(() => {
    //console.log('useEffect has been called!');
  }, [center]);

  function getLatLngByZipcode(zipcode: number) {
    var latitude = 10.774016445806016;
    var longitude = 106.6979211737834;
    // var geocoder = new google.maps.Geocoder();
    // var address = zipcode;
    // geocoder.geocode({ 'address': 'zipcode '+address }, function (results: any, status: any) {
    //     if (status == google.maps.GeocoderStatus.OK) {
    //         latitude = results[0].geometry.location.lat();
    //         longitude = results[0].geometry.location.lng();
    //         alert("Latitude: " + latitude + "\nLongitude: " + longitude);
    //     } else {
    //         alert("Request failed.")
    //     }
    // });
    return new Coordinate(latitude, longitude);
  }

  const search = () => {
    onSearch();
  };

  const reset = () => {
    setCenter(
        new Coordinate(21.005488531688606, 105.77911843674069)
    )
  };

  function _getList() {}

  return (
    <>
      <div className="card search-area">
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
                  <div className="col-xl-8 col-12 col-lg-12 col-sm-12">
                    <div className="row">
                      <div className="search-el col-xl-4 col-12 col-lg-4 col-sm-12">
                        <label className="form-label">
                          {t("same0106.label.zipCode")}
                        </label>
                        <input
                          value={modelSearch.zipCode}
                          className={`form-control`}
                          name="input"
                          placeholder={`${t("same0106.label.zipCode")}`}
                          onChange={handleChangeZipcode}
                          onKeyDown={handlePressEnter}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-4 col-12 col-lg-12 col-sm-12 area-btn-search">
                    <div className="area-btn-search">
                      <button
                        type="button"
                        className="btn btn-info btn-label rounded-pill btn-forth waves-effect waves-light"
                        onClick={search}
                      >
                        <i className="ri-search-2-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                        {t("sample.label.search")}
                      </button>
                      <button
                        type="button"
                        className="btn btn-light btn-label rounded-pill waves-effect waves-light"
                        onClick={reset}
                      >
                        <i className="ri-refresh-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                        {t("sample.label.reset")}
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
            <div className="title-head-body">
              <h2 className="mb-sm-0 card-title mb-0 flex-grow-1">
                Google Maps
              </h2>
            </div>
            <div className="button-head-body">
              {/* <button
          type="button"
          className="btn btn-primary btn-label rounded-pill waves-effect waves-light"
          onClick={hanldeAdd}
        >
          <i className="ri-file-add-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
          {t("sample.label.button.add")}
        </button> */}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <ReactGoogleMaps center={center}></ReactGoogleMaps>
          </div>
        </div>
      </div>
    </>
  );
}

function ReactGoogleMaps(props: any) {
  const containerStyle = {
    width: "1000px",
    height: "500px",
  };

  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    setTimeout(() => {
        setZoom(12)
    }, 400);
  }, [])

  const position = props.center;

  const center = props.center;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDRDUMc1XVevYt6WCGAkGhHVgtVVB-ejmU",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onLoadMarker = (marker: any) => {
    //console.log('marker: ', marker)
  };

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        {/* https://react-google-maps-api-docs.netlify.app/#marker */}
        <Marker
          label={"Hello world, I am here"}
          onLoad={onLoadMarker}
          position={position}
        />
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}
