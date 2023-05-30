import { API_TOKEN_INSTANCE, ID_INSTANCE } from "../../../store/auth/types";
import makeRequest from "../../instance/makeRequest";
import { TResponse } from "../../instance/types";
import { IGetNotificationsOk, IResponseError } from "./reusableTypes";

export type TGetNotificationsResponse = IGetNotificationsOk | IResponseError;

const idInstance = localStorage.getItem(ID_INSTANCE);
const apiTokenInstance = localStorage.getItem(API_TOKEN_INSTANCE);

export const getNotifications = (): TResponse<TGetNotificationsResponse> => {
  return makeRequest({
    method: "GET",
    url: `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
  });
};
