import { createSlice } from '@reduxjs/toolkit';
import { googleLogin, login, register } from './usersThunks.ts';
import { RootState } from '../../app/store.ts';
import { GlobalError, User, ValidationError } from '../../types';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null
};
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, {payload: data}) => {
      state.registerLoading = false;
      state.registerError = null;
      state.user = data.user;
    });
    builder.addCase(register.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, {payload: data}) => {
      state.loginLoading = false;
      state.loginError = null;
      state.user = data.user;
    });
    builder.addCase(login.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
    builder.addCase(googleLogin.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(googleLogin.fulfilled, (state, {payload: data}) => {
      state.loginLoading = false;
      state.user = data.user;
    });
    builder.addCase(googleLogin.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
  })
});
export const usersReducer = usersSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const {logOutUser} = usersSlice.actions;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;