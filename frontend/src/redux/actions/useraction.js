import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login_action=createAsyncThunk(        //tasn3elna thunk qui tranmet l'action loginaction en trois états
    "user/login",
    async({email,password}, {rejectWithValue})=>{
        try {
             const response=await axios.post("http://localhost:3001/user/login",{email,password})   //consommation de l'api de login
                    console.log("la retour de l'api est",response.data)
                    const accesstoken=localStorage.setItem("token",response.data.data.accesstoken) //stocker le token dans le lacal storage
                    return response.data.data
            
        } catch (error) { return rejectWithValue(error.response.data.message)
            
        }
        
    }
)