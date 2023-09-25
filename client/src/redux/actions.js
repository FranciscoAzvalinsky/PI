export const PREV_HANDLER = 'prev_handler';
export const NEXT_HANDLER = 'next_handler';
export const FIRST_RENDER = 'first_render';
export const LOAD_NAME = 'load_name';
export const LOAD_NAMED = 'load_named';
export const LOAD_DOGS = 'load_dogs';
export const LOADED_DOGS = 'loaded_dogs';
export const LOAD_TEMPERAMENTS = 'load_temperaments';
export const ORIGIN_OF_DOGS = 'origin_of_dogs';
export const FILTER_TEMPERAMENTS = 'filter_temperaments';
export const ORDER_BY_TYPE = 'order_by_type';
export const ORDER_WAY = 'order_way';
export const ORDER = 'order';
export const RESET_FILTER = 'reset_filter';
export const RESET_NAME = 'reset_name';
export const LOAD_FILTER_TEMPERAMENTS = 'load_filters_temperaments';
export const UNRESET = 'unreset';


export function firstRender(dogs, itemsPerPage){
    let fragment = [];
    fragment = dogs.slice(0, itemsPerPage)
    return {
        type: FIRST_RENDER,
        payload: {fragment: fragment, currentPage: 0}
    }
}

export function loadName(name){
    return {
        type: LOAD_NAME,
        payload: name
    }
}

export function loadNamed(){
    return {
        type: LOAD_NAMED,
        payload: ''
    }
}

export function loadDogs(dogs){
    return{
        type: LOAD_DOGS,
        payload: {fragment: dogs}
    }
}

export function loadedDogs(){
    return{
        type: LOADED_DOGS,
        payload: 1
    }
}

export function loadTemperaments(temperaments){
    return{
        type: LOAD_TEMPERAMENTS,
        payload: {fragment: temperaments}
    }
}

export function nextHandler (dogs, itemsPerPage, currentPage) {
    const sigtPag = currentPage + 1;
    const total = dogs.length;
    const index = sigtPag * itemsPerPage;

    if (index >= total) {
        let fragment = [];
        fragment = dogs.slice(currentPage * itemsPerPage, index );
        
        return {
        type: NEXT_HANDLER,
        payload: {fragment: fragment, currentPage: currentPage}
        }
    }
    let fragment = []
    fragment=dogs.slice(index, (sigtPag + 1) * itemsPerPage)
    return {
        type: NEXT_HANDLER,
        payload: {fragment: fragment, currentPage: sigtPag}
    }
}


export function prevHandler (dogs, itemsPerPage, currentPage) {
    const antPag = currentPage - 1;
    const index = antPag * itemsPerPage;

    if (currentPage === 0) {
        return {
            type: PREV_HANDLER,
        }
    }
    let fragment = []
    fragment = dogs.slice(index, currentPage * itemsPerPage)
    return {
        type: PREV_HANDLER, 
        payload: {fragment: fragment, currentPage: antPag}
    }
}


export function originOfDogs(value) {
     return {
        type: ORIGIN_OF_DOGS,
        payload: value
    }
}

export function filterTemperaments(){
    return {
        type: FILTER_TEMPERAMENTS,
    }
}

export function orderByType(value){
    return {
        type: ORDER_BY_TYPE,
        payload: value
    }
}

export function orderWay(value){
    return {
        type: ORDER_WAY,
        payload: value
    }
}

export function order () {
    return {
        type: ORDER
    }
}

export function resetFilter(){
    return {
        type: RESET_FILTER,
        payload: {
            orderWay: 'A',
            orderType: 'raza',
            filteredTemperaments: ['All temperaments']
        }
    }
}

export function resetName(){
    return {
        type: RESET_NAME,
        payload: ''
    }
}

export function unreset(){
    return {
        type: UNRESET,
        payload: {
            filteredTemperaments: []
        }
    }
}

export function loadFilterTemperaments(value){
    return {
        type: LOAD_FILTER_TEMPERAMENTS,
        payload: value
    }
}