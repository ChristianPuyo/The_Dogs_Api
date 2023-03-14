import React from "react";

export default function Card({image, name, weight, temperaments }){
    return(
        <div>
            <img src={image} alt="Image not found" width="200px" height="200px"/>
            <h1>{name}</h1>
            <h5>{weight}</h5>
            <h3>{temperaments}</h3>
        </div>

    );

}