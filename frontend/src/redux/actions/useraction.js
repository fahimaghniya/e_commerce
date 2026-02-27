import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login_action=createAsyncThunk(        //tasn3elna thunk qui tranmet l'action loginaction en trois états
    "user/login",
    async({email,password}, {rejectWithValue})=>{
        try {
             const response=await axios.post("http://localhost:3001/user/login",{email,password})   //consommation de l'api de login
                    console.log("la retour de l'api est",response.data)
                    const accesstoken=localStorage.setItem("token",response.data.data.accesstoken) //stocker le token dans le lacal storage
                   const refreshtoken=localStorage.setItem("refreshtoken",response.data.data.refreshtoken)
                    return response.data.data
            
        } catch (error) { return rejectWithValue(error.response.data.message)
            
        }
        
    }
)
export const logout_action=createAsyncThunk(
    "user/logout",
async(_,{rejectWithValue})=>{
    try {
        const refreshtoken=localStorage.getItem("refreshtoken")
        const response=axios.post("http://localhost:3001/user/logout",{refreshtoken})
        localStorage.removeItem("refreshtoken")
        localStorage.removeItem("token")
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})
export const register_action=createAsyncThunk(
    "user/register",
async({fullname,email,password,adresse,phonenumber}, {rejectWithValue})=>{
    try {
            const response=await axios.post("http://localhost:3001/user/inscriptionuser",{fullname,email,password,adresse,phonenumber})   //consommation de l'api de register
            console.log("la retour de l'api est",response.data)
            return response.data.data
    } catch (error) { return rejectWithValue(error.response.data.message)
        
    }
}
)
