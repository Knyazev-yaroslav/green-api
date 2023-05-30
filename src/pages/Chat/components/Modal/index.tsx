import React, { Dispatch, FC, SetStateAction } from "react";
import ReactDOM from "react-dom";

import styles from "./index.module.scss";

interface IModal {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  children: JSX.Element;
}

const Modal: FC<IModal> = ({ modalOpen, setModalOpen, children, ...rest }) =>
  ReactDOM.createPortal(
    modalOpen ? (
      <div className={styles.portal_wrapper}>
        <div className={styles.portal_container}>
          <button
            className={styles.close_modal_button}
            onClick={() => {
              setModalOpen(false);
            }}
          >
            x
          </button>
          {children}
        </div>
      </div>
    ) : null,
    document.body
  );
export default Modal;
