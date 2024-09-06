import {
    EMAIL_SENDED,
    USER_NOT_FOUND,
    FORGOT_REQUEST,
    CHANGED_PASSWORD_REQUEST,
    PASSWORD_CHANGED,
    INVALID_CODE
} from "./forgot.state";

import axios from "axios"


const forgotRequest = (e) => {
    e.preventDefault()
    const email = e.target[0].value
    return async (dispatch) => {
        dispatch({
            type: FORGOT_REQUEST
        })
        try {
            const response = await axios({
                method: "post",
                url: "/api/forgot-password",
                data: {
                    email: email
                }
            });

            dispatch({
                type: EMAIL_SENDED
            })
        } catch (error) {
            dispatch({
                type: USER_NOT_FOUND
            })
        }
    }

}


const changePassword = (e , formData)=>{
    e.preventDefault();
    return async (dispatch)=>{
            dispatch({
                type : CHANGED_PASSWORD_REQUEST,

            })

        try {
            const response = await axios({
                method : "put",
                url : "/api/forgot-password",
                data : formData
            });
            
            dispatch({
                type : PASSWORD_CHANGED
                
            })


        } catch (error) {
            dispatch({
                type : INVALID_CODE
                
            })
        }

    }
    
   

}



export {
    forgotRequest,
    changePassword
}