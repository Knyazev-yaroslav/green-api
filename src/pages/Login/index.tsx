import React, { FC, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getAccountInfoAction } from "../../store/auth/thunk";
import { getAuthData } from "../../store/auth/selector";
import { useNavigate } from "react-router-dom";
import { clearStateInstance } from "../../store/auth/slice";

const Login: FC = () => {
  const [localIdInstance, setLocalIdInstance] = useState<string>("");
  const [locaApiTokenInstance, setLocalApiTokenInstance] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { stateInstance } = useAppSelector(getAuthData);

  const loginFunc = () => {
    dispatch(
      getAccountInfoAction({
        idInstance: localIdInstance,
        apiTokenInstance: locaApiTokenInstance,
      })
    );
  };

  useEffect(() => {
    if (stateInstance === "authorized") {
      navigate("/");
    } else if (stateInstance === "notAuthorized") {
      alert(
        "Ваш аккаунт не авторизован. Перейдите в личный кабинет для авторизации"
      );
      dispatch(clearStateInstance());
    }
  }, [stateInstance]);

  return (
    <div className={styles.auth}>
      <form className={styles.auth__form} action="sumbit" method="get">
        <p className={styles.auth__text}>Введите данные из личного кабинета:</p>
        <input
          className={styles.auth__input}
          required
          onChange={(event) => setLocalIdInstance(String(event.target.value))}
          value={localIdInstance}
          type="text"
          placeholder="IdInstance"
        />
        <input
          className={styles.auth__input}
          required
          onChange={(event) =>
            setLocalApiTokenInstance(String(event.target.value))
          }
          value={locaApiTokenInstance}
          type="text"
          placeholder="ApiTokenInstance"
        />
        <a
          className={styles.auth__signup_button}
          target="_blank"
          rel="noopener noreferrer"
          href="https://console.green-api.com/auth/register"
        >
          Зарегистрироваться
        </a>
        <button
          className={styles.auth__button}
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            loginFunc();
          }}
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
