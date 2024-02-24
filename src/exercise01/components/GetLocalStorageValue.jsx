import useLocalStorage from "../hooks/useLocalStorage.jsx";
import styles from "./localStorage.module.scss";

const GetLocalStorageValue = () => {
    const {
        value,
        clearItem,
        subscribe,
        unSubscribe,
        subscribed,
    } = useLocalStorage({key: 'myName', options: {subscribed: true, override: false}});


    return (
        <div className={styles.root}>
            <h3>Get a value from local storage</h3>
            <form
                className={styles.form}
                onSubmit={e => {
                    e.preventDefault();
                }}
            >
                <p>This component initialized with the same key as the previous one.</p>
                <p>When subscribed, the subscription happens in 2 levels: one at the <strong>storage event</strong> level, and one by <strong>polling</strong>.</p>
                <p>Any other tab changing the value, automatically will update this one: -Go ahead and try it!.
                    Also, any change that did not happen programmatically from this domain will be reflected too thanks to the polling.
                </p>
                <p>This instance <strong>is {subscribed ? "" :"not "} subscribed to changes</strong></p>

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
            </form>
        </div>
    );
};

export default GetLocalStorageValue;
