import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getAuthData } from "../../store/auth/selector";
import { useNavigate } from "react-router-dom";
import {
  deleteNotificationAction,
  getNotificationAction,
} from "../../store/chat/thunk";
import { getChatData } from "../../store/chat/selector";
import { addDialog } from "../../store/chat/slice";
import { PayloadDialogType } from "../../store/chat/types";
import { objectMap } from "../../utils/objectMap";

import SiderDialogsItem from "./components/SiderDialogsItem";
import ChatBlock from "./components/ChatBlock";
import Modal from "./components/Modal";

import styles from "./index.module.scss";

interface INewChatModalBody {
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const NewChatModalBody: FC<INewChatModalBody> = ({
  setPhoneNumber,
  setModalOpen,
}) => {
  const [localPhoneNumber, setLocalPhoneNumber] = useState<string>("");

  const handleSubmit = () => {
    setPhoneNumber(localPhoneNumber);
    setModalOpen(false);
  };

  const inputHandler = (str: string) => {
    const regex = /^[0-9]+$/;

    if (regex.test(str) || str.length === 0) {
      setLocalPhoneNumber(str);
    }
  };

  return (
    <div className={styles.new_chat__container}>
      <p className={styles.new_chat__text}>
        Введите номер пользователя, с которым хотите начать чат:
      </p>
      <div className={styles.new_chat__input__container}>
        <input
          className={styles.new_chat__input}
          required
          autoFocus
          type="tel"
          placeholder="XXXXXXXXXX"
          onChange={(event) => inputHandler(event.target.value)}
          value={localPhoneNumber}
          maxLength={11}
        />
        <span className={styles.new_chat__input__plus}>+</span>
      </div>

      <button className={styles.new_chat__button} onClick={handleSubmit}>
        Начать чат!
      </button>
    </div>
  );
};

const Chat: FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { newNotification, dialogs, error } = useAppSelector(getChatData);
  const { isAuth } = useAppSelector(getAuthData);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  useEffect(() => {
    if (error?.statusCode === 466) {
      alert("Исчерпан лимит отправки сообщений.");
    }
  }, [error]);

  const getMessages = async () => {
    await dispatch(getNotificationAction({}));
    if (newNotification) {
      const payloadData: PayloadDialogType = {
        username: newNotification?.senderData.senderName,
        phoneNumber: newNotification.senderData.chatId.substring(0, 11),
        messages: [
          {
            messageText:
              newNotification.messageData.textMessageData.textMessage,
            messageDate: newNotification.timestamp * 1000,
          },
        ],
      };
      dispatch(addDialog(payloadData));
      dispatch(deleteNotificationAction({}));
    }
  };

  useEffect(() => {
    const fetchingNotifications = setInterval(() => getMessages(), 1000);

    return () => {
      clearInterval(fetchingNotifications);
    };
  }, [newNotification]);

  const siderDialogs = objectMap(dialogs, (value, key, index) => {
    return (
      <SiderDialogsItem
        phoneNumber={key}
        dialog={value}
        key={index}
        handleClick={() => {
          setPhoneNumber(key);
        }}
      />
    );
  });

  return (
    <div className={styles.chat_wrapper}>
      <div className={styles.chat_container}>
        <div className={styles.send_message}>
          <button
            className={styles.new_chat}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Новый чат
          </button>
          <div className={styles.sider_dialogs_wrapper}>
            <div className={styles.sider_dialogs}>
              {Object.values(siderDialogs)}
            </div>
          </div>
        </div>
        {phoneNumber ? (
          <ChatBlock phoneNumber={phoneNumber} />
        ) : (
          <div className={styles.stub__container}>
            <p className={styles.stub__text}>Выберите или создайте чат</p>
          </div>
        )}
      </div>
      <Modal setModalOpen={setModalOpen} modalOpen={modalOpen}>
        <NewChatModalBody
          setPhoneNumber={setPhoneNumber}
          setModalOpen={setModalOpen}
        />
      </Modal>
    </div>
  );
};

export default Chat;
