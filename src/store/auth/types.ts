import {
  IGetAccountInfoResponseOk,
  IResponseError,
} from "../../api/rest/authorization/reusableTypes";

export const AUTH_ALIAS = "authAlias" as const;
export const API_TOKEN_INSTANCE = "apiTokenInstance";
export const ID_INSTANCE = "idInstance";

export interface IAuthStore {
  IdInstance: string | null;
  ApiTokenInstance: string | null;
  isAuth: boolean;
  loading: boolean;
  stateInstance: "authorized" | "notAuthorized" | null;
  response: IGetAccountInfoResponseOk | null;
  error: IResponseError | null;
}
