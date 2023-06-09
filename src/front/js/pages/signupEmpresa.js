import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/signupEmpresa.css";
import Swal from "sweetalert2";

export const SingupEmpresa = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        calleNumero:"",
        pisoPuerta:"",
        codigoPostal:"",
        ciudad:"",
        estado:"",
        nombre: "",
        cif: "",
        reserva: false,
        delivery: false,
        mañana: false,
        tarde:false,
        terminosCondiciones: false
        // lunes: {
        //     mañana: false,
        //     tarde:false,
        // },
        // martes: {
        //     mañana: false,
        //     tarde:false,
        // },
        // miercoles: {
        //     mañana: false,
        //     tarde:false,
        // },
        // jueves: {
        //     mañana: false,
        //     tarde:false,
        // },
        // viernes: {
        //     mañana: false,
        //     tarde:false,
        // }, 
        // sabado: {
        //     mañana: false,
        //     tarde:false,
        // },
        // domingo: {
        //     mañana: false,
        //     tarde:false,
        // },
    })

    //   const handleCheckboxChange = (time, day) => {
    //     return (event) => {
    //       setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [day]: {
    //           ...prevFormData[day],
    //           [time]: event.target.checked
    //         }
    //       }));
    //     };
    //   };
    const [img_uploaded, setImg_uploaded] = useState(false)

    const handleCheckboxChange = (fieldName) => {
        return (event) => {
          setFormData({ ...formData, [fieldName]: event.target.checked });
        };
      };

    const navigate = useNavigate()

    const handleSignupCompanies = async (e) => {
        e.preventDefault()
        
        if (formData.nombre === "" && formData.cif === "" && formData.calleNumero === "" && formData.pisoPuerta === "" && formData.codigoPostal === "" && formData.ciudad === "" && formData.estado === "" && formData.img) {
            return  Swal.fire("Check all the fields");
          }
          else if (formData.terminosCondiciones === false){
            return Swal.fire("You have to agree to Terms and Conditions to be able to signup")
          }
        else{
            const register = await actions.signupEmpresa(formData.nombre, formData.cif, formData.calleNumero, formData.pisoPuerta, formData.codigoPostal, formData.estado, formData.ciudad, formData.delivery, formData.reserva, formData.mañana, formData.tarde, formData.img);
            if (register == true) {
                    navigate('/', { replace: true });
            }
            else {
                 if (register == false) {
                    return Swal.fire ("Address not found try again")}}
    }};

    // the react post request sender
    const uploadFile = async (e) => {
        const file = e.target.files[0];
        if (file != null) {
            let data = new FormData();
            data.append('company_img', file);
            const img = await actions.img_uploadinator(data)
            
            if (img.message == "Max image size is 10MB"){ 
                Swal.fire(img.message)
                img_uploaded == true? setImg_uploaded(false):""
            } else if (img.message == "exito"){
                setImg_uploaded(true)
                setFormData({...formData, img: img.img})
            } else {
                img_uploaded == true? setImg_uploaded(false):
                Swal.fire(img.message)
            }
        }
      };

    

    return(
        <>
            <div className="container-fluid text-center signupcompany_page_container p-5" onSubmit={(e) => handleSignupCompanies(e)}>
                <div className="row signupcompany_all">
                    <div className="col-sm-4 d-none d-sm-flex signupcompany_logo_container">

                        <p className="signupcompany_logo border">dishdash</p>
                </div>
                <div className="col-sm-8 col-12 signupcompany_form_container ">
                    <h1 className="signupcompany_title">Signup Company</h1>
                    <p className="signupcompany_subtitle">Welcome! Please sign up</p>
                    <form className="col-12 col-md-12 mb-3 mx-auto">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label signupcompany_label">Name</label>
                            <input className="form-control" id="name" aria-describedby="emailHelp" placeholder="Name" value={formData.nombre} onChange={(data) => {setFormData({...formData, nombre: data.target.value})}} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cif" className="form-label signupcompany_label">CIF</label>
                            <input className="form-control" id="cif" placeholder="CIF" value={formData.cif} onChange={(data) => {setFormData({...formData, cif: data.target.value})}} required/>
                        </div>
                        <p className="signupcompany_label">Adress</p>
                        <div className="row">

                            <div className="col-12 col-sm-12 mb-3">
                                <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Street and number" value={formData.calleNumero} onChange={(data) => {setFormData({...formData, calleNumero: data.target.value})}} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-6 mb-3">
                                <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Postal Code" value={formData.codigoPostal} onChange={(data) => {setFormData({...formData, codigoPostal: data.target.value})}} required/>
                            </div>
                            <div className="col-12 col-sm-6 mb-3">
                                <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Floor, door" value={formData.pisoPuerta} onChange={(data) => {setFormData({...formData, pisoPuerta: data.target.value})}} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 mb-3">
                                <input type="lastName" className="form-control" id="city" placeholder="City" value={formData.ciudad} onChange={(data) => {setFormData({...formData, ciudad: data.target.value})}} required/>
                            </div>
                            <div className="col-6 mb-3">
                                <input className="form-control" id="state" placeholder="State" value={formData.estado} onChange={(data) => {setFormData({...formData, estado: data.target.value}) }} required/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="company_img" className="form-label">Upload an image for your business</label>
                            <input className="form-control form-control" id="company_img" type="file" onChange={(e) => {uploadFile(e)}} required/>
                        </div>
                        {img_uploaded && (
                            <div className="row signupcompany_rowimg ">
                                <div className="signupcompany_preview  my-3">
                                    <img src={formData.img} alt="..." className="signupcompany_img" />
                                </div>
                            </div>)}
                        <p>Are you doing?</p>
                        <div className="form-check form-check-inline ms-4 me-5">
                            <input className="form-check-input inputBox" type="checkbox" id="inlineCheckbox1" value="option1" checked={formData.delivery} onChange={handleCheckboxChange('delivery')}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox1">Delivery</label>
                        </div>
                        <div className="form-check form-check-inline ms-5">
                            <input className="form-check-input inputBox" type="checkbox" id="inlineCheckbox2" value="option2" checked={formData.reserva} onChange={handleCheckboxChange('reserva')}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox2">Reservation</label>
                        </div>
                        <p className="mt-2">Choose your opening times:</p>
                        <div className="form-check form-check-inline ms-4 me-5">
                            <input className="form-check-input inputBox" type="checkbox" id="inlineCheckbox3" value="option1" checked={formData.mañana} onChange={handleCheckboxChange('mañana')}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox3">Morning</label>
                        </div>
                        <div className="form-check form-check-inline ms-5">
                            <input className="form-check-input inputBox" type="checkbox" id="inlineCheckbox4" value="option2"checked={formData.tarde} onChange={handleCheckboxChange('tarde')} />
                            <label className="form-check-label" htmlFor="inlineCheckbox4">Afternoon</label>
                        </div>
                        {/* <div className="row">
                            <p className="col-12 col-md-3 ms-5">Monday</p>
                            <div className="col-12 col-md-2 form-check">
                                <input className="form-check-input" type="checkbox" id="mondayMorning" value="option1" checked={formData.lunes.mañana} onChange={handleCheckboxChange('mañana', 'lunes')}/>
                                <label className="form-check-label" htmlFor="monday">Morning</label>
                            </div>
                            <div className="col-12 col-md-2 form-check ms-3">
                                <input className="form-check-input" type="checkbox" id="mondayAfternoon" value="option2"checked={formData.lunes.tarde} onChange={handleCheckboxChange('tarde', 'lunes')} />
                                <label className="form-check-label" htmlFor="monday">Afternoon</label>
                            </div> */}
                        <div className="mb-3 form-check mt-3">
                            <input type="checkbox" className="form-check-input inputBox" id="exampleCheck4" checked={formData.terminosCondiciones} onChange={handleCheckboxChange('terminosCondiciones')}/>
                            <label className="form-check-label" htmlFor="exampleCheck1">I agree the <b>Terms and Conditions</b></label>
                        </div>
                        <button type="submit" className="btn col-12 mb-2 signupcompany_submit">Sign up</button>
                    </form>
                </div>
            </div>
        </div>  
    </>
    )
}
