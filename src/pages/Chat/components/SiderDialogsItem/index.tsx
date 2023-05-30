import React, { FC } from "react";
import { DialogType } from "../../../../store/chat/types";
import dayjs from "dayjs";

import styles from "./index.module.scss";

interface ISiderDialogsItem {
  phoneNumber: string;
  dialog: DialogType;
  handleClick: () => void;
}

const SiderDialogsItem: FC<ISiderDialogsItem> = ({
  phoneNumber,
  dialog,
  handleClick,
}) => {
  const lastMessage = dialog.messages[dialog.messages.length - 1];
  const correctlyDate = dayjs(lastMessage.messageDate).format("HH:mm");
  return (
    <div onClick={handleClick} className={styles.item__container}>
      <p className={styles.item__user__info}>
        {dialog.username ? dialog.username : phoneNumber}
      </p>
      <div className={styles.item__user__message}>
        <p className={styles.item__user__message__text}>
          {lastMessage.messageText}
        </p>
        <p className={styles.item__user__message__time}>{correctlyDate}</p>
      </div>
    </div>
  );
};

export default SiderDialogsItem;
