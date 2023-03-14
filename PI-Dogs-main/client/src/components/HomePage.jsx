import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux'
import { getDogs, getTemperaments, filterDogsByTemperaments, filterCreated, orderByName } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";

export default function HomePage(){

    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.tempe);

    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const [order, setOrder] = useState('');
    const indexOfLastDog = currentPage * dogsPerPage;  
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

    const paginado = (pageNumber)=>{
        setCurrentPage (pageNumber);
    }

    useEffect(()=>{
        dispatch(getDogs());
    }, []);

    useEffect(()=>{
        dispatch(getTemperaments());
    }, []);

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }

    function handleSort(e){
       e.preventDefault();  
       dispatch(orderByName(e.target.value));
       setCurrentPage(1);
       setOrder(`Ordenado ${e.target.value}`)

    }

    function handleFilterTemperaments(e){
        dispatch(filterDogsByTemperaments(e.target.value))
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }



    return(
        <div>
            <Link to= '/dogs'>CREATE DOG</Link>
            <h1>CHRISTIAN'S DOGS</h1>
            <button onClick={e=> {handleClick(e)}}>
                Volver a cargar Dogs
            </button>
            <div>
                <select onChange={e=> handleSort(e)}>
                    <option value= 'asc'>Ascendente</option>
                    <option value= 'desc'>Descendente</option>
                </select>

                <select onChange= {e => handleFilterCreated(e)}>
                    <option value= 'All'>All</option>
                    <option value= 'Created'>Created in Database</option>
                    <option value= 'Api'>From API</option>
                </select>

                <select onChange= {e => handleFilterTemperaments(e)}>
                    {
                        allTemperaments?.map(el => {
                            return( 
                                <option value={el.name}>{el.name}</option>
                            )
                               
                               
                            
                        })
                    }
                    
                </select>

               

                
                
            </div>

            <div>
                <Paginado dogsPerPage= {dogsPerPage} allDogs = {allDogs.length} paginado = {paginado}/>
            </div>

            <div>
                {
                    currentDogs?.map(el=>{
                        return(
                            <div>
                                <Link to= {"/home/"+ el.id}>
                                <Card image={el.image} name={el.name} weight={el.weight} temperaments={el.temperaments} />
                                </Link>
                                
                            </div>
                            
                        )
                        

                    })
                }
            </div>

            <div>
                <Paginado dogsPerPage= {dogsPerPage} allDogs = {allDogs.length} paginado = {paginado}/>
            </div>
        
        </div>
        

    );
};