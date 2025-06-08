import apiEndPoints from "./apiEndPoints";
import { getReq,postReq, putReq, deleteReq, patchReq } from "../../../RootService";

const {NOWPLAYING} = apiEndPoints

export const getListOfNowPlaying = async()=>{
    try {
        const response = await getReq(NOWPLAYING);
        return response;
    } catch (error) {
        console.log(error)
    }
}