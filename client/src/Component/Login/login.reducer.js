import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    USER_NOT_FOUND,
    INCORRECT_PASSWORD,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED
 } from "./login.state";

const Model = {
    isLoading : false,
    userNotFound : false,
    inCorrectPassword : false,
    isLogged : false,
    isLogout : false,
    data : null
}
 const loginReducer = (state=Model , action)=>{

    switch (action.type) {
        case LOGIN_REQUEST : return{
            ...state,
            isLoading : true,
            userNotFound : false,
            inCorrectPassword : false,
            isLogged : false,
            isLogout : false,
            data : null
        }

        case LOGIN_SUCCESS : return{
            ...state,
            isLoading : false,
            userNotFound : false,
            inCorrectPassword : false,
            isLogged : true,
            isLogout : false,
            data : action.payload
        }

        case LOGOUT_SUCCESS : return{
            ...state,
            isLoading : false,
            userNotFound : false,
            inCorrectPassword : false,
            isLogged : false,
            isLogout : true,
            data : null
        }

        case LOGOUT_FAILED : return{
            ...state,
            isLoading : false,
            userNotFound : false,
            inCorrectPassword : false,
            isLogout : false,
            isLogged : true,
        }

        case USER_NOT_FOUND : return{
            ...state,
            isLoading : false,
            userNotFound : true,
            inCorrectPassword : false,
            isLogged : false,
            isLogout : false,
            data : null
        }

        case INCORRECT_PASSWORD : return{
            ...state,
            isLoading : false,
            userNotFound : false,
            inCorrectPassword : true,
            isLogged : false,
            isLogout : false,
            data : null
        }
            
        default : return state   
    
    }

 }

 export default loginReducer