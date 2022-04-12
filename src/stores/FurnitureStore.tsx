import create from "zustand";
import { getCategoriesRequest, getCategoryInfo } from "../api/api-client";

export interface Category {
    id: string,
    name: string
}

export interface FurnitureData {
    id: string,
    name: string,
    width: string,
    height: string
}

export interface FurnitureStore {
    categories: Category[],
    currentFurnitureData: FurnitureData[]
    getCategories: () => void,
    getCurrentFurnitureData: (categoryId:string) => void
}

export const useFurnitureStore = create<FurnitureStore>(set => ({
    categories: [],
    currentFurnitureData: [],
    getCategories: async () => {
        let res = await(await getCategoriesRequest()).json()
            set(() => ({
                categories: res
            }));
    },
    getCurrentFurnitureData: async (categoryId:string) => {
        let res = await(await getCategoryInfo(categoryId)).json()
        set(() => ({
            currentFurnitureData: res.objects
        }));
    }
}))