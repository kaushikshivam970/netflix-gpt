import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        isLoggedIn:false
    },
    reducers:{
        addUser:(state,action)=>{
            state.user = action.payload;
            state.isLoggedIn = true
        },
        removeUser:(state,action)=>{
            state.user = null;
            state.isLoggedIn = false;
        },
    }

});

export const {addUser, removeUser} = userSlice.actions;

export default userSlice.reducer;