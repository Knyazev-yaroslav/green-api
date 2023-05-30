export interface IGetNotificationsOk {
  receiptId: number;
  body: {
    typeWebhook: string;
    instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    senderData: {
      chatId: string;
      sender: string;
      senderName: string;
    };
    messageData: {
      typeMessage: string;
      textMessageData: {
        textMessage: string;
      };
    };
  };
}
export interface IDeleteNotificationOk {
  result: true;
}
export interface ISendMessageOk {
  idMessage: string;
}

export interface IResponseError {
  statusCode: number;
}
