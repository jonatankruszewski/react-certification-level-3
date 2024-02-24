import styles from './Overlay.module.scss';
import {useFocusTrap} from "../hooks/useFocusTrap.jsx"
import {useOverlay} from "../context/OverlayContext.jsx";
import PropTypes from "prop-types";
import {useEffect} from "react";
import useOnClickOutside from "../../common/hooks/useClickOutside.jsx";

// eslint-disable-next-line react-refresh/only-export-components
const Overlay = ({backDrop, blockInteractivity, header, body, footer}) => {
    const cardRef = useFocusTrap();
    const {closeOverlay, mode, isOpen} = useOverlay();

    useOnClickOutside(cardRef, () => {
        if (!blockInteractivity) {
            closeOverlay();
        }
    })

    useEffect(() => {
        if (isOpen && mode === 'modal') {
            document.body.style.overflowY = 'hidden';
        }
    }, [isOpen, mode]);

    useEffect(() => {
        return () => document.body.style.overflowY = 'scroll';
    }, []);

    return (
        <div
            data-backdrop={backDrop}
            className={styles.root}
        >
            <div
                ref={cardRef}
                data-backdrop={backDrop}
                className={styles.card}
            >
                <button
                    className={styles.close}
                    onClick={closeOverlay}
                >
                    ✕
                </button>
                <div className={styles.header}>
                    {header}
                </div>
                <div className={styles.body}>
                    {body}
                </div>
                <div className={styles.footer}>
                    {footer}
                </div>
            </div>
        </div>
    );
};

Overlay.defaultProps = {
    backDrop: true,
    blockInteractivity: false,
    header: null,
    footer: null,
}

Overlay.propTypes = {
    backDrop: PropTypes.bool,
    blockInteractivity: PropTypes.bool,
    header: PropTypes.node,
    body: PropTypes.node.isRequired,
    footer: PropTypes.node,
}

const modalOverlayPropTypes = {
    header: PropTypes.node,
    body: PropTypes.node.isRequired,
    footer: PropTypes.node,
}

const modalOverlayDefaultProps = {
    header: null,
    footer: null,
}

//eslint-disable-next-line react-refresh/only-export-components
const Modal = ({header, footer, body}) => <Overlay
    header={header}
    footer={footer}
    body={body}
    backDrop={false}
    blockInteractivity={true}
/>
Modal.propTypes = modalOverlayPropTypes;
Modal.defaultProps = modalOverlayDefaultProps;

//eslint-disable-next-line react-refresh/only-export-components
const Dialog = ({header, footer, body}) => <Overlay
    header={header}
    footer={footer}
    body={body}
    backDrop={true}
    blockInteractivity={false}
/>
Dialog.propTypes = modalOverlayPropTypes;
Dialog.defaultProps = modalOverlayDefaultProps;

const exposedOverlays = {Modal, Dialog};

export default exposedOverlays;
