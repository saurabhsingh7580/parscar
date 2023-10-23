import {createSlice} from '@reduxjs/toolkit';
import {ApiThunk} from '../services/ApiThunk';

const INTIAL_STATE = {
  signinResponse: {
    response: null,
    loading: false,
  },
};



export const signinslice = createSlice({
    initialState:INTIAL_STATE,
    reducers:{},
    extraReducers:builder => {
        builder.addCase(ApiThunk.Signin.pending,(state,action)=>{
            state.signinResponse.loading=true
        })

        builder.addCase(ApiThunk.Signin.fulfilled,(state,action)=>{
            state.signinResponse.response =action.payload
            state.signinResponse.loading=false
        })

        builder.addCase(ApiThunk.Signin.rejected,(state,action)=>{
            state = {...state,signinResponse:INTIAL_STATE.signinResponse}
        })
    }
})




export default signinslice.reducer