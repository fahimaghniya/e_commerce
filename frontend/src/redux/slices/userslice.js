import { createSlice } from "@reduxjs/toolkit"
import { login_action } from "../actions/useraction"

const initialstate={
    userconnected:null,
    isfetching:false,
    error:null
}
const userslice=createSlice({
    name:"users",
    initialstate,
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


}
})
export default userslice.reducer        //reducer={l'action:.pending,.fulfilled,.rejected}
