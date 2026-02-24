import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getallproductaction=createAsyncThunk(
    "product/get",
    async(__,{rejectwithvalue})=>{
     try {
        const response=await axios.get("http://localhost:3001/product/getallproduct") 
        return response.data
     } catch (error) {
        rejectwithvalue(error.response.data.message)
        
     }   
    }
)
