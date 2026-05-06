import {configureStore} from '@reduxjs/toolkit'
import UserSlice from './userslice'
import PharmacySlice from './pharmacy'
import AdminSlice from './Admin'
import RequestSlice from './userRequestslice'
import AvalibleSlice from './AvaliblePharmacy'
import GetPharmacy from './getpharmacy'

const Store = configureStore({
    reducer:{
      user:UserSlice,
      pharmacy:PharmacySlice,
      admin:AdminSlice ,
      request:RequestSlice,
      apharma:AvalibleSlice,
      getpharma:GetPharmacy
    }
})

export default Store

