import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/user-slice'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import {combineReducers} from '@reduxjs/toolkit'

const persistConfigs = {
    key: 1,
    version: 1,
    storage
  }

  const reducer=combineReducers({
    user:userReducer
  })
  const persistedReducer=persistReducer(persistConfigs,reducer)


export const store = configureStore({
  reducer: persistedReducer,
})