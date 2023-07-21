import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/signupEmpresa.css";
import logoGrande from '../../img/Dishdash-blanco-grande.png';
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [banner_uploaded, setBanner_uploaded] = useState(false)

    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect( () =>{
        
        if (Object.keys(store.user) == 0){
            navigate('/signup', { replace: true });
        }
       

    }, []);

    const handleCheckboxChange = (fieldName) => {
        return (event) => {
          setFormData({ ...formData, [fieldName]: event.target.checked });
        };
      };

      const showToastAndNavigate = () => {
        return new Promise((resolve) => {
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Sign up successfully',
            //     showConfirmButton: false,
            //     timer: 1500
            //   })
          toast.success('Sign up successfully', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClose: resolve, // Resuelve la promesa cuando se cierra la notificación
          });
        });
      };
    

    const handleSignupCompanies = async (e) => {
        e.preventDefault()
        if (formData.nombre === "" || formData.cif === "" || formData.calleNumero === "" || formData.pisoPuerta === "" || formData.codigoPostal === "" || formData.ciudad === "" ||formData.estado === "" || !formData.img || categories.length == 0 ||!formData.banner) {
            toast.error('Check all the fields',  {position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
          }
          else if (formData.terminosCondiciones === false){
            toast.error("You have to agree to Terms and Conditions to be able to signup", {position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
          } else if (formData.mañana  ==false&& formData.tarde ==false ){
            toast.error('Choose opening times!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
          }
        else{
            const register = await actions.signupEmpresa(formData.nombre, formData.cif, formData.calleNumero, formData.pisoPuerta, formData.codigoPostal, formData.estado, formData.ciudad, formData.delivery, formData.reserva, formData.mañana, formData.tarde, formData.img,categories,formData.banner);
            if (register == true) {
                await showToastAndNavigate();
                navigate('/', { replace: true });
                
            }
            else {
                toast.error(register, {position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            }
    }};

    // the react post request sender
    const uploadFile = async (e,x) => {
        const file = e.target.files[0];
        if (file != null) {
            let data = new FormData();
            data.append('company_img', file);
            const img = await actions.img_uploadinator(data)
            if (x == 1){
                if (img.message == "exito"){
                        setFormData({...formData, img: img.img})
                        setImg_uploaded(true)
                } else {
                    img_uploaded == true? setImg_uploaded(false):
                    toast(img.message)
                }
            } else if (x==2){
                if (img.message == "exito"){
                    setFormData({...formData, banner: img.img})
                    setBanner_uploaded(true)
                } else {
                    img_uploaded == true? setImg_uploaded(false):
                    toast(img.message)
                } 
        }
            
        }
      };

    const category_addinator = (category) => {
        if (categories.includes(category)) {
          setCategories((current) => current.filter((x) => x !== category));
        } else {
          setCategories([...categories, category]);
        }
      };


    return(
        <>
            <div className="container-fluid text-center signupcompany_page_container p-5" onSubmit={(e) => handleSignupCompanies(e)}>
                <div className="row signupcompany_all">
                    <div className="col-sm-4 d-none d-sm-flex signupcompany_logo_container">
                        <img className="signupCompany_logo"src={logoGrande} alt="Logo de la empresa" />
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
                                <label htmlFor="cif" className="form-label signupcompany_label">Tax Code</label>
                                <input className="form-control" id="cif" placeholder="Tax code" value={formData.cif} onChange={(data) => {setFormData({...formData, cif: data.target.value})}} required/>
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
                                    <input type="lastName" className="form-control" id="exampleInputPassword1" placeholder="Floor, door" value={formData.pisoPuerta} onChange={(data) => {setFormData({...formData, pisoPuerta: data.target.value})}} />
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
                                <input className="form-control form-control" id="company_img" type="file" onChange={(e) => {uploadFile(e,1)}} required/>
                            </div>
                            {img_uploaded && (
                                <div className="row signupcompany_rowimg ">
                                    <div className="signupcompany_preview  my-3">
                                        <img src={formData.img} alt="..." className="signupcompany_img" />
                                    </div>
                                </div>)}
                            
                            <div>
                                <label htmlFor="company_banner" className="form-label">Upload an banner for your business page</label>
                                <input className="form-control form-control" id="company_banner" type="file" onChange={(e) => {uploadFile(e,2)}} required/>
                            </div>
                            {banner_uploaded && (
                                <div className="row signupcompany_rowimg ">
                                    <div className="signupcompany_preview  my-3"> 
                                        <img src={formData.banner} alt="..." className="signupcompany_img" />
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
                            <div className="row  w-75">
                                <ul className="list-group my-3">

                                {categories && ( categories.map((x,index) =>{
                                    
                                    
                        
                                        return <li key= {index} className="list-group-item d-flex"><p  className="my-auto"> {x}</p>  <button type="button" className="btn  ms-auto  favlist_delete" onClick={() => {category_addinator(x)}}><i className="fas fa-trash"></i></button></li>
                                }))}
                                    
                                </ul>
                            </div>
                            <div className="btn-group my-3">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                    Select categories
                                </button>
                                <ul className="dropdown-menu scrollable-menu categories_dropdown" role="menu" >
                                    {store.categories? store.categories.map((x, index) =>{
                                        
                                        return <li key={index}> <p className="dropdown-item" onClick={() => { category_addinator(x)}}>{x}</p>  </li>
                                    }) : ""}
                                    
                                </ul>
                            </div>
                            <div className="mb-3 form-check mt-3">
                                <input type="checkbox" className="form-check-input inputBox" id="exampleCheck4" checked={formData.terminosCondiciones} onChange={handleCheckboxChange('terminosCondiciones')}/>
                                <label className="form-check-label" htmlFor="exampleCheck1">I agree the <b>Terms and Conditions</b></label>
                            </div>
                            
                            <button type="submit" className="btn col-12 mb-2 signupcompany_submit">Sign up</button>
                            <ToastContainer />
                        </form>
                    </div>
                </div>
            </div>  
        </>
    )
}
