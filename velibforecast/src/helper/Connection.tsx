import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { Account } from "../model/Account";
import AccountService from "../services/Account/Account.service";
import { recordAccount } from "../store/AccountSlice";
import { getValueFromSecureStore } from "./Utils";

export const connection = async (
  email: string,
  password: string,
  dispatch: Dispatch<AnyAction>
) => {
  if (email && email !== "" && password && password !== "") {
    const result = await AccountService.connectMailAccount({
      email: email,
      password: password,
    } as Account);
    if (result && typeof result === "object") {
      dispatch(recordAccount(result));
    }
    return result;
  }
  return undefined;
};

export const refreshUserInfo = async (dispatch: Dispatch<AnyAction>) => {
  connection(
    await getValueFromSecureStore("MAIL"),
    await getValueFromSecureStore("PASSWORD"),
    dispatch
  );
};
