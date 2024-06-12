import { NEXT_HANDLER, PREV_HANDLER, FIRST_RENDER, LOAD_DOGS, ORIGIN_OF_DOGS, LOAD_TEMPERAMENTS, LOADED_DOGS, FILTER_TEMPERAMENTS, ORDER_BY_TYPE, ORDER_WAY, ORDER, LOAD_NAME, LOAD_NAMED, RESET_FILTER, RESET_NAME, LOAD_FILTER_TEMPERAMENTS, UNRESET, DELETE_FILTER_TEMP } from "./actions";

const initialState = {
    dogs: [],
    gottenDogs: [],
    allDogs: [],
    showing: [],
    temperaments: [],
    filteredTemperaments: [],
    firstLoad: true,
    dogsName: '',
    orderWay: 'A',
    orderType: 'raza',
    loadedDogsSwitch: 0,
    currentPage: 0,
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
                let dog1 = dog.name.toLowerCase();
                let dog2= state.dogsName.toLowerCase();
                return dog1.includes(dog2)
            })
            return {
                ...state,
                currentPage: 0,
                dogs: namedDogs,
            }

        
        case LOAD_DOGS:
            if (state.firstLoad){
                return{
                    ...state,
                    dogs: action.payload.fragment,
                    gottenDogs: action.payload.fragment,
                    allDogs: action.payload.fragment,
                    firstLoad: false,
                }
            } else {
                return {
                    ...state,
                    allDogs: action.payload.fragment
                }
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
            if (action.payload === 'Api'){
                return {
                    ...state,
                    dogs: state.allDogs.slice(0, 172),
                    gottenDogs: state.allDogs.slice(0, 172),
                    currentPage: 0,
                }
            } else if (action.payload === 'Bdd'){
                return {
                    ...state,
                    dogs: state.allDogs.slice(172),
                    gottenDogs: state.allDogs.slice(172),
                    currentPage: 0,
                }
            }
            break;

        case LOAD_FILTER_TEMPERAMENTS:
            if (action.payload !== 'All temperaments'){
                return {
                    ...state,
                    filteredTemperaments: [...state.filteredTemperaments, action.payload]
                }
            }
            else {
                return {
                    ...state
                }
            }
        
        case FILTER_TEMPERAMENTS:
            if (state.filteredTemperaments[0] !=='All temperaments' && state.filteredTemperaments[0] ){
                let filteredDogs = state.gottenDogs.filter((dog) => {
                    if (dog.temperament) {
                        console.log(state.filteredTemperaments)
                        const temperaments = dog.temperament.split(',').map((temper) => temper.trim());
                        return state.filteredTemperaments.every((temper) => temperaments.includes(temper));
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

        case DELETE_FILTER_TEMP:
            let filteredTemper = [...state.filteredTemperaments];
            filteredTemper.splice(action.payload, 1);
            return {
                ...state,
                filteredTemperaments: filteredTemper,
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
                        if ((parseFloat(filteredDogs[j].weight.metric.slice(2,-1)) > parseFloat(filteredDogs[j+1].weight.metric.slice(2,-1)) && state.orderWay==='A') || (parseFloat(filteredDogs[j].weight.metric.slice(2,-1)) < parseFloat(filteredDogs[j+1].weight.metric.slice(2,-1)) && state.orderWay==='D')){
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
            break;

        case RESET_FILTER:
            return {
                ...state,
                orderWay: action.payload.orderWay,
                orderType: action.payload.orderType,
                filteredTemperaments: action.payload.filteredTemperaments,
            }

        case UNRESET:
            return {
                ...state,
                filteredTemperaments: action.payload.filteredTemperaments
            }

        case RESET_NAME:
            return {
                ...state,
                dogsName: action.payload,
            }

        default:
            return {...state};
    }
}

export default reducer;