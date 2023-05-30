import axios from "axios";
import { publicRequest } from "./Request";

export const LoginCalls = async(userCredential,dispatch) => {
    dispatch({type: "LOGIN_START"});
    try{
        const res = await publicRequest.post("/api/auth/login", userCredential);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    }catch(err){
        dispatch({type: "LOGIN_FAILURE", payload: err});
    }
}