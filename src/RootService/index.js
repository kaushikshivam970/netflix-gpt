import axios from "axios";
import { API_TOKEN } from "../utils/constants";
import Dev from "./dev";
import Prod from "./prod";

const RootService = (env = "developement" ) => env === "developement" ? Dev : Prod;

const {BASEURL = ""} = RootService(import.meta.env.VITE_NODE_ENV?.trim());

(()=>{
    axios.interceptors.request.use(function(config){
        config.headers = {
            accept:"application/json",
            Authorization:`Bearer ${API_TOKEN}`
        }
        return config
    },function (error){
        return Promise.reject(error);
    })

    axios.interceptors.response.use(function(response){
        return response;
    },function(error){
        return Promise.reject(error)
    });
})()


export const getReq = async(url) => {
    return axios.get(BASEURL + url);
}

export const postReq = async( url,data) => {
  return axios.post(BASEURL+url,data)
}

export const putReq = async (url, data) => {

  return axios.put(BASEURL + url, data)
  
}
export const patchReq = async (url, data) => {

  return axios.patch(BASEURL + url, data)
  
}
export const deleteReq = async (url) => {

  return axios.delete(BASEURL + url)
  
}