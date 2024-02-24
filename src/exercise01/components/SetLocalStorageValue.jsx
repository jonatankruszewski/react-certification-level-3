import React from "react";
import useLocalStorage from "../hooks/useLocalStorage.jsx";
import styles from "./localStorage.module.scss";

const SetLocalStorageValue = () => {
    const key = 'myName';
    const name = 'Shk Shk Slim Shady';
    const {
        value,
        updateValue,
        updateKeyName,
        clearItem,
    } = useLocalStorage({key, initialValue: name, options: {subscribe: false, override: true}});

    const [userKey, setUserKey] = React.useState(key);
    const [userValue, setUserValue] = React.useState(value?.value || '');

    const shouldDisableButton = !userValue || !userKey || userValue === value?.value;

    return (
        <div className={styles.root}>
            <h3>Set a Value to local storage</h3>
            <form
                className={styles.form}
                onSubmit={e => {
                    e.preventDefault();
                    updateKeyName(userKey);
                    updateValue(userValue);
                }}
            >
                <p>This component initialized with a key value pair of <strong>{key} : {name}</strong>. Once
                    initialized, the useLocalStorageHook will store it and handle the value, error, key, and success.
                </p>
                <p>This instance <strong>is not subscribed to changes</strong>, so any component or human changing the
                    value of it will not be reflected on the JSON output.</p>

                <label htmlFor='key'>
                    Set local storage key name:
                    <input
                        id={'key'}
                        type='text'
                        onChange={(e) => setUserKey(e.target.value)}
                        value={userKey}
                        className={styles.input}
                    />
                </label>
                <label htmlFor='key'>
                    Set local storage value:
                    <input
                        id={'value'}
                        type='text'
                        onChange={(e) => setUserValue(e.target.value)}
                        className={styles.input}
                        value={userValue}
                    />
                </label>
                <button
                    type='submit'
                    className={styles.button}
                >
                    Update item
                </button>
                <button
                    type='button'
                    onClick={clearItem}
                    className={styles.button}
                >
                    Delete item
                </button>
                <div>{JSON.stringify(value)}</div>
            </form>
        </div>
    );
};

export default SetLocalStorageValue;
