import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import japanese from "../../img/japanese.png";
import bar from "../../img/bar.png";
import burger from "../../img/burger.png";
import cafe from "../../img/cafe.png";
import chinese from "../../img/chinese.png";
import empanadas from "../../img/empanadas.png";
import grill from "../../img/grill.png";
import italian from "../../img/italian.png";
import pizza from "../../img/pizza.png";
import mexican from "../../img/mexican.png";
import vegan from "../../img/vegan.png";
import asian from "../../img/asian.png";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const category_searchinator = async (category) => {
    const result = await actions.caregory_filtrator(category);

    navigate("/searchEmpresa", { replace: true });
  };

  return (
    <>
      <div className=" home_categories_row row text-center flex-row flex-nowrap">
        {store.categories
          ? store.categories.map((x, index) => {
              return (
                <div className="home_foodbox row mx-3 my-5 p-0 ms-3" key={x}>
                  <div className="me-0 pe-0 ">
                    <img
                      src={`/${x}.png`}
                      alt="..."
                      className="home_categoryimg"
                      onClick={() => {
                        category_searchinator(x);
                      }}
                    />
                  </div>
                  <div className="me-1 ms-0 p-0">
                    <p>{x}</p>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default Categories;
