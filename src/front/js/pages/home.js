import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import bk from "../../img/bk.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
      Swal.fire(search)
    } else {
      /*navigate("/search", { replace: true });  ---- no hay pagina de search yet*/
      console.log(search)
    }
      
  }
  
  const categories = store.categories

  return (
    <div className="text-center container-fluid ">
      <div className="row home_first_row">
        <h1 className="home_title"> DishDash</h1>
        <p className="home_subtitle"> Dashing to your door</p>

        <form className="home_searchform my-5" onSubmit={(e) => {search_handlinator(e)}}>
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
      <div className="row home_second_row">
        <h1 className="home_categories_title mt-4">Categories</h1>
        <Categories/>
        <h1 className="home_categories_title">Top rated</h1>

        <Top_5_carrousel/>
        
       

      </div>
    </div>
  );
};


/*@app.route("/upload", methods=['POST'])
def upload_file():
  app.logger.info('in upload route')

  cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), 
    api_secret=os.getenv('API_SECRET'))
  
    file_to_upload = request.files['file']

    if file_to_upload:
      upload_result = cloudinary.uploader.upload(file_to_upload)







          <div>
            <label for="formFileLg" class="form-label">Large file input example</label>
            <input class="form-control form-control-lg" id="formFileLg" type="file"/>
          </div>


          

  // the react post request sender
    uploadFile = async (e) => {
      const file = e.target.files[0];
      if (file != null) {
        const data = new FormData();
        data.append('file_from_react', file);

        let response = await fetch('/url_route',
          {
            method: 'post',
            body: data,
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }
        );
        let res = await response.json();
        if (res.status !== 1){
          alert('Error uploading file');
        }
      }
    };
      
    // the react form
    <form>
      <input
        type="file"
        onChange={this.uploadFile}>
      </input>
    </form>
 */


   