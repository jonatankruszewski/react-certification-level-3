import React from "react";
import useLocalStorage from "../hooks/useLocalStorage.jsx";
import styles from "./Exercise01.module.scss";
import classNames from "classnames";

const SetLocalStorageValue = () => {
    const key = 'myName';
    const name = 'Shk Shk Slim Shady';
    const {
        value,
        updateValue,
        updateKeyName
    } = useLocalStorage({key, initialValue: name, options: {subscribe: false, override: true}});

    const [userKey, setUserKey] = React.useState(key);
    const [userValue, setUserValue] = React.useState(value?.value || '');

    const shouldDisableButton = !userValue || !userKey || userValue === value?.value;
    console.log({shouldDisableButton, userValue, value, userKey})

    return (
        <>
            <h3>Set a Value to local storage</h3>
            <form
                className={styles.form}
                onSubmit={e => {
                    e.preventDefault();
                    updateKeyName(userKey);
                    updateValue(userValue);
                }}
            >
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
                    className={classNames(styles.button, {[styles.disabled]:shouldDisableButton})}
                    disabled={!userValue || !userKey ||shouldDisableButton}
                >
                    Set item
                </button>
                <div>{JSON.stringify(value)}</div>
            </form>
        </>
    );
};

export default SetLocalStorageValue;
