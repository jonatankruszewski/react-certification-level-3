import {createContext, useEffect, useState} from "react";
import {createPortal} from "react-dom";
import useCreatePortal from "../hooks/useCreatePortal.jsx";
import Modal from "../components/Modal.jsx";

export const ModalContext = createContext({
    isModalOpen: false,
    openModal() {
    },
    closeModal() {
    },
    setContent() {
    }
});

// eslint-disable-next-line react/prop-types
const ModalProvider = ({children}) => {
    const {portalRoot} = useCreatePortal();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const openModal = (modal) => {
        setIsModalOpen(true);
        setModalContent(modal);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
            return;
        }

        document.body.style.overflow = 'scroll';
    }, [isModalOpen]);

    return (
        <ModalContext.Provider value={{isModalOpen, openModal, closeModal}}>
            {children}
            {isModalOpen && modalContent && createPortal(
                modalContent,
                // <Modal backDrop={true} clickAway={true} openModal={openModal} closeModal={closeModal}/>,
                portalRoot,
            )}
        </ModalContext.Provider>
    );
}

export default ModalProvider
