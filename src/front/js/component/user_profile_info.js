import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/user_info.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User_profile_info = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nacimiento: "",
    sexo: "",
    telefono: ""
  });

  const showToastAndNavigate = () => {
    return new Promise((resolve) => {
      toast.success('Data added successfully', {         
        autoClose: 1000,
        onClose: resolve, // Resuelve la promesa cuando se cierra la notificación
      });
    });
  };

  const handleaddInfoCliente = async (e) => {
    e.preventDefault();
    if(formData.telefono && formData.nacimiento && formData.sexo){
      actions.addInfoCliente(
        formData.telefono,
        formData.nacimiento,
        formData.sexo,
      );
      await showToastAndNavigate();
      navigate('/userProfile/info', {replace: true}) 
    }
    else {
        toast.error('Missing data');
      }
    }


  return (
    <div className="container-fluid container-user-profile-info">
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
      <h1 className="title_acount_user">Account info</h1>
      <div className="category_container_user">
        <div className="info_title_user">
          <h5 className="ms-3 text-info-user">Name</h5>
        </div>
        <div className="container_user my-3 ">
          <p className="box_text_user">{store.current_user_data.nombre}</p>
        </div>
      </div>
      <div className="category_container_user">
        <div className="info_title_user">
          <h5 className="ms-3 text-info-user">Email</h5>
        </div>
        <div className="container_user my-3 ">
          <p className="box_text_user ">{store.current_user_data.email}</p>
        </div>
      </div>
      <div className="category_container_user">
        <div className="info_title_user">
          <h5 className="ms-3 text-info-user">Address</h5>
        </div>
        <div className="container_user my-3 ">
          <p className="box_text_user">{store.current_user_data.direccion}</p>
        </div>
      </div>
      {!store.current_user_data.nacimiento || !store.current_user_data.sexo ? (
        <form onSubmit={(e) => handleaddInfoCliente(e)}>
            <div className="row">
                <div className="col-12 col-md-12 col-sm-12 mb-3">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label signupCliente_label"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    pattern="[0-9]{9}"
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
            </div>
            <div className="col-12 col-md-6 col-sm-6 mb-3">
                <label
                htmlFor="exampleInputPassword1"
                className="form-label signupCliente_label"
                >
                Birthdate
                </label>
                <input
                type="date"
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
            <div className="col-12 col-md-6 col-sm-6 mb-3">
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
                <option>Select</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                </select>
            </div>
            <button type="submit" className="btn col-12 mb-2 signupcompany_submit">Add info</button>
            </form>
      ) : (
        <>
            <div className="category_container_user">
              <div className="info_title_user">
                  <h5 className="ms-3 text-info-user">Phone</h5>
              </div>
              <div className="container_user my-3 ">
                  <p className="box_text_user">{store.current_user_data.telefono}</p>
              </div>
            </div>
            <div className="category_container_user">
              <div className="info_title_user">
                <h5 className="ms-3 text-info-user">Sex</h5>
              </div>
              <div className="container_user my-3 ">
                <p className="box_text_user">{store.current_user_data.sexo}</p>
              </div>
            </div>
            <div className="category_container_user">
              <div className="info_title_user">
                <h5 className="ms-3 text-info-user">Birthdate</h5>
              </div>
              <div className="container_user my-3 ">
                <p className="box_text_user">{store.current_user_data.nacimiento}</p>
              </div>
            </div>
        </>
      )}
    </div>
  );
};

export default User_profile_info;