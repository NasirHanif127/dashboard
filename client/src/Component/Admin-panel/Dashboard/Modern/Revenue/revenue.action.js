import {
    REVENUE_REQUEST,
    REVENUE_SUCCESS,
    REVENUE_FAILED
} from "./revenue.state";
import axios from "axios";
const revenueRequest = () => {
    return async (dispatch) => {

        try {

            dispatch({
                type: REVENUE_REQUEST
            })
            const response = await axios({
                method: "get",
                url: "/api/revenue-updates"
            })
            dispatch({
                type: REVENUE_SUCCESS,
                payload : response.data
            })

            
        } catch (error) {
            dispatch({
                type: REVENUE_FAILED,
            })
        }

    }

}

export {
    revenueRequest
}