import { createSlice } from "@reduxjs/toolkit";


const movieSlice = createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        popularMovies:null,
        topRatedMovies:null,
        upcomingMovies:null,
        mainMovie:null
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies:(state,action)=>{
            state.popularMovies = action.payload;
        },
        addTopRatedMovies:(state,action)=>{
            state.topRatedMovies = action.payload;
        },
        addUpcomingMovies:(state,action)=>{
            state.upcomingMovies = action.payload;
        },
        addMainMovie:(state,action)=>{
            state.mainMovie = action.payload;
        },
        removeNowPlayingMovies:(state)=>{
            state.nowPlayingMovies = null;
        }
    }
})


export const {addNowPlayingMovies, addPopularMovies, addTopRatedMovies,addUpcomingMovies,addMainMovie, removeNowPlayingMovies} = movieSlice.actions

export default movieSlice.reducer;