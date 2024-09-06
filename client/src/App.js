import * as React from "react"
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { deepPurple, teal, red, cyan, deepOrange, lightBlue } from "@mui/material/colors";
import storage from "./storage";
import { Provider } from "react-redux";
import { useState } from "react";
import "@fontsource/poppins/500.css"
import { createTheme,
     ThemeProvider,
      Paper,
      CircularProgress
     } from "@mui/material";
import 'material-icons/iconfont/material-icons.css';
import "./App.css"

const Signup = React.lazy(() => import("./Component/Signup/Signup"));
const Login = React.lazy(() => import("./Component/Login/Login"));
const Forgot = React.lazy(() => import("./Component/Forgot/Forgot"));
const Admin = React.lazy(() => import("./Component/Admin-panel/Admin"));
const Calender = React.lazy(() => import("./Component/Admin-panel/Apps/Calender/Calender"));
const PageNotFound = React.lazy(() => import("./Component/Page-Not-Found/Page-Not-Found"));
const Modern = React.lazy(() => import("./Component/Admin-panel/Dashboard/Modern/Modern"));
const Notes = React.lazy(() => import("./Component/Admin-panel/Apps/Notes/Notes"));
// const AuthGaurd = React.lazy(() => import("./Gaurd/AuthGaurd"));
const AuthGaurd = React.lazy(() => import("./Gaurd/AuthGaurd3"));




// main compunent
const App = () => {
    const [mode, setMode] = useState("light")

    storage.subscribe(() => {
        const { adminReducer } = storage.getState();
        adminReducer.dark ? setMode("dark") : setMode("light")
    })

const Loader = ()=>{
    return (
        <CircularProgress className="loader" color="info" />
    )
}

    const myTheme = createTheme({
        palette: {
            mode: mode,
            primary: deepPurple,
            success: cyan,
            error: red,
            secondary: teal,
            warning: deepOrange,
            info: lightBlue
        },
        typography: {
            fontFamily: "Poppins"
        }
    })




    return (
        <>
            <Provider store={storage}>
                <ThemeProvider theme={myTheme}>
                    <Paper sx={{ minHeight: "100vh" }}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={
                                    <React.Suspense fallback={<Loader />}>
                                        <Signup />
                                    </React.Suspense>} />
                                <Route path="/login" element={
                                    <React.Suspense fallback={<Loader />}>
                                        <Login />
                                    </React.Suspense>} />
                                <Route path="/signup" element={
                                    <React.Suspense fallback={<Loader />}>
                                        <Signup />
                                    </React.Suspense>} />
                                <Route path="/forgot-password" element={
                                    <React.Suspense fallback={<Loader />}>
                                        <Forgot />
                                    </React.Suspense>} />
                                <Route element={
                                    <React.Suspense fallback={<Loader />}>
                                        <AuthGaurd />
                                    </React.Suspense>}>
                                    <Route path="/admin-panel" element={
                                        <React.Suspense fallback={<Loader />}>
                                            <Admin />
                                        </React.Suspense>} >
                                        <Route path="dashboard/modern" element={
                                            <React.Suspense fallback={<Loader />}>
                                                <Modern />
                                            </React.Suspense>} />
                                        <Route path="calender" element={
                                            <React.Suspense fallback={<Loader />}>
                                                <Calender />
                                            </React.Suspense>} />
                                        <Route path="notes" element={
                                            <React.Suspense fallback={<Loader />}>
                                                <Notes />
                                            </React.Suspense>} />
                                        <Route path="*" element={
                                            <React.Suspense fallback={<Loader />}>
                                                <PageNotFound />
                                            </React.Suspense>} />
                                    </Route>
                                </Route>
                                <Route path="/*" element={
                                    <React.Suspense fallback={<Loader />}>
                                        <PageNotFound />
                                    </React.Suspense>} />
                            </Routes>
                        </BrowserRouter>
                    </Paper>
                </ThemeProvider>
            </Provider>
        </>
    );

}

export default App