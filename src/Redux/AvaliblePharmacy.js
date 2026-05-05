import { createSlice } from "@reduxjs/toolkit";


const Avalibleslice = createSlice({
    name:"avaliblePharmacy",
    initialState:null,

    reducers:{

        addNearPharmacy:(state , action)=>{
           return action.payload
        },

        removeNearPharmacy:(state , action)=>{
           return null
        }
    }
})


export default Avalibleslice.reducer
export const {addNearPharmacy , removeNearPharmacy} = Avalibleslice.actions