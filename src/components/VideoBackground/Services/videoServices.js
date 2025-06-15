import {getReq,postReq} from "../../../RootService/index";
import apiEndPoints from "./apiEndPoints";

const {FETCHVIDEOS} = apiEndPoints;

export const fetchVideoInfo = async(id)=>{
    try {
        const response = await getReq(FETCHVIDEOS + `${id}/videos`);
        return response
    } catch (error) {
        // console.log(error)
    }
}