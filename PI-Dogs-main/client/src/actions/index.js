import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        var jsonRote = await axios.get("http://localhost:3001/dogs"); 
        return dispatch({
         type: 'GET_DOGS',
         payload: jsonRote.data  
        })
    }
}

export function getTemperaments(){
    return async function(dispatch){
        var roteTemperaments = await axios.get("http://localhost:3001/temperaments");
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: roteTemperaments.data
        })
    }
}

export function postDog(payload){
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/dogs", payload);
        console.log(response);
        return response;

    }
}

export function filterDogsByTemperaments(payload){
    
    return{
        type: 'FILTER_BY_TEMPERAMENTS',
        payload
    }

}

export function filterCreated(payload){
    console.log(payload);
    return{
        type: 'FILTER_CREATED',
        payload

    }
}

export function getNameDogs(payload){
    return async function(dispatch){
        try {
             let json = await axios.get("http://localhost:3001/dogs?name="+payload);
             return dispatch({
                type: 'GET_NAME_DOGS',
                payload: json.data
             })
        } catch(error){
            console.log(error);
        }
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}