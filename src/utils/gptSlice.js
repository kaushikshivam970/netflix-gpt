import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const gptSlice = createSlice({
    name:'gpt',
    initialState:{
        message:null,
        gptSuggestedMovies:null
    },
    reducers:{
        addMessage:(state,action)=>{
            state.message = action.payload;
        },
        deleteMessage:(state)=>{
            state.message = null
        },
        addGptSuggestedMovies:(state,action)=>{
            state.gptSuggestedMovies = action.payload
        },
        deleteGptSuggestedMovies:(state)=>{
            state.gptSuggestedMovies = null;
        },
        deleteAll:(state,action)=>{
            state.message  = null;
            state.gptSuggestedMovies = null;
        }

    }
})

export const {addMessage, deleteMessage, addGptSuggestedMovies, deleteGptSuggestedMovies, deleteAll} = gptSlice.actions;

export default gptSlice.reducer;

