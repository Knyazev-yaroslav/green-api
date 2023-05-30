import { createAsyncThunk } from "@reduxjs/toolkit";

import { CHAT_ALIAS } from "./types";

import {
  IDeleteNotificationOk,
  IGetNotificationsOk,
  IResponseError,
  ISendMessageOk,
} from "../../api/rest/chat/reusableTypes";
import { getNotifications } from "../../api/rest/chat/getNotifications";
import { deleteNotification } from "../../api/rest/chat/deleteNotification";
import { RootState } from "..";
import { getNotificationId } from "./selector";
import {
  ISendMessageRequest,
  sendMessage,
} from "../../api/rest/chat/sendMessage";

export const getNotificationAction = createAsyncThunk<
  IGetNotificationsOk,
  {},
  {
    rejectValue: IResponseError;
  }
>(`${CHAT_ALIAS}/getNotificationAction`, async (_, { rejectWithValue }) => {
  try {
    const response = await getNotifications();
    const data = response.data as IGetNotificationsOk;

    if (response.status === 200) {
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
});

export const deleteNotificationAction = createAsyncThunk<
  IDeleteNotificationOk,
  {},
  {
    rejectValue: IResponseError;
  }
>(
  `${CHAT_ALIAS}/deleteNotificationAction`,
  async (_, { rejectWithValue, getState }) => {
    try {
      const notificationId = getNotificationId(getState() as RootState);
      const response = await deleteNotification(notificationId);
      const data = response.data as IDeleteNotificationOk;

      if (response.status === 200) {
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

export const sendMessageAction = createAsyncThunk<
  ISendMessageOk,
  ISendMessageRequest,
  {
    rejectValue: IResponseError;
  }
>(`${CHAT_ALIAS}/sendMessageAction`, async (payload, { rejectWithValue }) => {
  try {
    const response = await sendMessage(payload);
    const data = response.data as ISendMessageOk;

    if (response.status === 200) {
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
});
