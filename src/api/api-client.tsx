
export const endpoint = import.meta.env.VITE_APP_SERVICE_URI ?import.meta.env.VITE_APP_SERVICE_URI : 'http://localhost:4133/';


export function getCategoriesRequest() {
    return fetch(endpoint + "categories")
}

export function getCategoryInfo(categoryId:string) {
    return fetch(endpoint + 'category/' + categoryId)
}

export async function getWindow() {
    return await(await fetch(endpoint + "wall/window")).json()

}

export async function getDoor() {
    return await(await fetch(endpoint + "wall/door")).json()

}