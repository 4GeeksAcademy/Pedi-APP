import React from "react";

export const SingupCliente = () => {
    return(
        <form className="col-12 col-md-6 mb-3 mx-auto">
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Name</label>
                <input type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Last Name</label>
                <input type="lastName" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Phone</label>
                <input type="lastName" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Birthdate</label>
                <input type="lastName" className="form-control" id="exampleInputPassword1"/>
            </div>
            <p>Adress</p>
            <div className="row">
                <div className="mb-3">
                    <input type="lastName" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3">
                    <input type="lastName" className="form-control" id="exampleInputPassword1"/>
                </div>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" for="exampleCheck1">Phone</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}