import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_TOKEN_INSTANCE, AUTH_ALIAS, ID_INSTANCE } from "./types";
import {
  IGetAccountInfoRequest,
  getAccountInfo,
} from "../../api/rest/authorization/getAccountInfo";
import {
  IGetAccountInfoResponseOk,
  IResponseError,
} from "../../api/rest/authorization/reusableTypes";

export const getAccountInfoAction = createAsyncThunk<
  IGetAccountInfoResponseOk,
  IGetAccountInfoRequest,
  {
    rejectValue: IResponseError;
  }
>(
  `${AUTH_ALIAS}/getAccountInfoAction`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getAccountInfo(payload);
      const data = response.data as IGetAccountInfoResponseOk;

      if (response.status === 200) {
        if (data.stateInstance === "authorized") {
          localStorage.setItem(API_TOKEN_INSTANCE, payload.apiTokenInstance);
          localStorage.setItem(ID_INSTANCE, payload.idInstance);
        }
        return data;
      }
      return rejectWithValue({
        statusCode: response.status,
      });
    } catch (error: any) {
      return rejectWithValue({
        ...error.response.data,
        statusCode: error.response.status,
      });
    }
  }
);
