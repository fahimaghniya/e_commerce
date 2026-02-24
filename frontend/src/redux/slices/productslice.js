import { createSlice } from "@reduxjs/toolkit"
import { login_action } from "../actions/useraction"
import { getallproductaction } from "../actions/productaction"

const initialState={
    productlist:[],
    isfetching:false,
    error:false
}
const productslice=createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers:(builder)=>
{
builder
.addCase(getallproductaction.pending,(state)=>    //pending=en cours
{
state.isFetching=true
state.error=null
})
.addCase(getallproductaction.fulfilled,(state,{payload})=>  //.fulfilled=
{
state.isFetching=false
state.error=null
state.productlist=payload.data     //payload=retour de l'api
})
.addCase(getallproductaction.rejected,(state,{payload})=>
{
state.isFetching=false
state.error=payload
})


}
})
export default productslice.reducer        //reducer={l'action:.pending,.fulfilled,.rejected}
