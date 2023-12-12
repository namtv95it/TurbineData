import React from 'react'

export default function NotPermission() {
  return (
    <>
      <div className="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100">

        <div className="auth-page-content overflow-hidden p-0">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-xl-4 text-center">
                <div className="error-500 position-relative">
                  <img src="assets/images/error500.png" alt="" className="img-fluid error-500-img error-img" />
                  <h1 className="title text-muted">403</h1>
                </div>
                <div>
                  <h4>Error!</h4>
                  <p className="text-muted w-75 mx-auto">You're not permission.</p>
                  <a href="/" className="btn btn-success"><i className="mdi mdi-home me-1"></i>Back to dashboard</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
