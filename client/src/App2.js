import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { deepPurple, teal, red, cyan, deepOrange, lightBlue } from "@mui/material/colors";
import storage from "./storage";
import { Provider } from "react-redux";
import { useState } from "react";
import "@fontsource/poppins/500.css";
import { createTheme, ThemeProvider, Paper, CircularProgress } from "@mui/material";
import 'material-icons/iconfont/material-icons.css';
import "./App.css";

const Signup = React.lazy(() => import("./Component/Signup/Signup"));
const Login = React.lazy(() => import("./Component/Login/Login"));
const Forgot = React.lazy(() => import("./Component/Forgot/Forgot"));
const Admin = React.lazy(() => import("./Component/Admin-panel/Admin"));
const Calender = React.lazy(() => import("./Component/Admin-panel/Apps/Calender/Calender"));
const PageNotFound = React.lazy(() => import("./Component/Page-Not-Found/Page-Not-Found"));
const Modern = React.lazy(() => import("./Component/Admin-panel/Dashboard/Modern/Modern"));
const Notes = React.lazy(() => import("./Component/Admin-panel/Apps/Notes/Notes"));
const AuthGaurd = React.lazy(() => import("./Gaurd/AuthGaurd3"));

const App = () => {
    const [mode, setMode] = useState("light");

    storage.subscribe(() => {
        const { adminReducer } = storage.getState();
        setMode(adminReducer.dark ? "dark" : "light");
    });

    const Loader = () => <CircularProgress className="loader" color="info" />;

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
    });

    return (
        <Provider store={storage}>
            <ThemeProvider theme={myTheme}>
                <Paper sx={{ minHeight: "100vh" }}>
                    <BrowserRouter>
                        <React.Suspense fallback={<Loader />}>
                            <Routes>
                                <Route path="/" element={<Signup />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/forgot-password" element={<Forgot />} />
                                <Route element={<AuthGaurd />}>
                                    <Route path="/admin-panel" element={<Admin />}>
                                        <Route path="dashboard/modern" element={<Modern />} />
                                        <Route path="calender" element={<Calender />} />
                                        <Route path="notes" element={<Notes />} />
                                        <Route path="*" element={<PageNotFound />} />
                                    </Route>
                                </Route>
                                <Route path="*" element={<PageNotFound />} />
                            </Routes>
                        </React.Suspense>
                    </BrowserRouter>
                </Paper>
            </ThemeProvider>
        </Provider>
    );
};

export default App;
