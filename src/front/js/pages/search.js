import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Categories from "../component/categories";
import "../../styles/search.css";
import { useNavigate } from "react-router-dom";


export const Search = (props) => {
const { store, actions } = useContext(Context);
const [ formData, setFormData] = useState({
    mostPopular: false,
    rating: false,
    priceRange: false,
    promotions: false,
    delivery: false,
    yourFavorites: false
})
const [ search, setSearch] = useState({
    nombre:""
});

const handleCheckboxFilterby = (filter) => {
    return (event) => {
      setFormData({ ...formData, [filter]: event.target.checked });
    };
};

const navigate = useNavigate()

const handleSearch = (event) => {
    event.preventDefault();
    actions.searchEmpresa(search.nombre);
    // navigate('/searchEmpresa/)
};

const [deliveryChecked, setDeliveryChecked] = useState(false);

const handleFilterbyDelivery = () => {
    actions.filterDelivery();
    setDeliveryChecked(!deliveryChecked);
    setFavoritesChecked(false)
};

const [favoritesChecked, setFavoritesChecked] = useState(false);
const handleFilterbyFavorites = () => {
    actions.filterFavorites();
    setFavoritesChecked(!favoritesChecked);
    setDeliveryChecked(false);
};

  

// useEffect(() => {
    // llamar aqui al most popular
// }, [formData]);



return(
    <>
        <Categories></Categories>
        <form class="row mt-3 busquedaEmpresas" onSubmit={(e) => handleSearch(e)}>
             <div class="col-5 ms-5">
                 <label for="searchInput" class="visually-hidden">Search</label>
                 <input type="search" class="form-control" id="searchInput" placeholder="Search" onChange={(data) => {setSearch({ ...search, nombre: data.target.value });}}/>
             </div>
             <div class="col-auto">
                 <button type="submit" class="btn btn-danger mb-3">Search</button>
             </div>
        </form>
        <p>Aquí va el mapa</p>
        <div className="row rowInput">
             <div className="col-12 col-md-2 m-5 p-3 form_empresas_container">
                 <p><b>Filter by:</b></p>
                 <div className="form-check">
                     <input className="form-check-input inputSearch" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="option1" checked={formData.mostPopular} onClick={handleCheckboxFilterby}/>
                     <label className="form-check-label labelSearch" for="flexRadioDefault1">
                         Most Popular
                     </label>
                 </div>
                 <div className="form-check">
                     <input className="form-check-input inputSearch" type="radio" name="flexRadioDefault" id="flexRadioDefault5" value="option5" checked={deliveryChecked} onClick={handleFilterbyDelivery}/>
                     <label className="form-check-label" for="flexRadioDefault5">
                         Delivery
                     </label>
                 </div>
                 <div className="form-check">
                     <input className="form-check-input inputSearch" type="radio" name="flexRadioDefault" id="flexRadioDefault6" value="option6" checked={favoritesChecked} onClick={handleFilterbyFavorites}/>
                     <label className="form-check-label" for="flexRadioDefault6">
                         Your Favorites
                     </label>
                 </div>   
            </div>
            <div className="col-10 col-md-8 mb-5 ">
                <div className="row">

                    {store.searchCompany.length > 0 ? store.searchCompany.map((element, index) => (
                        <div className=" gx-3 gy-4 col-12 col-md-12 col-lg-4 contenedorCards">
                            <div className="card cardRestaurante contenedorCards" key={index}>
                                <img src={element.imagen} className="card-img-top p-5 cardImage" alt={element.nombre} />
                                <div className="card-body bodyCard ">
                                    <div className="row">
                                        <div className="card-text col-7">
                                            <button className="btn btn-star p-0 m-0">
                                            <i className="fas fa-star star ms-1"></i>
                                            </button>{" "}
                                        4/5
                                    </div>
                                    <p className="card-text col-5">35mins</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    )) : <h1>No hay registros</h1>}
                </div>
            </div>
        </div>
   </>
)
}




