import React, { useContext, useEffect, useState, useRef } from "react";
import "../../styles/addProduct.css";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddProduct = () => {
    const {actions} = useContext(Context)
    const [form, setForm] = useState(false);
    const [img_uploaded, setImg_uploaded] = useState(false)

    const fileInputRef = useRef(null);

    const hadnleAddProduct = async(e) => {
        e.preventDefault();
        if(formData.nombre && formData.precio){
            actions.addProduct(
                formData.nombre, formData.precio, formData.descripcion, formData.img
            );
            toast.success('Product add successfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            setForm(true);
            // Limpia el formulario y lo cargado en setFormData
            setFormData({
              nombre: "",
              precio: "",
              descripcion: "",
              img: ""
            });
            // Restablece el campo de carga de imágenes
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
        } else{
            toast.error('Please, fill in all require data', {
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
    }

    const [formData, setFormData] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
        img: ""
    })

    

        const uploadFile = async (e) => {
            const file = e.target.files[0];
            if (file != null) {
                let data = new FormData();
                data.append('company_img', file);
                const img = await actions.img_uploadinator(data)
                
                if (img.message == "Max image size is 10MB"){ 
                    toast.error(img.message, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                    img_uploaded == true? setImg_uploaded(false):""
                } else if (img.message == "exito"){
                    setImg_uploaded(true)
                    setFormData({...formData, img: img.img})
                } else {
                    img_uploaded == true? setImg_uploaded(false):
                    toast.error(img.message, {
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
            }
          };

    return(
        <div className="container rounded add-product-container">
            <form className="card card-add-product" onSubmit={(e) => hadnleAddProduct(e)}>
                <div className="mb-3 add-product-text mt-5">
                    <label htmlFor="productName" className="form-label add-product-label">Product Name</label>
                    <input type="text" className="form-control" id="productName" placeholder="Product Name" value={formData.nombre} onChange={(data) => setFormData({...formData, nombre: data.target.value})} required/>
                </div>
                <div className="mb-3 add-product-text">
                    <label htmlFor="price" className="form-label add-product-label">Price</label>
                    <input type="number" className="form-control" id="price" placeholder="XXXXX $" value={formData.precio} onChange={(data)=> setFormData({...formData, precio: data.target.value})} required/>
                </div>
                <div className="mb-3 add-product-text">
                    <label htmlFor="description" className="form-label add-product-label">Description</label>
                    <textarea className="form-control" id="description" rows="3" value={formData.descripcion} onChange={(data)=> setFormData({...formData, descripcion: data.target.value})}></textarea>
                </div>
                <div className="mb-3 add-product-upload">
                    <label htmlFor="formFile" className="form-label">Upload image</label>
                    <input className="form-control" type="file" id="formFile" ref={fileInputRef} onChange={(e) => {uploadFile(e)}}/>
                </div>
                <button type="submit" className="btn add-product-btn">Submit</button>
                <ToastContainer />
            </form>
        </div>
    )
}