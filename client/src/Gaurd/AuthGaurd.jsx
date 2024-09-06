import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAsync } from "react-async";
import axios from "axios";
// Set baseURL based on environment variables
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";  // Fallback to localhost


const verifyToken = async ({ token }) => {

    try {
        let response = await axios({
            method: "get",
            url: "/api/verify-token/" + token
        })
      
        let user = JSON.stringify(response.data.data.data)
        
        sessionStorage.setItem("user", user)
        return response

    } catch (error) {
        throw new Error(error)
    }
}

const AuthGaurd = () => {
    const cookie = new Cookies();
    const token = cookie.get("authToken");
    const { data, error, isLoading } = useAsync({
        promiseFn: verifyToken,
        token: token
    })

    if (token) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }


}
export default AuthGaurd