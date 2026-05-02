import { createSlice } from "@reduxjs/toolkit";


const Adminslice = createSlice({
    name:"admin",
    initialState:null,

    reducers:{

        addAdmins:(state , action)=>{
           return action.payload
        },

        removeAdmins:(state , action)=>{
           return null
        }
    }
})


export default Adminslice.reducer
export const {addAdmins , removeAdmins} = Adminslice.actions