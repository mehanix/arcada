import { FurnitureData } from "../stores/FurnitureStore";

export const endpoint = process.env.REACT_APP_SERVICE_URI ? process.env.REACT_APP_SERVICE_URI : 'http://localhost:4133/';


export function getCategoriesRequest() {
    return fetch(endpoint + "categories")
}

export function getCategoryInfo(categoryId:string) {
    return fetch(endpoint + 'category/' + categoryId)
}

export function getWindow():FurnitureData {
    fetch(endpoint + "wall/window").then (res => {
        return res;
    })
    return undefined;
}