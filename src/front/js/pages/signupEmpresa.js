import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "/workspaces/Pedi-APP/src/front/styles/signupCliente.css";
import "../../styles/signupEmpresa.css";

export const SingupEmpresa = () => {
    const { store, actions } = useContext(Context);
    const [formComplete, setFormComplete] = useState(false);
    const handleSignupCompanies = (e) => {
        e.preventDefault()
        if (formData.nombre && formData.cif && formData.delivery && formData.calleNumero && formData.pisoPuerta && formData.codigoPostal && formData.estado && formData.ciudad && formData.terminosCondiciones) {
            actions.signupCliente(formData.nombre, formData.cif, formData.delivery, formData.calleNumero, formData.pisoPuerta, formData.codigoPostal, formData.estado, formData.ciudad, formData.terminosCondiciones);
            setFormComplete(true);
        } else {
            console.log("Por favor, complete todos los campos requeridos.");}
    };

    const handleCheckboxChange = (fieldName) => {
        return (event) => {
          setFormData({ ...formData, [fieldName]: event.target.checked });
        };
      };

    const [formData, setFormData] = useState({
        nombre: "",
        cif: "",
        delivery: false,
        reserva: false,
        mañana: false,
        tarde:false,
        calleNumero:"",
        pisoPuerta:"",
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
            <div className="container-fluid text-center mt-5 signupcompany_page_container p-5 ">
                <div className="row all ">
                    <div className="col-4 d-flex signupcompany_logo_container">
                        <p className="signupcompany_logo border">dishdash</p>
                </div>
                <div className="col-8 signupcompany_form_container ">
                    <h1 className="signupcompany_title">Signup Company</h1>
                    <p className="signupcompany_subtitle">Welcome! Please sign up</p>
                    <form className="col-12 col-md-12 mb-3 mx-auto" onSubmit={(e) => handleSignupCompanies(e)}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label signupcompany_label">Name</label>
                            <input type="nombre" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name" value={formData.nombre} onChange={(data) => {setFormData({...formData, nombre: data.target.value})}} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label signupcompany_label">CIF</label>
                            <input type="apellido" className="form-control" id="exampleInputPassword1" placeholder="CIF" value={formData.cif} onChange={(data) => {setFormData({...formData, cif: data.target.value})}} required/>
                        </div>
                        <p className="signupcompany_label">Adress</p>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Street and number" value={formData.calleNumero} onChange={(data) => {setFormData({...formData, calleNumero: data.target.value})}} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 mb-3">
                                <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Postal Code" value={formData.codigoPostal} onChange={(data) => {setFormData({...formData, codigoPostal: data.target.value})}} required/>
                            </div>
                            <div className="col-6 mb-3">
                                <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Floor, door" value={formData.pisoPuerta} onChange={(data) => {setFormData({...formData, pisoPuerta: data.target.value})}} required/>
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
                        <p>Are you doing?</p>
                        <div className="form-check form-check-inline ms-4 me-5">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" checked={formData.delivery} onChange={handleCheckboxChange('delivery')}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox1">Delivery</label>
                        </div>
                        <div className="form-check form-check-inline ms-5">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" checked={formData.reserva} onChange={handleCheckboxChange('reserva')}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox2">Reservation</label>
                        </div>
                        <p className="mt-2">Choose your opening times:</p>
                        <div className="form-check form-check-inline ms-4 me-5">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option1" checked={formData.mañana} onChange={handleCheckboxChange('mañana')}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox3">Morning</label>
                        </div>
                        <div className="form-check form-check-inline ms-5">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="option2"checked={formData.tarde} onChange={handleCheckboxChange('tarde')} />
                            <label className="form-check-label" htmlFor="inlineCheckbox4">Afternoon</label>
                        </div>
                        <div className="mb-3 form-check mt-3">
                            <input type="checkbox" className="form-check-input" id="exampleCheck4" checked={formData.terminosCondiciones} onChange={handleCheckboxChange('terminosCondiciones')}/>
                            <label className="form-check-label" htmlFor="exampleCheck1">I agree the <b>Terms and Conditions</b></label>
                        </div>
                        <button type="submit" className="btn btn-danger col-12 mb-2 login_submit">
                            {formComplete ? (
                                <Link to="/">Sign up</Link> 
                            ) : (
                                <span>Sign up</span>)}
                        </button>
                    </form>
                </div>
            </div>
        </div>  
    </>
    )
}

