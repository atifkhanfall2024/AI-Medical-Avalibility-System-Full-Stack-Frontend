import { createSlice } from "@reduxjs/toolkit";


const GetPharmacyslice = createSlice({
    name:"getpharmacy",
    initialState:null,

    reducers:{

        addGetPharmacy:(state , action)=>{
           return action.payload
        },

        removeGetPharmacy:(state , action)=>{
           return null
        }
    }
})


export default GetPharmacyslice.reducer
export const {addGetPharmacy , removeGetPharmacy} = GetPharmacyslice.actions