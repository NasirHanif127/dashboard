
import {
   LOGIN_REQUEST,
   LOGIN_SUCCESS,
   USER_NOT_FOUND,
   INCORRECT_PASSWORD,
   LOGOUT_SUCCESS,
    LOGOUT_FAILED
} from "./login.state";
import Cookies from "universal-cookie";
import axios from "axios";



const loginRequest = (user) => {
   return async (dispatch) => {
      try {
         dispatch({
            type: LOGIN_REQUEST,
            payload : []
         })

         const response = await axios({
            method: "post",
            url: "/api/login",
            data: user
         })

         dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
         })
      } catch (error) {
         if (error.response.status === 404) {
            dispatch({
               type: USER_NOT_FOUND
            })
         } else {
            dispatch({
               type: INCORRECT_PASSWORD
            })
         }
      }
   }
}

const logoutRequest = ()=>{
return async (dispatch)=>{
   try {

      const cookie = new Cookies();
      let userInfo = JSON.parse(sessionStorage.getItem("user"));
      let id = userInfo.userId;
      const response = await axios({
         method : "get",
         url : "/api/logout/"+id
      })
      sessionStorage.removeItem("user");
      cookie.remove("authToken")
      dispatch({
         type : LOGOUT_SUCCESS,

      })
   } catch (error) {
      dispatch({
         type : LOGOUT_FAILED,

      })
   }
}
}

export {
   loginRequest,
   logoutRequest
}