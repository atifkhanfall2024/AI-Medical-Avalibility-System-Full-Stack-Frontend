import {configureStore} from '@reduxjs/toolkit'
import UserSlice from './userslice'
import PharmacySlice from './pharmacy'
import AdminSlice from './Admin'

const Store = configureStore({
    reducer:{
      user:UserSlice,
      pharmacy:PharmacySlice,
      admin:AdminSlice
    }
})

export default Store

