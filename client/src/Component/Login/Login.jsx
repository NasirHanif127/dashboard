
import {
  FormControlLabel,
  Checkbox,
  Grid,
  Container,
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  FormHelperText
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "./login.action";
import Cookies from "universal-cookie";



const Login = () => {
  const cookie = new Cookies()
  const dispatch = useDispatch();
  const [type, setType] = useState("password")
  const loginReducer = useSelector(response => response.loginReducer);
  const [remember, setRemember] = useState(false);
  const navegate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState({
    username: {
      state: false,
      message: ""
    },
    password: {
      state: false,
      message: ""
    }
  })



  const [input, setInput] = useState({
    username: "",
    password: ""
  })

  const checkForLogin = () => {
    if (loginReducer.userNotFound) {
      return setError((oldData) => {
        return {
          ...oldData,
          username: {
            state: true,
            message: "username does not exists !"
          }

        }
      })
    }

    if (loginReducer.inCorrectPassword) {
      return setError((oldData) => {
        return {
          ...oldData,
          password: {
            state: true,
            message: "Wrong Password !"
          }

        }
      })
    }

    if (loginReducer.isLogged) {
      cookie.set("authToken", loginReducer.data.token, { maxAge: 86400 })

      return navegate("/admin-panel/dashboard/modern")
    }
  }


  const rememberMe = () => {
    let checkUser = localStorage.getItem("user");
    if (checkUser) {
      let user = JSON.parse(localStorage.getItem("user"));
      return (
        setInput(user),
        setRemember(true),
        setDisabled(false)
      )
    }
  }

  useEffect(() => {
    checkForLogin();
    rememberMe()
  }, [loginReducer])

  const schema = yup.object().shape({
    username: yup.string().required().email(),
    password: yup.string().required()
  })


  const validateSubmit = async () => {
    const isValid = await schema.isValid(input)
    return setDisabled(!isValid)
  }

  const validateInput = async (e) => {
    const key = e.target.name;
    try {
      await schema.validateAt(key, input)
      return setError((oldData) => {
        return {
          ...oldData,
          [key]: {
            state: false,
            message: ""
          }
        }
      })

    } catch (error) {
      const message = error.errors
      return setError((oldData) => {
        return {
          ...oldData,
          [key]: {
            state: true,
            message: message[0]
          }
        }
      })
    }
  }

  const handleInput = (e) => {
    let input = e.target;
    const key = input.name;
    const value = input.value;
    return setInput((oldData) => {
      return {
        ...oldData,
        [key]: value
      }

    })
  }



  const login = (e) => {
    e.preventDefault();
    if (remember) {
      let string = JSON.stringify(input);
      localStorage.setItem("user", string)
    }
    return dispatch(loginRequest(input))

  }


  return (
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
            <h1>Login Form</h1>
            <form onSubmit={login}>
              <Stack direction="column" spacing={3}>
                <TextField
                  value={input.username}
                  onChange={handleInput}
                  onKeyDown={validateSubmit}
                  error={error.username.state}
                  helperText={error.username.message}
                  onInput={validateInput}
                  autoComplete="username"
                  name="username"
                  label={"Enter Email"}
                  type="email"
                />
                {/* add formcontroll tag in error */}
                <FormControl error={error.password.state}>
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput
                    value={input.password}
                    onChange={handleInput}
                    onKeyDown={validateSubmit}
                     autoComplete="current-password"
                   // error={error.password.state}
                    // helperText={error.password.message}
                    onInput={validateInput}
                    name="password"
                    label={"Password"}
                    type={type}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={
                            () => type === "password" ?
                              setType("text") : setType("password")
                          }
                        >
                          {
                            type === "password"
                              ?
                              <span className="material-icons-outlined">visibility</span>
                              :
                              <span className="material-icons-outlined">visibility_off</span>

                          }
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {/* add formhelper text */}
                   <FormHelperText>{error.password.message}</FormHelperText>
                </FormControl>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormControlLabel
                    control={<Checkbox
                      size="large"
                      onChange={() => setRemember(!remember)}
                      checked={remember}
                    />}
                    label="Remember me !"
                  />
                  <LoadingButton
                    loading={loginReducer.isLoading}
                    disabled={disabled}
                    variant="contained"
                    color="secondary"
                    type="submit">
                    Login
                  </LoadingButton>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent="space-between"
                  alignItems="center">
                  <Link style={{ textDecoration: "none" }}
                    to="/">
                    CREATE NEW ACCOUNT !
                  </Link>
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/forgot-password">Forgot Password !
                  </Link>
                </Stack>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Login