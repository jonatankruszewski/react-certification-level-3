import {createContext, useContext, useState} from "react";
import {createPortal} from "react-dom";
import useCreatePortal from "../hooks/useCreatePortal.jsx";
import Overlay from "../components/Overlay.jsx";
import PropTypes from "prop-types";
import _ from "lodash";

export const OverlayContext = createContext({
    isOpen: false,
    openModal() { },
    closeOverlay() { },
    openDialog() { },
    mode: "",
});

// eslint-disable-next-line react-refresh/only-export-components
export const useOverlay = () => {
    return useContext(OverlayContext);
}

const OverlayProvider = ({children}) => {
    const {portalRoot} = useCreatePortal();
    const [isOpen, setIsOpen] = useState(false);
    const [overlayContent, setOverlayContent] = useState(null);
    const [mode, setMode] = useState("");
    const closeOverlay = () => {
        setIsOpen(false);
        setOverlayContent(null);
        setMode("")
    }
    const openModal = (modalProps) => {
        setIsOpen(true);
        setMode('modal');
        const overlay = <Overlay.Modal {...modalProps}/>
        setOverlayContent(overlay);
    }

    const openDialog = (dialogProps) => {
        setIsOpen(true);
        setMode('dialog');
        const overlay = <Overlay.Dialog {...dialogProps}/>
        setOverlayContent(overlay);
    }

    return (
        <OverlayContext.Provider value={{isOpen, openModal, closeOverlay, openDialog, mode}}>
            {children}
            {isOpen && !_.isEmpty(overlayContent) && createPortal(
                overlayContent,
                portalRoot,
            )}
        </OverlayContext.Provider>
    );
}

OverlayProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default OverlayProvider
