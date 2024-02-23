import useLocalStorage from "../hooks/useLocalStorage.jsx";
import styles from "./localStorage.module.scss";

const GetLocalStorageValue = () => {
    const {
        value,
        clearItem,
        subscribe,
        unSubscribe,
        subscribed,
    } = useLocalStorage({key:'myName', initialValue:"", options: {subscribed: false, override: false}});


    return (
        <div className={styles.root}>
            <h3>Get a value from local storage</h3>
            <form
                className={styles.form}
                onSubmit={e => {
                    e.preventDefault();
                }}
            >
                {<>
                    <button
                        className={styles.button}
                        type="button"
                        onClick={() => {
                            if (subscribed) {
                                unSubscribe()
                                return;
                            }
                            subscribe()
                        }}
                        disabled={false}
                    >
                        {subscribed ? 'Unsubscribe to changes' : 'Subscribe to changes'}
                    </button>
                    <button
                        className={styles.button}
                        type="button"
                        onClick={() => {
                           clearItem()
                        }}
                        disabled={false}
                    >
                        Clear item
                    </button>
                    <div>{JSON.stringify(value)}</div>
                </>
                }
            </form>
        </div>
    );
};

export default GetLocalStorageValue;
