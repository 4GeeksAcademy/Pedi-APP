import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/userProfile.css";
import User_profile_info from "../component/user_profile_info";
import User_history from "../component/user_history";
import User_favorites from "../component/user_favorites";
import User_order from "../component/user_order";
import User_profile_menu from "../component/user_profile_menu";
import "../../styles/userProfileMenu.css"
import "../../styles/userFavorites.css";

const UserFavorites = () => {
    const { store, actions } = useContext(Context);
    const [favorites, setFavorites] = useState([])
    useEffect( () =>{
        
        (async () => {
            
            
            try {
                const token = localStorage.getItem('jwt-token');
                const response = await fetch(process.env.BACKEND_URL + "/api/favorites", { 
                    method : "POST",
                    body: JSON.stringify({id : store.current_user_data.id}),
                    headers: { 
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer '+token
                        } 
                    
                    
                })
                const result = await response.json()
                if(response.status == 401){
                    Swal.fire(result.msg)                
                    navigate("/", { replace: true });

                }
                setFavorites(result.favorites)
                
                

            }catch(error){
                console.log("Error loading message from backend")
            }		
        })()
       

    }, []);

    return(
        <>
            <div className="container-fluid container-user-profile">
                <div className="row ">
                    <User_profile_menu/>
                    <div className="col-12 col-md-7 acount_fav_box  ">
                    <h1 className="title_acount_user">Your favorites</h1>
                    {favorites && (
                        favorites.map((x,index) =>{    
                            console.log(x)
                            return <User_favorites company={x} key = {index}/>
                        })
                         )}
    
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserFavorites