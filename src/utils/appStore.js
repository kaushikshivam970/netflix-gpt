import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; 
import moviesReducer from "./movieSlice"
import configReducer from "./configSlice"
import gtpReducer from "./gptSlice"
const appStore = configureStore({
    reducer:{
        user:userReducer,
        movies:moviesReducer,
        config:configReducer,
        gpt:gtpReducer
    }
})


export default appStore;