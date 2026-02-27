import { createSlice } from "@reduxjs/toolkit"
import { login_action, logout_action, register_action } from "../actions/useraction"

const initialState={
    userconnected:null,
    isfetching:false,
    error:null
}
const userslice=createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers:(builder)=>
{
builder
.addCase(login_action.pending,(state)=>    //pending=en cours
{
state.isFetching=true
state.error=null
})
.addCase(login_action.fulfilled,(state,{payload})=>  //.fulfilled=success login 
{
state.isFetching=false
state.error=null
state.userconnected=payload     //payload=retour de l'api
})
.addCase(login_action.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload
})
.addCase(logout_action.pending,(state)=>    //pending=en cours
{
state.isFetching=true
state.error=null
})
.addCase(logout_action.fulfilled,(state,{payload})=>  //.fulfilled=success login 
{
state.isFetching=false
state.error=null
state.userconnected=null    //payload=retour de l'api
})
.addCase(logout_action.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload
})
.addCase(register_action.pending,(state)=>    //pending=en cours
{
state.isFetching=true
state.error=null       
})
.addCase(register_action.fulfilled,(state,{payload})=>  //.fulfilled=success login
{
state.isFetching=false
state.error=null
state.userconnected=payload     //payload=retour de l'api
})
.addCase(register_action.rejected,(state,{payload})=>       
{
state.isFetching=false
state.error=payload
}
)
}
})
export default userslice.reducer        //reducer={l'action:.pending,.fulfilled,.rejected}
