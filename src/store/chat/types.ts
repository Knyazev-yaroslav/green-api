import { IResponseError } from "../../api/rest/chat/reusableTypes";

export const CHAT_ALIAS = "chatAlias" as const;

interface INewNotification {
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
}

export interface IMessage {
  myMessage?: true;
  messageText: string;
  messageDate: number;
}

export type DialogType = {
  username?: string;
  messages: IMessage[];
};

export interface IChatStore {
  newNotification: INewNotification | null;
  notificationId: number;
  loading: boolean;
  error: IResponseError | null;
  successfulSending: boolean;
  dialogs: { [phoneNumber: string]: DialogType };
}

export type PayloadDialogType = {
  username?: string;
  phoneNumber: string;
  messages: IMessage[];
};
