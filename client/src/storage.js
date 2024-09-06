import {
    createStore ,
     applyMiddleware,
     combineReducers
    } from "redux";
//  import logger from "redux-logger";
import thunk from "redux-thunk";
import signupReducer from "./Component/Signup/signup.reducer";
import loginReducer from "./Component/Login/login.reducer";
import forgotReducer from "./Component/Forgot/forgot.reducer";
import revenueReducer from "./Component/Admin-panel/Dashboard/Modern/Revenue/revenue.reducer";
import adminReducer from "./Component/Admin-panel/admin.reducer";

const middlewares = applyMiddleware(
   // logger,
    thunk
)
    // combine reducer us waqat use karen gey jab reducers ki tadad zeada ho
const root = combineReducers({
    signupReducer,
    loginReducer,
    forgotReducer,
    revenueReducer,
    adminReducer
})

const storage = createStore(root,{},middlewares);

export default storage