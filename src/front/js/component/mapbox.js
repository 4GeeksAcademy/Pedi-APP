import React, { useContext, useEffect, useState,useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Categories from "../component/categories";
import { useNavigate } from "react-router-dom";
import mapicon from "../../img/mapicon.png";

import mapboxgl from '!mapbox-gl';
import "../../styles/mapbox.css";
import 'mapbox-gl/dist/mapbox-gl.css';




export const Mapbox = () => {

   
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGl1Y2F4IiwiYSI6ImNsazFhZmZ6dzA1Mm8zbXFqenowMWltNnAifQ.pQR2Jzwjbhbnh36nL6mpYA';

    const map = useRef(null);
    const mapContainer = useRef(null);
    const [lng, setLng] = useState(-3.703790);
    const [lat, setLat] = useState(40.416775);
    const [zoom, setZoom] = useState(6);

    const [companies, setCompanies] = useState([])
             
       
        
    

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(process.env.BACKEND_URL + "/api/allcompanies", { 
                    method : "GET",
                    headers: { 
                        "Content-Type": "application/json",
                        } 
                    
                    
                })
                const result = await response.json()
                setCompanies(result)
                
                
                if (map.current) return; // initialize map only once
        
                map.current = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center: [lng, lat],
                    zoom: zoom
                    });
                
        
                
                
                /*array to go trough all companies and set markers */
                for (let i of result.companies){
                    
                    if (map.current && mapContainer.current) {
                        const el = document.createElement('div');
                        el.className = 'marker';
                        // make a marker for each feature and add to the map
                        new mapboxgl.Marker(el).setLngLat([i.longitude,i.latitude]).addTo(map.current);
                        
                    }
                } 
                
                    
    
            }catch(error){
                console.log("Error loading message from backend")
            }
            
            })();
        }, []);
        
        
            

    
    return (
        <div className="map ">
            <div ref={mapContainer} className="map-container" />
        </div>
    );
  };
export default Mapbox;