import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Categories from "../component/categories";
import "../../styles/search.css";
import { FavoriteList } from "../component/favoritesCompanies";


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


const handleSearch = (event) => {
    event.preventDefault();
    actions.searchEmpresa(search.nombre);
}

// console.log(store.favorites)

// useEffect(() => {
//     console.log(formData);
// }, [formData]);



return(
   <>
        <Categories></Categories>
        <form class="row mt-3" onSubmit={(e) => {handleSearch(e)}}>
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
            <div className="col-2 m-5 p-3 form_empresas_container">
                <p><b>Filter by:</b></p>
                <div className="form-check">
                    <input className="form-check-input inputSearch" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="option1" checked={formData.mostPopular} onChange={handleCheckboxFilterby('mostPopular')}/>
                    <label className="form-check-label labelSearch" for="flexRadioDefault1">
                        Most Popular
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input inputSearch" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="option2" checked={formData.rating} onChange={handleCheckboxFilterby('rating')}/>
                    <label className="form-check-label" for="flexRadioDefault2">
                        Rating
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input inputSearch" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="option3" checked={formData.priceRange} onChange={handleCheckboxFilterby('priceRange')}/>
                    <label className="form-check-label" for="flexRadioDefault3">
                        Prince Range
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input inputSearch" type="radio" name="flexRadioDefault" id="flexRadioDefault4" value="option4" checked={formData.promotions} onChange={handleCheckboxFilterby('promotions')}/>
                    <label className="form-check-label" for="flexRadioDefault4">
                        Promotions
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input inputSearch" type="radio" name="flexRadioDefault" id="flexRadioDefault5" value="option5" checked={formData.delivery} onChange={handleCheckboxFilterby('delivery')}/>
                    <label className="form-check-label" for="flexRadioDefault5">
                        Delivery
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input inputSearch" type="radio" name="flexRadioDefault" id="flexRadioDefault6" value="option6" checked={formData.yourFavorites} onChange={handleCheckboxFilterby('yourFavorites')}/>
                    <label className="form-check-label" for="flexRadioDefault6">
                        Your Favorites
                    </label>
                </div>

            </div>
            <div className="container ms-5 col-7 me-0 p-0">
                <p><b>Most Popular</b></p>
                <div className="row mb-2 gy-3 gx-3">
                    <div className="col-4">
                        <div className="card cardRestaurante">
                            <img src="https://www.romaest.cc/fileadmin/user_upload/GLOBAL/brand_stores/logos/burgerking_01.jpg" class="img-fluid h-100" alt="..."/>
                            <div className="card-body bodyCard p-2 m-0">
                                <div className="row">
                                    <p className="card-text col-7"><button className="btn btn-star p-0 m-0" onClick={()=>{actions.setFavorite(props.empresa);}}><i class="fas fa-star star ms-1"></i></button> 4/5</p>
                                    <p className="card-text col-5">35mins</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card cardRestaurante">
                            <img src="https://logos-world.net/wp-content/uploads/2023/03/Five-Guys-Emblem.png" class="img-fluid h-100" alt="..."/>
                            <div className="card-body bodyCard p-2 m-0">
                                <div className="row">
                                    <p className="card-text col-7"><button className="btn btn-star p-0 m-0" onClick={()=>{actions.setFavorite(props.empresa);}}><i class="fas fa-star star ms-1"></i></button> 4/5</p>
                                    <p className="card-text col-5">35mins</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card cardRestaurante">
                            <img src="https://media-cdn.tripadvisor.com/media/photo-s/17/d4/27/88/logo.jpg" class="img-fluid h-100" alt="..."/>
                            <div className="card-body bodyCard">
                                <p className="card-text"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-2 gy-3 gx-3">
                    <div className="col-4">
                        <div className="card cardRestaurante">
                            <img src="https://mirasierragallery.com/wp-content/uploads/2022/03/la-bientirada-1.png" class="img-fluid h-100" alt="..."/>
                            <div className="card-body bodyCard">
                                <p className="card-text"></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card cardRestaurante">
                            <img src="https://aarde.es/wp-content/uploads/2021/04/Logo_pequeno.png" class="card-img-top" alt="..."/>
                            <div className="card-body bodyCard">
                                <p className="card-text"></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card cardRestaurante">
                            <img src="https://trezerestaurante.com/wp-content/uploads/2020/02/treze-restaurante-logotipo.png" class="card-img-top" alt="..."/>
                            <div className="card-body bodyCard">
                                <p className="card-text"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-2 gy-3 gx-3">
                    <div className="col-4">
                        <div className="card cardRestaurante">
                            <img src="https://andyapp.io/wp-content/uploads/2023/03/logo-la-martinuca.jpg" class="card-img-top" alt="..."/>
                            <div className="card-body bodyCard">
                                <p className="card-text"></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card cardRestaurante">
                            <img src="https://noticiasgourmet.es/wp-content/uploads/2017/09/restaurante-santerra-madrid-noticias-gourmet-640x427.jpg" class="card-img-top" alt="..."/>
                            <div className="card-body bodyCard">
                                <p className="card-text"></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card cardRestaurante">
                            <img src="https://solodecroquetas.es/wp-content/uploads/2022/11/Logo-Solo-de-croquetas.jpg" class="card-img-top" alt="..."/>
                            <div className="card-body bodyCard">
                                <p className="card-text"></p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>  
            <div className="btn-group dropstart me-5"> 	
                <Link to={"/favorite"} className="btn btn-warning">Favoritos ({store.favorites.length})</Link>
            </div>  
        </div>
    </>
)}






