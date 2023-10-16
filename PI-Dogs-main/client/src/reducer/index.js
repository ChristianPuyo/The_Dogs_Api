const initialState = {
    dogs: [],
    tempe: [],
    dogsAll: []
}

function reducer(state = initialState, action ){
    switch (action.type) {
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload,
                dogsAll: action.payload
            }
        case 'GET_NAME_DOGS':
            return{
                ...state,
                dogs: action.payload
            }
        case 'GET_TEMPERAMENTS':
            return{
                ...state,
                tempe: action.payload

            }
        case 'ORDER_BY_NAME' :
            let sortedArr = action.payload === 'asc' ?
            state.dogs.sort(function (a,b){
                if(a.name>b.name){
                    return 1;
                }
                if(b.name>a.name){
                    return -1;
                }
                return 0;
            }):
            state.dogs.sort(function (a,b){
                if(a.name>b.name){
                    return -1;
                }
                if(b.name>a.name){
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                dogs: sortedArr 
            }
            

        case 'FILTER_BY_TEMPERAMENTS':
            const allDogs = state.dogsAll;
            const temperamentsFiltered = allDogs.filter(el => el.temperaments!= undefined? el.temperaments.includes(action.payload) === true : console.log(0))
            return{
                ...state,
                dogs : temperamentsFiltered 

            }
        case 'POST_DOG':
            return{
                ...state
            }

        case 'FILTER_CREATED':
          
            const originFilter = action.payload === 'Created' ? state.dogsAll.filter(el => el.createdInDb ) : state.dogsAll.filter(el => !el.createdInDb)
            return{
                ...state,
                dogs : action.payload === 'All'? state.dogsAll : originFilter
            }
        default:
            return state;
            
    }

}

export default reducer;