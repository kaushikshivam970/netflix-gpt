import apiEndPoints from "./apiEndPoints";
import { getReq,postReq, putReq, deleteReq, patchReq } from "../../../RootService";

const {NOWPLAYING,POPULAR,TOPRATED,UPCOMING} = apiEndPoints

export const getListOfNowPlaying = async()=>{
    try {
        const response = await getReq(NOWPLAYING);
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const getListOfPopular = async()=>{
    try {
        const response = await getReq(POPULAR);
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const getListOfTopRated = async()=>{
    try {
        const response = await getReq(TOPRATED);
        return response;
    } catch (error) {
        console.log(error)
    }
}
export const getListOfUpcoming = async()=>{
    try {
        const response = await getReq(UPCOMING);
        return response;
    } catch (error) {
        console.log(error)
    }
}