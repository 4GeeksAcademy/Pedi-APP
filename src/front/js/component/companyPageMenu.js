import React, { useContext, useState, useEffect }  from "react";
import { Context } from "../store/appContext";
import "../../styles/companyPageMenu.css"
import { useNavigate } from "react-router-dom";

export const CompanyPageMenu = ({ idEmpresa }) =>{
    const {store,actions} = useContext(Context)
    const [products, setProducts] = useState([]);

    const navigate = useNavigate()

    const handleBuyProduct = (e, nombre, precio, descripcion, img, cantidad, id) => {
        e.preventDefault();
        actions.buyProduct(nombre, precio, descripcion, img, cantidad, id);
        navigate('/orderDetail', { replace: true });
    };

    useEffect(()=>{
        (async()=>{
            try{
                const response = await fetch(`${process.env.BACKEND_URL}/api/empresa/menu/${idEmpresa}`,{
                    method : "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },

                })
                const result = await response.json()
                console.log(result)
                setProducts(result)
            }catch(error){
                console.log("error")
            }
        })()
    },[])

    return(
        <div className="container_info_company">
            <div className="tab-pane fade show active" id="nav-menu" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                    <div className="row">
                    {products.map((product,index)=>{
                            return (
                        <div className="col-12 col-md-4 border menu_container_page" key={index}>
                            <div className="row"> 
                                <div className="col-3">
                                    <div className="menu_imgbox  mx-2 my-5">
                                            <img src={product && product.img} alt="foto producto" className="home_categoryimg" />
                                    </div>
                                </div>
                                <div className="col-7 py-4 menu_text_page">  
                                    <div className="row">
                                        <div className="col-9 menu_title_page">
                                            <h4 className="menu_title">{product && product.nombre}</h4>
                                        </div>
                                        <button className="btn col-1 menu_icono"  onClick={(e) => handleBuyProduct(e, product.nombre, product.precio, product.descripcion, product.img, 10, product.id)}>
                                            {/* Esto está por terminar */}
                                            <i className="fa-solid fa-plus fa-lg"></i>
                                        </button>
                                    </div>
                                    <div className="menu_price_data">
                                            <h6 className="menu_price_page">{product && product.precio}$</h6>
                                    </div>
                                    <div className="menu_description_page">
                                        <p>{product && product.descripcion}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
                    </div>
            </div>
        </div>
    )
}