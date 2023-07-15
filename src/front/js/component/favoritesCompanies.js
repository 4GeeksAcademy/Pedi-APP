import React, {useContext} from "react";
import { Context } from "../store/appContext";


export const FavoriteList = () => {
    const {store} = useContext(Context)

    return (
        <>
            <li>
                {
                store.favorites.map((element)=>{
                    return <li>{element}</li>
                })}

                <div className="col-2">  
                    <span><i className="fas fa-trash-alt"
                        onClick={() => {
                        actions.deleteFavorite(e);							
                        }}></i>
                    </span>
                </div>
            </li>
        </>
    )

}