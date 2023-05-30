import { createSlice } from "@reduxjs/toolkit";
import {
  API_TOKEN_INSTANCE,
  AUTH_ALIAS,
  IAuthStore,
  ID_INSTANCE,
} from "./types";
import { getAccountInfoAction } from "./thunk";

const initialState: IAuthStore = {
  IdInstance: localStorage.getItem(ID_INSTANCE),
  ApiTokenInstance: localStorage.getItem(API_TOKEN_INSTANCE),
  isAuth: !!localStorage.getItem(ID_INSTANCE),
  stateInstance: null,
  loading: false,
  error: null,
  response: null,
};

export const authSlice = createSlice({
  name: AUTH_ALIAS,
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem(ID_INSTANCE);
      localStorage.removeItem(API_TOKEN_INSTANCE);
    },
    clearStateInstance: (state) => {
      state.stateInstance = null;
    },
    clearAuthData: () => {
      return {
        ...initialState,
        IdInstance: localStorage.getItem(ID_INSTANCE),
        ApiTokenInstance: localStorage.getItem(API_TOKEN_INSTANCE),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAccountInfoAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAccountInfoAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || null;
    });
    builder.addCase(getAccountInfoAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isAuth = true;
      state.stateInstance = payload.stateInstance;
    });
  },
});

export const { logout, clearAuthData, clearStateInstance } = authSlice.actions;

export default authSlice.reducer;
