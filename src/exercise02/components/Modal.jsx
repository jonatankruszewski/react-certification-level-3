import styles from './Modal.module.scss';
import {useEffect} from "react";

const Modal = ({backDrop, clickAway, closeModal, openModal, children}) => {

    return (
        <div
            data-backdrop={backDrop}
            data-testid='modal-container'
            className={styles.root}
            onClick={() => clickAway && closeModal()}>
            <div
                onClick={e => e.stopPropagation()}
                data-backdrop={backDrop}
                className={styles.card}>
                <button
                    className={styles.close}
                    data-testid='x-button'
                    onClick={() => closeModal()}>
                    ✕
                </button>
                <div>Hello</div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
