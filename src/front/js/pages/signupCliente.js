import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "/workspaces/Pedi-APP/src/front/styles/signupCliente.css";

export const SingupCliente = () => {
    const { store, actions } = useContext(Context);
    const handleSignupCliente = (e) => {
        e.preventDefault()
        actions.signupCliente(formData.nombre, formData.apellido, formData.telefono, formData.nacimiento, formData.sexo, formData.calleNumero, formData.pisoPuerta, formData.instrucciones, formData.codigoPostal, formData.estado, formData.ciudad, formData.terminosCondiciones)
    };

    const handleCheckboxChange = (event) => {
        setFormData({ ...formData, terminosCondiciones: event.target.checked });
      };


    const [formData, setFormData] = useState({
        nombre:"",
        apellido:"",
        telefono:"",
        nacimiento:"",
        sexo:"",
        calleNumero:"",
        pisoPuerta:"",
        instrucciones:"",
        codigoPostal:"",
        estado:"",
        ciudad:"",
        terminosCondiciones: false
    })
    

    useEffect(() => {
         console.log(formData);
     }, [formData]);

    return(
        <>
            <div className="container-fluid text-center mt-5 login_page_container p-5 ">
                <div className="row all ">
                    <div className="col-4 d-flex login_logo_container">
                        <p className="login_logo border">dishdash</p>
                </div>

                <div className="col-8 login_form_container ">
                    <h1 className="login_title">Signup Cliente</h1>
                    <p className="login_subtitle">Welcome! Please sign up</p>

                    <form className="col-12 col-md-12 mb-3 mx-auto" onSubmit={(e) => handleSignupCliente(e)}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label login_label">Name</label>
                            <input type="nombre" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name" value={formData.nombre} onChange={(data) => {setFormData({...formData, nombre: data.target.value})}} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label login_label">Last Name</label>
                            <input type="apellido" className="form-control" id="exampleInputPassword1" placeholder="Last Name" value={formData.apellido} onChange={(data) => {setFormData({...formData, apellido: data.target.value})}} required/>
                        </div>
                        <div className="row">
                            <div className="col-5 mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label login_label">Phone</label>
                                <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Phone" value={formData.telefono} onChange={(data) => {setFormData({...formData, telefono: data.target.value})}} required/>
                            </div>
                            <div className="col-4 mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label login_label">Birthdate</label>
                                <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Birth Date" value={formData.nacimiento} onChange={(data) => {setFormData({...formData, nacimiento: data.target.value})}} required/>
                            </div>
                            <div className="col-3 mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label login_label">Sex</label>
                                <select className="form-select" aria-label="Default select example" value={formData.sexo} onChange={(data) => {setFormData({...formData, sexo: data.target.value})}}>
                                    <option selected>Select</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                            </div>
                        </div>
                        <p className="login_label">Adress</p>
                        <div className="row">
                            <div className="col-7 mb-3">
                                <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Street and number" value={formData.calleNumero} onChange={(data) => {setFormData({...formData, calleNumero: data.target.value})}} required/>
                            </div>
                            <div className="col-5 mb-3">
                                <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Floor, door" value={formData.pisoPuerta} onChange={(data) => {setFormData({...formData, pisoPuerta: data.target.value})}} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-7 mb-3">
                                <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Delivery instruccions" value={formData.instrucciones } onChange={(data) => {setFormData({...formData, instrucciones: data.target.value})}}/>
                            </div>
                            <div className="col-5 mb-3">
                                <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Postal Code" value={formData.codigoPostal} onChange={(data) => {setFormData({...formData, codigoPostal: data.target.value})}} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 mb-3">
                                <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="State" value={formData.estado} onChange={(data) => {setFormData({...formData, estado: data.target.value}); console.log(formData)}} required/>
                            </div>
                            <div className="col-6 mb-3">
                                <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="City" value={formData.ciudad} onChange={(data) => {setFormData({...formData, ciudad: data.target.value}); console.log(formData)}} required/>
                            </div>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={formData.terminosCondiciones} onChange={handleCheckboxChange}/>
                            <label className="form-check-label" htmlFor="exampleCheck1">I agree the <b>Terms and Conditions</b></label>
                        </div>
                        <button type="submit" className="btn btn-danger col-12 mb-2 login_submit"><Link to="/">Sign up</Link></button>
                    </form>
                </div>
            </div>
        </div>  
    </>
    )
}

