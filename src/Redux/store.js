import {configureStore} from '@reduxjs/toolkit'
import UserSlice from './userslice'
import PharmacySlice from './pharmacy'

const Store = configureStore({
    reducer:{
      user:UserSlice,
      pharmacy:PharmacySlice
    }
})

export default Store

