import React from "react";
import logo from "../../assets/headerLogo.png";
import styles from "./index.module.scss";
import { useAppDispatch } from "../../hooks/redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearAuthData, logout } from "../../store/auth/slice";

interface ILocationState {
  pathname: string;
}

const Header = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearAuthData());
    navigate("/login");
  };

  const { pathname } = location as ILocationState;

  return (
    <div className={styles.header}>
      <img className={styles.logo} src={logo} alt="logo-green-api" />
      {pathname === "/" && (
        <button className={styles.header__button} onClick={handleLogout}>
          Выйти
        </button>
      )}
    </div>
  );
};

export default Header;
