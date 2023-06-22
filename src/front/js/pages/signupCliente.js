import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const SingupCliente = () => {
    const { store, actions } = useContext(Context);
    const handleSignupCliente = (e) => {
        e.preventDefault()
        actions.signupCliente(formData.nombre, formData.apellido, formData.telefono, formData.nacimiento, formData.sexo, formData.calleNumero, formData.pisoPuerta, formData.instrucciones, formData.codigoPostal, formData.estado, formData.ciudad)
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
    })
    
    

    useEffect(() => {
         console.log(formData);
     }, [formData]);

    return(
        <form className="col-12 col-md-6 mb-3 mx-auto" onSubmit={(e) => handleSignupCliente(e)}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="nombre" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name" value={formData.nombre} onChange={(data) => {setFormData({...formData, nombre: data.target.value})}} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Last Name</label>
                <input type="apellido" className="form-control" id="exampleInputPassword1" placeholder="Last Name" value={formData.apellido} onChange={(data) => {setFormData({...formData, apellido: data.target.value})}} required/>
            </div>
            <div className="row">
                <div className="col-5 mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
                    <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Phone" value={formData.telefono} onChange={(data) => {setFormData({...formData, telefono: data.target.value})}} required/>
                </div>
                <div className="col-4 mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Birthdate</label>
                    <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Birth Date" value={formData.nacimiento} onChange={(data) => {setFormData({...formData, nacimiento: data.target.value})}} required/>
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Sex</label>
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Select</option>
                        <option value="1">Female</option>
                        <option value="2">Male</option>
                    </select>
                </div>
            </div>
            <p>Adress</p>
            <div className="row">
                <div className="col-7 mb-3">
                    <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Street and number" value={formData.calleNumero} onChange={(data) => {setFormData({...formData, calleNumero: data.target.value}); console.log(formData)}}/>
                </div>
                <div className="col-5 mb-3">
                    <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Floor, door" value={formData.pisoPuerta} onChange={(data) => {setFormData({...formData, pisoPuerta: data.target.value}); console.log(formData)}}/>
                </div>
            </div>
            <div className="row">
                <div className="col-7 mb-3">
                    <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Delivery instruccions" value={formData.instrucciones } onChange={(data) => {setFormData({...formData, instrucciones: data.target.value}); console.log(formData)}}/>
                </div>
                <div className="col-5 mb-3">
                    <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Postal Code" value={formData.codigoPostal} onChange={(data) => {setFormData({...formData, codigoPostal: data.target.value}); console.log(formData)}}/>
                </div>
            </div>
            <div className="row">
                <div className="col-6 mb-3">
                    <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="State" value={formData.estado} onChange={(data) => {setFormData({...formData, estado: data.target.value}); console.log(formData)}}/>
                </div>
                <div className="col-6 mb-3">
                    <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="City" value={formData.ciudad} onChange={(data) => {setFormData({...formData, ciudad: data.target.value}); console.log(formData)}}/>
                </div>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">I agree the <b>Terms and Conditions</b></label>
            </div>
            <button type="submit" className="btn btn-danger col-12 mb-2">Sign up</button>
            <button type="submit" className="btn btn-light col-12">Sign up with Google</button>


        </form>
    )
}

