import { createSlice } from "@reduxjs/toolkit";


const movieSlice = createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        mainMovie:null
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies = action.payload;
        },
        addMainMovie:(state,action)=>{
            state.mainMovie = action.payload;
        },
        removeNowPlayingMovies:(state)=>{
            state.nowPlayingMovies = null;
        }
    }
})


export const {addNowPlayingMovies, addMainMovie, removeNowPlayingMovies} = movieSlice.actions

export default movieSlice.reducer;