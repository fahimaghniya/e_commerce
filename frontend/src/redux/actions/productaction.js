import { createAsyncThunk } from "@reduxjs/toolkit";

export const getallproductaction=createAsyncThunk(
    "product/get",
    async(__,{rejectwithvalue})=>{
     try {
        const response=await axios.get("http://localhost:3001/product/getallproduct") 
        return response.data.data
     } catch (error) {
        rejectwithvalue(error.response.data.message)
        
     }   
    }
)
