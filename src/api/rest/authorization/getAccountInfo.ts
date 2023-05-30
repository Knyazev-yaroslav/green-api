import makeRequest from "../../instance/makeRequest";
import { TResponse } from "../../instance/types";
import { IGetAccountInfoResponseOk, IResponseError } from "./reusableTypes";

export interface IGetAccountInfoRequest {
  idInstance: string;
  apiTokenInstance: string;
}

export type TGetAccountInfoResponse =
  | IGetAccountInfoResponseOk
  | IResponseError;

export const getAccountInfo = (
  data: IGetAccountInfoRequest
): TResponse<TGetAccountInfoResponse> => {
  return makeRequest({
    method: "GET",
    url: `/waInstance${data.idInstance}/getStateInstance/${data.apiTokenInstance}`,
  });
};
