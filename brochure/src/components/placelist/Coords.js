import { create } from "zustand";

const useCurrCoords = create(set => ({

    lat: 0,
    lng: 0,
    setCurrCoords: (latitude, longitude) => set(() => ({lat: latitude, lng: longitude}))
}))

export default useCurrCoords;