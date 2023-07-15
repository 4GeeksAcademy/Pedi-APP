import React, { useContext, useEffect, useState, useRef } from "react";
import "../../styles/addProduct.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const AddProduct = () => {
    const {actions} = useContext(Context)
    const [form, setForm] = useState(false);
    const navigate = useNavigate()
    const [img_uploaded, setImg_uploaded] = useState(false)

    const fileInputRef = useRef(null);

    const hadnleAddProduct = async(e) => {
        e.preventDefault();
        if(
            formData.nombre && formData.precio
        ){
            actions.addProduct(
                formData.nombre, formData.precio, formData.descripcion, formData.img
            );
            setForm(true);
            navigate("/addProduct");
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
            Swal.fire("Please, fill in all require data")
        }
    }

    const [formData, setFormData] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
        img: ""
    })

    useEffect(()=> {
        console.log(formData);}, [formData]);

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
            </form>
        </div>
    )
}