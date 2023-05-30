export interface IGetAccountInfoResponseOk {
  stateInstance: "authorized" | "notAuthorized";
}

export interface IResponseError {
  statusCode: number;
}
