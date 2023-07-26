import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Categories from "../component/categories";
import Top_5_carrousel from "../component/top_5_carrousel";


export const Home = () => {
  const { store, actions } = useContext(Context);
  const [address, setAddress] = useState("")
  const navigate = useNavigate();

  const [img, setImg] = useState("")
  const data = new FormData()

  const address_setinator = (event) => {
    setAddress({ ...address, [event.target.id]: event.target.value });
    
  };

  const search_handlinator = async (event) => {
    event.preventDefault()
    const search = await actions.search_handlinator(address)
    if (search  == "Address not found try again"){
      toast.error(search,  {position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    } else {
      navigate("/searchEmpresa", { replace: true }); 
      
    }
      
  }
  
  const categories = store.categories

  return (
    <div className="text-center container-fluid fondito">
      <div className="row home_first_row">

      <div className="row home_second_row mt-0 mx-0 px-0">
        <Categories/>
      </div>


        <form className="home_searchform" onSubmit={(e) => {search_handlinator(e)}}>
          <div className="mb-3 input-group home_searchbar">
            <input
              type="text"
              className="form-control home_input pure-input-rounded"
              id="address"
              aria-describedby="emailHelp"
              placeholder="Enter your adress"
              onChange={(e) => address_setinator(e)}
              required
            />
            <button type="submit" className="btn home_searchbtn ">
                
              <i className="fa-solid fa-location-arrow fa-xl"></i>
            </button>
          </div>

          
        </form>
      </div>
      <div className="row home_third_row">
        <h3 className="home_categories_title">Top rated</h3>
        <Top_5_carrousel/>
        <ToastContainer />
      </div>
    </div>
  );
};


