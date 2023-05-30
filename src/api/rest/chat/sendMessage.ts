import { API_TOKEN_INSTANCE, ID_INSTANCE } from "../../../store/auth/types";
import makeRequest from "../../instance/makeRequest";
import { TResponse } from "../../instance/types";
import { ISendMessageOk, IResponseError } from "./reusableTypes";

export type TSendMessageResponse = ISendMessageOk | IResponseError;

export interface ISendMessageRequest {
  chatId: string;
  message: string;
}

const idInstance = localStorage.getItem(ID_INSTANCE);
const apiTokenInstance = localStorage.getItem(API_TOKEN_INSTANCE);

export const sendMessage = (
  data: ISendMessageRequest
): TResponse<TSendMessageResponse> => {
  return makeRequest({
    method: "POST",
    url: `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    data,
  });
};
