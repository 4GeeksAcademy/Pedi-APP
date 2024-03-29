import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/signupCliente.css";
import { useNavigate } from "react-router-dom";
import logoGrande from '../../img/Dishdash-blanco-grande.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SingupCliente = () => {
  const { store, actions } = useContext(Context);
  const [formComplete, setFormComplete] = useState(false);
  const navigate = useNavigate()

  useEffect( () =>{
    
    if (Object.keys(store.user) == 0){
        navigate('/signup', { replace: true });
    }
   

}, []);

const showToastAndNavigate = () => {
  return new Promise((resolve) => {
    toast.success('Sign up successfully', {         
      autoClose: 1000,
      onClose: resolve, // Resuelve la promesa cuando se cierra la notificación
    });
  });
};

  const handleSignupCliente = async (e) => {
    e.preventDefault();
    // actions.signupCliente(formData.nombre, formData.apellido, formData.telefono, formData.nacimiento, formData.sexo, formData.calleNumero, formData.pisoPuerta, formData.instrucciones, formData.codigoPostal, formData.estado, formData.ciudad, formData.terminosCondiciones)
    if (formData.terminosCondiciones === false){
        toast.error('You have to agree to Terms and Conditions to be able to signup');
    }
    else {
      const register = await actions.signupCliente(
        formData.nombre,
        // formData.apellido,
        formData.telefono,
        formData.nacimiento,
        formData.sexo,
        formData.calleNumero,
        formData.pisoPuerta,
        formData.instrucciones,
        formData.codigoPostal,
        formData.estado,
        formData.ciudad
      );
      if (register == true){
        setFormComplete(true)
        await showToastAndNavigate();
        navigate('/', {replace: true})
        
      }
      else {
          toast.error(register);
      }
    }
  };

  const handleCheckboxChange = (event) => {
    setFormData({ ...formData, terminosCondiciones: event.target.checked });
  };

  const [formData, setFormData] = useState({
    nombre: "",
    // apellido: "",
    telefono: "",
    nacimiento: "",
    sexo: "",
    calleNumero: "",
    pisoPuerta: "",
    instrucciones: "",
    codigoPostal: "",
    estado: "",
    ciudad: "",
    terminosCondiciones: false,
  });

 
  

  return (
    <>
      <div className="container-fluid text-center signupCliente_page_container p-5 ">
        <div className="row signupCliente_all">
          <div className="col-sm-4  d-none d-sm-flex signupCliente_logo_container">
            <img className="signupCliente_logo"src={logoGrande} alt="Logo de la empresa" />
          </div>

          <div className="col-sm-8 col-12 signupCliente_form_container ">
            <h1 className="signupCliente_title">Signup Cliente</h1>
            <p className="signupCliente_subtitle">Welcome! Please sign up</p>

            <form
              className="col-12 col-md-12 mb-3 mx-auto"
              onSubmit={(e) => handleSignupCliente(e)}
            >
              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label signupCliente_label"
                >
                  Full Name
                </label>
                <input
                  type="nombre"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Name"
                  value={formData.nombre}
                  onChange={(data) => {
                    setFormData({ ...formData, nombre: data.target.value });
                  }}
                  required
                />
              </div>
              {/* <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label signupCliente_label"
                >
                  Last Name
                </label>
                <input
                  type="apellido"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Last Name"
                  value={formData.apellido}
                  onChange={(data) => {
                    setFormData({ ...formData, apellido: data.target.value });
                  }}
                  required
                />
              </div> */}
              <p className="signupCliente_label">Adress</p>
              <div className="row">
                <div className="col-12 col-sm-6 mb-3">
                  <input
                    type="lastName"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Street and number"
                    value={formData.calleNumero}
                    onChange={(data) => {
                      setFormData({
                        ...formData,
                        calleNumero: data.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="col-12 col-sm-6 mb-3">
                  <input
                    type="lastName"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Floor, door"
                    value={formData.pisoPuerta}
                    onChange={(data) => {
                      setFormData({
                        ...formData,
                        pisoPuerta: data.target.value,
                      });
                    }}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-6 mb-3">
                  <input
                    type="lastName"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Delivery instruccions"
                    value={formData.instrucciones}
                    onChange={(data) => {
                      setFormData({
                        ...formData,
                        instrucciones: data.target.value,
                      });
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 mb-3">
                  <input
                    type="lastName"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Postal Code"
                    value={formData.codigoPostal}
                    onChange={(data) => {
                      setFormData({
                        ...formData,
                        codigoPostal: data.target.value,
                      });
                    }}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-6 mb-3">
                  <input
                    type="lastName"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="State"
                    value={formData.estado}
                    onChange={(data) => {
                      setFormData({ ...formData, estado: data.target.value });
                      
                    }}
                    required
                  />
                </div>
                <div className="col-12 col-sm-6 mb-3">
                  <input
                    type="lastName"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="City"
                    value={formData.ciudad}
                    onChange={(data) => {
                      setFormData({ ...formData, ciudad: data.target.value });
                      
                    }}
                    required
                  />
                </div>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input checkBox"
                  id="exampleCheck1"
                  checked={formData.terminosCondiciones}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  I agree the <b>Terms and Conditions</b>
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-danger col-12 mb-2 signupCliente_submit"
              >
                Sign up
              </button>
              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                progress={undefined}
                theme="colored"
                />              
              </form>
          </div>
        </div>
      </div>
    </>
  );
};
