import React from 'react'

export default function NotFound() {
    return (
        <>
            <div className="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100">

                <div className="auth-page-content overflow-hidden p-0">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-7 col-lg-8">
                                <div className="text-center">
                                    <img src="assets/images/error400-cover.png" alt="error img" className="img-fluid"></img>
                                        <div className="mt-3">
                                            <h3 className="text-uppercase">Sorry, Page not Found 😭</h3>
                                            <p className="text-muted mb-4">The page you are looking for not available!</p>
                                            <a href="/" className="btn btn-success"><i className="mdi mdi-home me-1"></i>Back to dashboard</a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
