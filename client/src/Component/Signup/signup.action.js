import { SIGNUP_REQUEST,SIGNUP_SUCCESS,SIGNUP_ERROR } from "./signup.state";
import axios from "axios";


const signupRequest = (formData)=>{
    return async (dispatch)=>{
        try {

            dispatch({
                type : SIGNUP_REQUEST,
                payload : []
            })

            const response = await axios({
                method : "post",
                url : "/api/signup",
                data : formData
            })


            dispatch({
                type : SIGNUP_SUCCESS,
                payload : response.data
            })
            
        } catch (error) {


            dispatch({
                type : SIGNUP_ERROR,
                error : error.response.data
            })
        }
    }
}

export{
    signupRequest
}