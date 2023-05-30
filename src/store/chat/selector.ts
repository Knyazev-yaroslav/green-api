import { RootState } from "../index";

export const getChatData = (store: RootState) => store.chat;
export const getNotificationId = (store: RootState) =>
  store.chat.notificationId;
