import React from "react";
import img from "./mocktest.jpg";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <div className="img__container">
          <img className="home__img" src={img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
