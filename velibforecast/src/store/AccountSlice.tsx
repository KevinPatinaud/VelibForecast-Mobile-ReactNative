import { createSlice } from "@reduxjs/toolkit";
import { Account } from "../model/Account";
import { RootState } from "./store";
const initialAccount = {
  isConnected: false,
} as Account;

export const accountSlice = createSlice({
  name: "account",
  initialState: initialAccount,

  reducers: {
    recordAccount: (accountState: Account, action) => {
      accountState.email = action.payload?.email;
      accountState.facebookId = action.payload?.facebookId;
      accountState.favoriteStations = [...action.payload?.favoriteStations];
      accountState.id = action.payload?.id;
      accountState.isConnected = action.payload?.isConnected;
      accountState.password = action.payload?.password;
    },
    disconnectAccount: (accountState: Account) => {
      accountState.isConnected = false;
      accountState.email = undefined;
      accountState.facebookId = undefined;
      accountState.favoriteStations = undefined;
      accountState.id = undefined;
      accountState.password = undefined;
    },
  },
});

export const { recordAccount, disconnectAccount } = accountSlice.actions;
export const selectAccount = (state: RootState) => state.account;
export default accountSlice.reducer;
