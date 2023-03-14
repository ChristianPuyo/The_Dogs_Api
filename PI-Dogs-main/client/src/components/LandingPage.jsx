import React from "react";
import {Link} from "react-router-dom";

export default function LandingPage(){
    return(
        <div>
            <h1>WELCOME TO MY PAGE</h1>
            <Link to = '/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}