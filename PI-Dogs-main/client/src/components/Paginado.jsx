import React from "react";

export default function Paginado({dogsPerPage, allDogs, paginado}){
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i+1);
    }

    return(
        <nav>
            
                {   pageNumbers &&
                    pageNumbers.map(number => (
                         
                            
                            <button onClick={() => paginado(number)}>{number}</button>
                            
                           
                        
                        

                    ))}
            
       </nav>
     

    )
}