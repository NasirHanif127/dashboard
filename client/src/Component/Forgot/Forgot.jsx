import {
    FormControlLabel,
    Checkbox,
    Grid,
    Container,
    Button,
    TextField,
    Stack,
    InputAdornment,
    IconButton,
    OutlinedInput,
    FormControl,
    InputLabel
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState , useEffect } from "react";
import { forgotRequest ,changePassword } from "./forgot.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
    const [verifyForm, setVerifyForm] = useState(false);
    const dispatch = useDispatch();
    const forgotReducer = useSelector(response => response.forgotReducer);
    const navigate = useNavigate()
const [input ,setInput]= useState({
    email : "",
    code : "",
    password : ""
})

    const [error , setError]= useState({
        email : {
            state : false,
            message : ""
        },
        code:{
            state : false,
            message : ""
        }
    })

    const handleInput = (e)=>{
      const input =  e.target 
      const key = input.name 
      const value = input.value 
      return setInput((oldData)=>{
        return{
            ...oldData,
            [key] : value
        }
      })
    }

const checkUser = ()=>{
    if(forgotReducer.success){
        return setVerifyForm(true)
    }

    if(forgotReducer.userNotFound){
        return setError((oldData)=>{
                return{
                    oldData,
                    email : {
                        state : true,
                        message : "User dose not exists !"
                    }
                }
        })
    }
}

const checkForNewPassword = ()=>{
    if(forgotReducer.passwordChanged){
      return  navigate("/login");
    }

    if(forgotReducer.invalidCode){
        return setError((oldData)=>{
            return{
                code:{
                    ...oldData,
                    state : true,
                    message : "invalide verfication code !"
                }
            }
        })
    }
}

    useEffect(()=>{
        checkUser();
        checkForNewPassword()
    },[forgotReducer])


    const design = (
        <>
            <Container>
                <Grid container>
                    <Grid item xs={12} sm={6} >
                        <h1>Login Image</h1>
                        <Stack>
                            <img src="images/login.png" alt="login-img" width="100%" height="100%" />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <h1>Forgot Password</h1>

                        {
                           !verifyForm
                                ?
                                <form onSubmit={(e)=>dispatch(forgotRequest(e))}>
                                    <Stack spacing={3}>
                                        <TextField
                                            name="email"
                                            label="Email"
                                             variant="outlined" 
                                             error={error.email.state} 
                                             helperText={error.email.message} 
                                             value={input.email} 
                                             onChange={handleInput}
                                             
                                        />
                                        <div>
                                            <LoadingButton 
                                             loading={forgotReducer.isLoading}
                                                type="submit"
                                                variant="contained">
                                                Forgot</LoadingButton>
                                        </div>
                                    </Stack>
                                </form>
                                :
                                <form onSubmit={(e)=>dispatch(changePassword(e , input))}>
                                    <Stack spacing={3}>
                                        <TextField
                                            name="code"
                                            label="Verification Code"
                                            variant="outlined" 
                                            type="number" 
                                            value={input.code} 
                                             onChange={handleInput} 
                                             error={error.code.state}
                                             helperText={error.code.message}
                                        />
                                        <TextField
                                            name="password"
                                            label="New Password"
                                            variant="outlined" 
                                            value={input.password} 
                                             onChange={handleInput}
                                        />
                                        <div>
                                            <LoadingButton 
                                                type="submit"
                                                variant="contained">
                                                Submit
                                            </LoadingButton>
                                        </div>
                                    </Stack>
                                </form>
                        }


                    </Grid>
                </Grid>
            </Container>
        </>
    );
    return design
}

export default Forgot