import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Categories from "../component/categories";
import "../../styles/search.css";
import { useNavigate } from "react-router-dom";
import mapboxgl from "!mapbox-gl";
import Mapbox from "../component/mapbox";
import Top_5_carrousel from "../component/top_5_carrousel";

export const Search = (props) => {
  const { store, actions } = useContext(Context);
  const [formData, setFormData] = useState({
    mostPopular: false,
    rating: false,
    priceRange: false,
    promotions: false,
    delivery: false,
    yourFavorites: false,
  });
  const [search, setSearch] = useState({
    nombre: "",
  });

  const top_5_filtrator = () => {
    actions.top_5_searchinator();
  };

  const handleCheckboxFilterby = (filter) => {
    return (event) => {
      setFormData({ ...formData, [filter]: event.target.checked });
    };
  };

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    actions.searchEmpresa(search.nombre);
    // navigate('/searchEmpresa/)
  };

  const [deliveryChecked, setDeliveryChecked] = useState(false);

  const handleFilterbyDelivery = () => {
    actions.filterDelivery();
    setDeliveryChecked(!deliveryChecked);
    setFavoritesChecked(false);
  };

  const [favoritesChecked, setFavoritesChecked] = useState(false);
  const handleFilterbyFavorites = () => {
    actions.filterFavorites();
    setFavoritesChecked(!favoritesChecked);
    setDeliveryChecked(false);
  };

  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          process.env.BACKEND_URL + "/api/allcompanies",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        setCompanies(result.companies);
      } catch (error) {
        console.log("Error loading message from backend");
      }
    })();
  }, []);

  const pageNavigate = (id) => {
    navigate(`/companyPage/${id}`, { replace: true });
  };

  return (
    <>
      <Categories></Categories>
      <form class="row busquedaEmpresas" onSubmit={(e) => handleSearch(e)}>
        <div class="col-11">
          <label for="searchInput" class="visually-hidden">
            Search
          </label>
          <input
            type="search"
            class="form-control"
            id="searchInput"
            placeholder="Search restaurant"
            onChange={(data) => {
              setSearch({ ...search, nombre: data.target.value });
            }}
          />
        </div>
        <div class="col-1 m-0 p-0">
          <button type="submit" class="btn btn-danger mb-3">
            Search
          </button>
        </div>
      </form>

      <div className="form_empresas_container">
        <div className="me-1">
          <b>Search by:</b>
        </div>
        <div className="form-check me-1">
          <input
            className="form-check-input inputSearch"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value="option1"
            onClick={top_5_filtrator}
          />
          <label
            className="form-check-label labelSearch"
            for="flexRadioDefault1"
          >
            Most Popular
          </label>
        </div>
        <div className="form-check me-3">
          <input
            className="form-check-input inputSearch"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault5"
            value="option2"
            onClick={handleFilterbyDelivery}
          />
          <label className="form-check-label" for="flexRadioDefault5">
            Delivery
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input inputSearch"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault6"
            value="option3"
            onClick={handleFilterbyFavorites}
            disabled={store.current_user_data.role == "Cliente" ? false : true}
          />
          <label className="form-check-label" for="flexRadioDefault6">
            Your Favorites
          </label>
        </div>
      </div>

      <div className=" mb-5 ">
        <div className="row mx-3">
          {store.searchCompany.length > 0 ? (
            store.searchCompany.map((element, index) => (
              <div
                className=" gx-2 gy-4 col-12 col-sm-6 col-md-3 contenedorCards"
                key={index}
              >
                <div className="card cardRestaurante ">
                  <img
                    src={element.imagen}
                    className="card-img-top cardImage p-3"
                    alt={element.nombre}
                    onClick={() => {
                      pageNavigate(element.id);
                    }}
                  />
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
            ))
          ) : (
            <div className="noRegistros">
              <h3 className="topRated">Top rated</h3>
              <Top_5_carrousel />
            </div>
          )}
          <div className="row map_box mt-4">
            <Mapbox companies={companies} />
          </div>
        </div>
      </div>
    </>
  );
};
