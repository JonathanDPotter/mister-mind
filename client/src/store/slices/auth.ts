import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// types
import { Iuser } from "../../interfaces/user";

export interface IauthSliceState {
  auth: Iuser | null;
}

const initialState: IauthSliceState = {
  auth: null,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addAuthUser: (state: IauthSliceState, action: PayloadAction<Iuser>) => {
      state.auth = action.payload;
    },
  },
});

export const { addAuthUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
