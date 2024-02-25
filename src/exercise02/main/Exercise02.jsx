import styles from './Exercise02.module.scss';
import {useOverlay} from "../context/OverlayContext.jsx";
import {useState} from "react";
import _ from "lodash";

const Exercise02 = () => {
    const {isOpen, openModal, closeOverlay, openDialog, mode} = useOverlay();
    const [color, setColor] = useState("");
    const [isAccepted, setIsAccepted] = useState(null);

    const onAcceptTerms = () => {
        setIsAccepted(true);
        closeOverlay();
    }
    const onRejectTerms = () => {
        setIsAccepted(false);
        closeOverlay();
    }

    const onSelectBlue = ()=>{
        setColor('blue');
        closeOverlay();
    }
    const onSelectRed = ()=>{
        setColor('red');
        closeOverlay();
    }

    const modalProps = {
        header: <h3 className={styles.title}>Terms and conditions</h3>,
        body: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Diam vel quam elementum pulvinar. Nunc sed id semper risus in. Malesuada fames ac
            turpis egestas maecenas. Arcu risus quis varius quam quisque id. Vitae aliquet nec ullamcorper sit amet
            risus nullam eget felis. Leo vel fringilla est ullamcorper eget nulla facilisi. Nibh sed pulvinar proin
            gravida. Gravida neque convallis a cras semper auctor neque vitae tempus. Maecenas accumsan lacus vel
            facilisis volutpat. Turpis egestas integer eget aliquet nibh praesent tristique magna sit. Sed enim ut sem
            viverra aliquet eget sit amet. Fermentum odio eu feugiat pretium nibh ipsum consequat. Turpis egestas sed
            tempus urna. Volutpat blandit aliquam etiam erat velit scelerisque in dictum non. Aliquam eleifend mi in
            nulla posuere sollicitudin aliquam ultrices.
            <br/>
            <br/>
            A scelerisque purus semper eget duis at. Ornare suspendisse sed nisi lacus sed viverra tellus. Tempus quam
            pellentesque nec nam aliquam sem et tortor consequat. Tellus at urna condimentum mattis pellentesque id.
            Accumsan tortor posuere ac ut consequat semper viverra nam. Diam sollicitudin tempor id eu. Nulla malesuada
            pellentesque elit eget gravida cum sociis. Sodales ut etiam sit amet nisl purus. Mauris rhoncus aenean vel
            elit scelerisque mauris pellentesque pulvinar. Sapien eget mi proin sed libero enim sed faucibus turpis.
            Elementum pulvinar etiam non quam.
            <br/>
            <br/>
            Egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Mauris commodo quis imperdiet
            massa tincidunt nunc pulvinar sapien. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Pulvinar
            etiam non quam lacus. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Ultricies
            leo integer malesuada nunc. Ligula ullamcorper malesuada proin libero nunc. Proin fermentum leo vel orci
            porta non. Leo duis ut diam quam nulla porttitor massa id neque. Urna neque viverra justo nec. Proin
            fermentum leo vel orci. Quam adipiscing vitae proin sagittis nisl. Nulla posuere sollicitudin aliquam
            ultrices sagittis.

        </p>,
        footer: <div className={styles.box}>
            <button className={styles.button} onClick={onRejectTerms}>Reject</button>
            <button className={styles.button} onClick={onAcceptTerms}>Accept</button>
        </div>
    }

    const dialogProps = {
        body: <p>If you were Neo on Matrix, which pill would you had taken?</p>,
        footer: <div className={styles.box}>
            <button className={styles.button} onClick={onSelectBlue}>Blue Pill</button>
            <button className={styles.button} onClick={onSelectRed}>Red Pill</button>
        </div>
    }

    return (
        <section>
            <h2>
                Exercise 02
            </h2>
            <p>The modal and the dialog use the same base component: <strong>{"<Overlay/>"}</strong>. This component is not exposed (exported) intentionally. Only the modal and the Dialog are exported as variants of it. Both componets are used in the same way, but they have slightly different behaviour. The dialog will allow you to interact with the page that is behind it, while the modal will block those interactions.
                <br/><br/>Under the hood, the main Overlay component is rendered in the portal created by <strong>useCreatePortal()</strong>.
                <br/><br/>The overlay uses a <strong>Focus trap</strong> to keep focus within, as well as a <strong>clickOutside</strong> handler
                    to close the overlay when the user clicks outside of it.
                    <br/>
                    <br/>
                    The state of the overlay is managed by a context, which is used to open and close the overlay.
                    <br/>
                    <br/>
                    Body Scroll is locked in the Modal mode, but not in the Dialog mode.
            </p>
            <div className={styles.box}>

            <button className={styles.button} onClick={isOpen ? closeOverlay : () => openModal(modalProps)}>
                    {isOpen ? `Close ${_.capitalize(mode)}` : `Open Modal`}
                </button>
                <button className={styles.button} onClick={isOpen ? openDialog : () => openDialog(dialogProps)}>
                    {isOpen ? `Close ${_.capitalize(mode)}` : `Open Dialog`}
                </button>
            </div>
            {_.isBoolean(isAccepted) && <p>{isAccepted ? "You accepted the terms" : "You rejected the terms"}</p>}
            {!_.isEmpty(color) && <p>You picked the {color} pill</p>}

        </section>);
};

export default Exercise02;
