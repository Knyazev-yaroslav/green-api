import React, { FC } from "react";
import { IMessage } from "../../../../store/chat/types";

import styles from "./index.module.scss";
import dayjs from "dayjs";

const Message: FC<IMessage> = ({ messageText, messageDate, myMessage }) => {
  const correctlyDate = dayjs(messageDate).format("HH:mm");

  return (
    <div
      className={
        myMessage ? styles.message__container_my : styles.message__container
      }
    >
      <p className={styles.message__text}>{messageText}</p>
      <p className={styles.message__date}>{correctlyDate}</p>
    </div>
  );
};

export default Message;
