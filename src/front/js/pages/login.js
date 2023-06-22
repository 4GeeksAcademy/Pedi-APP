import React from "react";

const Login = () => {

    return (
        <>
            <div className="container-fluid text-center mt-5 login_page_container p-5">
                <div className="row login_all">
                    <div className="col-4 d-flex login_logo_container">
                        <p className="login_logo border">dishdash</p>
                    </div>
                    <div className="col-8 login_form_container p-5">
                        <h1 className="login_title">Login</h1>
                        <p>Welcome back! Please login to your account</p>

                        <form>
                            <div className="mb-3">
                                <label htmlFor="mail" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="mail" aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password"/>
                            </div>
                            <button type="submit" className="btn btn-primary login_submit">Login</button>
                            
                        </form>


                    </div>
                </div>
            </div>  

        </>

    )

}

export default Login