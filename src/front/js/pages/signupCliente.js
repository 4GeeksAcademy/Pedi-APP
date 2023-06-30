import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/signupCliente.css";
import { useNavigate } from "react-router-dom";

export const SingupCliente = () => {
  const { store, actions } = useContext(Context);
  const [formComplete, setFormComplete] = useState(false);
  const navigate = useNavigate()

  const handleSignupCliente = (e) => {
    e.preventDefault();
    // actions.signupCliente(formData.nombre, formData.apellido, formData.telefono, formData.nacimiento, formData.sexo, formData.calleNumero, formData.pisoPuerta, formData.instrucciones, formData.codigoPostal, formData.estado, formData.ciudad, formData.terminosCondiciones)
    if (
      formData.nombre &&
      formData.apellido &&
      formData.telefono &&
      formData.nacimiento &&
      formData.sexo &&
      formData.calleNumero &&
      formData.pisoPuerta &&
      formData.codigoPostal &&
      formData.estado &&
      formData.ciudad &&
      formData.terminosCondiciones
    ) {
      actions.signupCliente(
        formData.nombre,
        formData.apellido,
        formData.telefono,
        formData.nacimiento,
        formData.sexo,
        formData.calleNumero,
        formData.pisoPuerta,
        formData.instrucciones,
        formData.codigoPostal,
        formData.estado,
        formData.ciudad,
        formData.terminosCondiciones
      );
      setFormComplete(true);
      navigate('/');
    } else {
      console.log("Por favor, complete todos los campos requeridos.");
    }
  };

  const handleCheckboxChange = (event) => {
    setFormData({ ...formData, terminosCondiciones: event.target.checked });
  };

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <div className="container-fluid text-center signupCliente_page_container p-5 ">
        <div className="row signupCliente_all">
          <div className="col-sm-4  d-none d-sm-flex signupCliente_logo_container">
            <p className="signupCliente_logo border">dishdash</p>
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
                  Name
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
              <div className="mb-3">
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
              </div>
              <div className="row">
                <div className="col-12 col-sm-5 mb-3">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label signupCliente_label"
                  >
                    Phone
                  </label>
                  <input
                    type="lastName"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Phone"
                    value={formData.telefono}
                    onChange={(data) => {
                      setFormData({ ...formData, telefono: data.target.value });
                    }}
                    required
                  />
                </div>
                <div className="col-12 col-sm-5 mb-3">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label signupCliente_label"
                  >
                    Birthdate
                  </label>
                  <input
                    type="lastName"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Birth Date"
                    value={formData.nacimiento}
                    onChange={(data) => {
                      setFormData({
                        ...formData,
                        nacimiento: data.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="col-12 col-sm-5 mb-3">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label signupCliente_label"
                  >
                    Sex
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={formData.sexo}
                    onChange={(data) => {
                      setFormData({ ...formData, sexo: data.target.value });
                    }}
                  >
                    <option selected>Select</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
              </div>
              <p className="signupCliente_label">Adress</p>
              <div className="row">
                <div className="col-12 col-sm-5 mb-3">
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
                <div className="col-12 col-sm-5 mb-3">
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
                <div className="col-12 col-sm-5 mb-3">
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
                <div className="col-12 col-sm-5 mb-3">
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
                <div className="col-12 col-sm-5 mb-3">
                  <input
                    type="lastName"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="State"
                    value={formData.estado}
                    onChange={(data) => {
                      setFormData({ ...formData, estado: data.target.value });
                      console.log(formData);
                    }}
                    required
                  />
                </div>
                <div className="col-12 col-sm-5 mb-3">
                  <input
                    type="lastName"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="City"
                    value={formData.ciudad}
                    onChange={(data) => {
                      setFormData({ ...formData, ciudad: data.target.value });
                      console.log(formData);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
