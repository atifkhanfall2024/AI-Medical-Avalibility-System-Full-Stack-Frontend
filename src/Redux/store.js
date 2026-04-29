import {configureStore} from '@reduxjs/toolkit'
import UserSlice from './userslice'

const Store = configureStore({
    reducer:{
      user:UserSlice
    }
})

export default Store

