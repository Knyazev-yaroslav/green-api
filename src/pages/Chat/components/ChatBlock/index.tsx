import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { sendMessageAction } from "../../../../store/chat/thunk";
import Message from "../Message";
import { getChatData } from "../../../../store/chat/selector";
import { addMySendMessage, sortMessages } from "../../../../store/chat/slice";
import { PayloadDialogType } from "../../../../store/chat/types";

interface IChatBlock {
  phoneNumber: string;
}

const ChatBlock: FC<IChatBlock> = ({ phoneNumber }) => {
  const [messageText, setMessageText] = useState<string>("");
  const chatFieldRef = useRef<null | HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const { newNotification, successfulSending, dialogs } =
    useAppSelector(getChatData);

  const currentMessages = dialogs[phoneNumber]?.messages;

  const handleSendMessage = () => {
    dispatch(
      sendMessageAction({ chatId: phoneNumber + "@c.us", message: messageText })
    );
  };

  useEffect(() => {
    if (successfulSending) {
      const payloadData: PayloadDialogType = {
        username: "I",
        phoneNumber: phoneNumber,
        messages: [
          {
            myMessage: true,
            messageText: messageText,
            messageDate: Date.now(),
          },
        ],
      };

      dispatch(addMySendMessage(payloadData));
      setMessageText("");
    }
  }, [successfulSending]);

  useEffect(() => {
    if (newNotification) {
      dispatch(sortMessages());
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (chatFieldRef.current) {
      chatFieldRef.current.scrollTo(0, chatFieldRef.current.scrollHeight);
    }
  }, [currentMessages]);

  const chatMessages = dialogs[phoneNumber]?.messages.map((element, index) => {
    return (
      <Message
        key={index + element.messageDate}
        myMessage={element.myMessage}
        messageText={element.messageText}
        messageDate={element.messageDate}
      />
    );
  });
  return (
    <div className={styles.chat_block}>
      <div className={styles.chat_block__header}>
        {dialogs[phoneNumber] ? (
          <p className={styles.chat_block__header__name}>
            {dialogs[phoneNumber]?.username}
          </p>
        ) : (
          "Неизвестный"
        )}
        <p className={styles.chat_block__header__phone}>(+{phoneNumber})</p>
      </div>
      <div className={styles.chat__block__body}>
        <div ref={chatFieldRef} className={styles.chat__filed__wrapper}>
          <div className={styles.chat__field__container}>{chatMessages}</div>
        </div>

        <div className={styles.chat__block__footer}>
          <input
            className={styles.chat__block__footer__input}
            autoFocus
            type="text"
            placeholder="Введите сообщение"
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
          />
          <button
            className={styles.chat__block__footer__button}
            onClick={handleSendMessage}
          >
            Отправить!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBlock;
