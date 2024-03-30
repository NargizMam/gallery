import React, { useState } from 'react';
import { Alert, Avatar, Box, Container, Grid, Link, TextField, Typography } from '@mui/material';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {selectLoginError, selectLoginLoading} from './usersSlice.ts';
import { googleLogin, login } from './usersThunks.ts';
import { GoogleLogin } from '@react-oauth/google';
import { LoginMutation } from '../../types';
import {LoadingButton} from "@mui/lab";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const loginLoading = useAppSelector(selectLoginLoading);
  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: ''
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    navigate('/');
  };
  const fieldsError = !state.email.trim() || !state.password.trim();

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1,  bgcolor: 'darkGrey'}}>
          <LockOpenIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error && (
          <Alert severity="error" sx={{m: 3, width: '100%'}}>
            {error.error}
          </Alert>
        )}
        <GoogleLogin onSuccess={(credentialResponse => {
          if (credentialResponse.credential) {
            void googleLoginHandler(credentialResponse.credential);
          }
        })}

                     onError={() => {
                       console.log('Login failed!');
                     }}/>
        <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="E-mail"
                type='email'
                name="email"
                autoComplete="current-email"
                value={state.email}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                value={state.password}
                onChange={inputChangeHandler}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            disabled={fieldsError}
            fullWidth
            loading={loginLoading}
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign In
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Or sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;