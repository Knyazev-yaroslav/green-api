import { API_TOKEN_INSTANCE, ID_INSTANCE } from "../../../store/auth/types";
import makeRequest from "../../instance/makeRequest";
import { TResponse } from "../../instance/types";
import { IDeleteNotificationOk, IResponseError } from "./reusableTypes";

export type TDeleteNotificationResponse =
  | IDeleteNotificationOk
  | IResponseError;

const idInstance = localStorage.getItem(ID_INSTANCE);
const apiTokenInstance = localStorage.getItem(API_TOKEN_INSTANCE);

export const deleteNotification = (
  data: number
): TResponse<TDeleteNotificationResponse> => {
  return makeRequest({
    method: "DELETE",
    url: `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${data}`,
  });
};
