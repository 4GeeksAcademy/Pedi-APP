import React, { useContext, useEffect, useState } from "react";
import "../../styles/addProduct.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Addproduct = () => {
    const {actions} = useContext(Context)
    const [form, setForm] = useState(false);
    const navigate = useNavigate()

    const hadnleAddProduct = async(e) => {
        e.preventDefault();
        if(
            formData.nombre && formData.precio
        ){
            actions.addProduct(
                formData.nombre, formData.precio, formData.descripcion
            );
            setForm(true);
            navigate('/addProduct')
        } else{
            Swal.fire("Please, fill in all require data")
        }
    }

    const [formData, setFormData] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
    })

    useEffect(()=> {
        console.log(formData);}, [formData]);

    return(
        <div className="container rounded add-product-container">
            <form className="card card-add-product" onSubmit={(e) => hadnleAddProduct(e)}>
                <div className="mb-3 add-product-text mt-5">
                    <label htmlFor="productName" className="form-label add-product-label">Product Name</label>
                    <input type="text" className="form-control" id="productName" placeholder="Product Name" value={formData.nombre} onChange={(data) => setFormData({...formData, nombre: data.target.value})} required/>
                </div>
                <div className="mb-3 add-product-text">
                    <label htmlForfor="price" className="form-label add-product-label">Price</label>
                    <input type="price" className="form-control" id="price" placeholder="XXXXX $" value={formData.precio} onChange={(data)=> setFormData({...formData, precio: data.target.value})} required/>
                </div>
                <div className="mb-3 add-product-text">
                    <label htmlFor="description" className="form-label add-product-label">Description</label>
                    <textarea className="form-control" id="description" rows="3" value={formData.descripcion} onChange={(data)=> setFormData({...formData, descripcion: data.target.value})}></textarea>
                </div>
                <div class="mb-3 add-product-upload">
                    <label htmlFor="formFile" className="form-label">Upload image</label>
                    <input className="form-control" type="file" id="formFile"/>
                </div>
                <button type="submit" className="btn add-product-btn">Submit</button>
            </form>
        </div>
    )
}