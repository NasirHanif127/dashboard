import { SIGNUP_REQUEST,
     SIGNUP_SUCCESS,
      SIGNUP_ERROR
     } from "./signup.state";


const Model = {
    isLoader: false,
    error: null,
    data: null
}

const signupReducer = (state = Model, action) => {

    
    switch (action.type) {
        case SIGNUP_REQUEST: return {
            ...state,
            isLoader: true,
            error: null,
            data: null
        }

        case SIGNUP_SUCCESS : return {
            ...state,
            isLoader: false,
            error: null,
            data: action.payload

        }

        case SIGNUP_ERROR : return {
            ...state,
            isLoader: false,
            error: action.error,
            data: null

        }

        default : return state
    }
}
export default signupReducer
