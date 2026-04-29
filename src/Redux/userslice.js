import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name:"user",
    initialState:null,

    reducers:{

        addUsers:(state , actions)=>{
            return actions.payload
        },

        removeUsers:(state , actions)=>{
             return null
        }

    }
})

export default UserSlice.reducer;
export const {addUsers , removeUsers} = UserSlice.actions
