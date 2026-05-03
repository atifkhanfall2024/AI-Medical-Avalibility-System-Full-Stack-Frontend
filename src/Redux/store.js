import {configureStore} from '@reduxjs/toolkit'
import UserSlice from './userslice'
import PharmacySlice from './pharmacy'
import AdminSlice from './Admin'
import RequestSlice from './userRequestslice'

const Store = configureStore({
    reducer:{
      user:UserSlice,
      pharmacy:PharmacySlice,
      admin:AdminSlice ,
      request:RequestSlice
    }
})

export default Store

