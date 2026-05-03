import { createSlice } from "@reduxjs/toolkit";


const UserRequestslice = createSlice({
    name:"Request",
    initialState:null,

    reducers:{

        addRequest:(state , action)=>{
           return action.payload
        },

        removeRequest:(state , action)=>{
           return null
        }
    }
})


export default UserRequestslice.reducer
export const {addRequest , removeRequest} = UserRequestslice.actions