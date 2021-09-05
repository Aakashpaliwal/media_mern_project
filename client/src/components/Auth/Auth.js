import React, { Fragment, useState } from "react";
import {
  Avatar,
  Paper,
  Typography,
  Button,
  Grid,
  Container,
} from "@material-ui/core";
import useStyles from "./styles.js";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import Input from "./Input.js";
import Icon from "./icon.js";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signin, signup } from "../../actions/auth.js";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const googleSuccess = async (res) => {
    console.log("googleres=", res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log("googlerr", error);
    console.log("uanble to login through google");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">{isSignup ? "SignUp" : "SignIn"}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <Fragment>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </Fragment>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              clientId="999261520012-1311ftjvossdvu36ooke897447s793cf.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default Auth;
