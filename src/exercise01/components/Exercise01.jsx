import styles from "./Exercise01.module.scss";
import GetLocalStorageValue from "./GetLocalStorageValue.jsx";
import SetLocalStorageValue from "./SetLocalStorageValue.jsx";

const Exercise01 = () => {

    return (
        <div className={styles.root}>
            <h2>Exercise 01</h2>
            <SetLocalStorageValue/>
            <GetLocalStorageValue/>
        </div>
    );
};

export default Exercise01;
