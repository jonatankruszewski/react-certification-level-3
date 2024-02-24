import styles from './Exercise02.module.scss';
import {ModalContext} from "../context/ModalContext";
import {useContext, useEffect} from "react";
import Modal from "../components/Modal.jsx";

const Exercise02 = () => {
    const {isModalOpen, openModal, closeModal} = useContext(ModalContext)

    const modalProps = {
        backDrop: true,
        clickAway: true,
    }

    return (
        <section className={styles.root}>
            <h2>
                Exercise 02
            </h2>
            <button onClick={isModalOpen ? closeModal : ()=>openModal(modalProps)}>
                {isModalOpen ? 'Close Modal' : 'Open Modal'}
            </button>
        </section>);
};

export default Exercise02;
