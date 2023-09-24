import { NEXT_HANDLER, PREV_HANDLER, FIRST_RENDER, LOAD_DOGS, ORIGIN_OF_DOGS, LOAD_TEMPERAMENTS, LOADED_DOGS, FILTER_TEMPERAMENTS, ORDER_BY_TYPE, ORDER_WAY, ORDER, LOAD_NAME, LOAD_NAMED } from "./actions";

const initialState = {
    currentPage: 0,
    dogs: [],
    gottenDogs: [],
    loadedDogsSwitch: 0,
    allDogs: [],
    dogsName: '',
    showing: [],
    temperaments: [],
    orderWay: 'A',
    orderType: 'raza'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case NEXT_HANDLER: 
            return {
                ...state,
                dogs: state.dogs,
                currentPage: action.payload.currentPage,
                showing: action.payload.fragment,
            }

        case PREV_HANDLER:
            if (action.payload){
                return {
                    ...state,
                    dogs: state.dogs,
                    currentPage: action.payload.currentPage,
                    showing: action.payload.fragment,
                }
            } else {
                return {...state}
            }
        
        case FIRST_RENDER:
            return {
                ...state,
                currentPage: action.payload.currentPage,
                showing: action.payload.fragment,
            }
        
        case LOAD_NAME:
            return {
                ...state,
                dogsName: action.payload
            }

        case LOAD_NAMED:
            let namedDogs = [...state.allDogs].filter((dog) => {
                return dog.name.includes(state.dogsName)
            })
            return {
                ...state,
                currentPage: 0,
                dogs: namedDogs,
            }

        
        case LOAD_DOGS:
            return{
                ...state,
                dogs: action.payload.fragment,
                gottenDogs: action.payload.fragment,
                allDogs: action.payload.fragment
            }
        
        case LOADED_DOGS:
            return{
                ...state,
                loadedDogsSwitch: state.loadedDogsSwitch + action.payload
            }

        case LOAD_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload.fragment
            }

        case ORIGIN_OF_DOGS:
            console.log(action)
            if (action.payload === 'Api'){
                return {
                    ...state,
                    dogs: state.allDogs.slice(0, 172),
                    gottenDogs: state.allDogs.slice(0, 172),
                    currentPage: 0
                }
            } else if (action.payload === 'Bdd'){
                return {
                    ...state,
                    dogs: state.allDogs.slice(172),
                    gottenDogs: state.allDogs.slice(172),
                    currentPage: 0
                }
            }
        
        case FILTER_TEMPERAMENTS:
            if (action.payload !=='All temperaments'){
                let filteredDogs = state.gottenDogs.filter((dog) => {
                    if (dog.temperament) {
                        const temperaments = dog.temperament.split(',').map((temper) => temper.trim());
                        return temperaments.includes(action.payload);
                    }
                    return false
                });
                return {
                    ...state,
                    dogs: filteredDogs,
                    currentPage: 0
                }
            } else {
                return {
                    ...state,
                    dogs: state.gottenDogs,
                    currentPage: 0,
                }
            }

        case ORDER_BY_TYPE:
            return {
                ...state,
                orderType: action.payload
            }
    

        case ORDER_WAY:
            return {
                ...state,
                orderWay: action.payload,
            }
                 
        case ORDER:
            let aux;
            var filteredDogs=[...state.dogs];
            if (state.orderType === 'peso'){
                for (let i=0; i<filteredDogs.length-1; i++) {
                    for (let j=0; j<filteredDogs.length-1; j++) {
                        if ((parseFloat(filteredDogs[j].weight.metric.slice(0,2)) > parseFloat(filteredDogs[j+1].weight.metric.slice(0,2)) && state.orderWay==='A') || (parseFloat(filteredDogs[j].weight.metric.slice(0,2)) < parseFloat(filteredDogs[j+1].weight.metric.slice(0,2)) && state.orderWay==='D')){
                            aux= filteredDogs[j];
                            filteredDogs[j]= filteredDogs[j+1];
                            filteredDogs[j+1]= aux;
                        }
                    }
                }
                return {
                    ...state,
                    dogs: filteredDogs,
                    currentPage: 0,
                }
            } else if (state.orderType === 'raza'){
                for (let i=0; i<filteredDogs.length-1; i++) {
                    for (let j=0; j<filteredDogs.length-1; j++) {
                        if ((filteredDogs[j].name > filteredDogs[j+1].name && state.orderWay === 'A') || (filteredDogs[j].name < filteredDogs[j+1].name && state.orderWay === 'D')){
                            aux= filteredDogs[j];
                            filteredDogs[j]= filteredDogs[j+1];
                            filteredDogs[j+1]= aux;
                        }
                    }
                }
                return {
                    ...state,
                    dogs: filteredDogs,
                    currentPage: 0,
                }
            }

        default:
            return {...state};
    }
}

export default reducer;