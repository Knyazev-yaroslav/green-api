import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CHAT_ALIAS, IChatStore, PayloadDialogType } from "./types";
import {
  deleteNotificationAction,
  getNotificationAction,
  sendMessageAction,
} from "./thunk";

const initialState: IChatStore = {
  newNotification: null,
  notificationId: 0,
  loading: false,
  error: null,
  successfulSending: false,
  dialogs: {},
};

export const chatSlice = createSlice({
  name: CHAT_ALIAS,
  initialState,
  reducers: {
    sortMessages: (state) => {
      for (const key in state.dialogs) {
        state.dialogs[key].messages.sort((a, b) => {
          return a.messageDate - b.messageDate;
        });
      }
    },

    addDialog: (state, action: PayloadAction<PayloadDialogType>) => {
      const phoneNumber = action.payload.phoneNumber;
      if (Object.keys(state.dialogs).includes(phoneNumber)) {
        state.dialogs[phoneNumber].messages.push(...action.payload.messages);
      } else {
        state.dialogs[phoneNumber] = {
          username: action.payload.username,
          messages: action.payload.messages,
        };
      }
    },

    addMySendMessage: (state, action: PayloadAction<PayloadDialogType>) => {
      const phoneNumber = action.payload.phoneNumber;
      if (Object.keys(state.dialogs).includes(phoneNumber)) {
        state.dialogs[phoneNumber].messages.push(...action.payload.messages);
      } else {
        state.dialogs[phoneNumber] = {
          messages: action.payload.messages,
        };
      }
    },

    // sortMessages: (state) => {
    //   state.dialogs = new Map<number, DialogType>(
    //     [...state.dialogs].sort((a, b) => a[0] - b[0])
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotificationAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getNotificationAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || null;
    });
    builder.addCase(getNotificationAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (!!payload) {
        state.newNotification = payload.body;
        state.notificationId = payload.receiptId;
      }
    });
    builder.addCase(deleteNotificationAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteNotificationAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || null;
    });
    builder.addCase(
      deleteNotificationAction.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.newNotification = initialState.newNotification;
        state.notificationId = initialState.notificationId;
      }
    );
    builder.addCase(sendMessageAction.pending, (state) => {
      state.loading = true;
      state.successfulSending = false;
    });
    builder.addCase(sendMessageAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.successfulSending = false;
      state.error = payload || null;
    });
    builder.addCase(sendMessageAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.successfulSending = true;
    });
  },
});

export const { addDialog, addMySendMessage, sortMessages } = chatSlice.actions;

export default chatSlice.reducer;
