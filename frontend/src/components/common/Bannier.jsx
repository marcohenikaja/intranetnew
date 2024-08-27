import React from "react";
import { Anchor } from 'antd';
import { Button } from "antd";
const { Link } = Anchor;
import "antd/dist/antd.css";

const Bannier = () => {
  const sectionStyle = {
    backgroundColor: "green",
    width: "100%",
    padding: "50px", // Ajustez la marge intérieure selon vos besoins
    boxSizing: "border-box", // Assurez-vous que la boîte prend en compte la bordure et le rembourrage
    fontSize:'25px',
    textAlign:'center'
   
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const contentStyle = {
    flex: 1,
  };

  const imageContainerStyle = {
    flex: 1,
    textAlign: "center",
  };

  const imgStyle = {
    maxWidth: "100%",
    height: "auto", // Ajustez la hauteur en conséquence
  };
  const handleClick = () => {
    // Redirection vers la ressource
    window.location.href = "ressource"
  }
  return (
    <section style={sectionStyle} onClick={handleClick}>
      <div style={containerStyle}>
        <div style={contentStyle}>
          <h1 style={{ color: 'white' }}>
          Retrouvez toutes nos ressources ici.
          </h1>
         
        </div>
      </div>
    </section>
  );
};

export default Bannier;
