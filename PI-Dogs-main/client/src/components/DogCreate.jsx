import React from "react"
import { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { postDog, getTemperaments } from "../actions"
import { useDispatch, useSelector } from "react-redux"



export default function DogCreate(){
       const dispatch = useDispatch();
       const temperaments = useSelector(state => state.tempe);

       const [input, setInput] = useState({

        name: "",
        height: "",
        weight: "",
        yearsoflife: "",
        temperament: []


       })

       function handleChange(e){
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
       }

       useEffect(()=>{
            dispatch(getTemperaments());

       },[]);

       return(
            <div>
                <Link to='/home'><button>Ir a Home</button></Link>
                <h1>Create new Dog 🐶</h1>
                <form>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={input.name} name="name" onChange={handleChange}/>
                    </div>

                    <div>
                        <label>Height:</label>
                        <input type="text" value={input.height} name="height" onChange={handleChange}/>
                    </div>

                    <div>
                        <label>Weight:</label>
                        <input type="text" value={input.weight} name="weight" onChange={handleChange}/>
                    </div>

                    <div>
                        <label>Years Of Life:</label>
                        <input type="text" value={input.yearsoflife} name="yearsoflife" onChange={handleChange}/>
                    </div>

                    <div>
                        <label>Image:</label>
                        <input type="text" value={input.image} name="image" onChange={handleChange}/>
                    </div>

                    <select>
                        {
                            temperaments.map(tem =>{
                                return(
                                    <option value={tem.name}>{tem.name}</option>
                                )
                            })
                        }
                    </select>

                    <button type='submit'>Create Dog</button>
                </form>
            </div>
       );

}