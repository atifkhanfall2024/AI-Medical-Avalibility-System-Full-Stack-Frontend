import { createSlice } from "@reduxjs/toolkit";


const Pharmacyslice = createSlice({
    name:"pharmacy",
    initialState:null,

    reducers:{

        addPharmacy:(state , action)=>{
           return action.payload
        },

        removePharmacy:(state , action)=>{
           return null
        }
    }
})


export default Pharmacyslice.reducer
export const {addPharmacy , removePharmacy} = Pharmacyslice.actions