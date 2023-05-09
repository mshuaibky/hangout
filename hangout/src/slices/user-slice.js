import {createSlice} from '@reduxjs/toolkit'


 const   userSlice=createSlice({
   name:'user',
   initialState:{
    user:null
   },
   reducers:{
  userLogin(state,action){
      state.user=action.payload
  }
   }
})
export default userSlice.reducer
export const {userLogin} = userSlice.actions