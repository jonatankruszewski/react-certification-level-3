import React from "react";
import useLocalStorage from "../hooks/useLocalStorage.jsx";
import styles from "./localStorage.module.scss";
import _ from "lodash";
import classNames from "classnames";

const SetLocalStorageValue = () => {
    const key = 'myName';
    // const name = 'Shk Shk Slim Shady';
    const {
        value,
        updateValue,
        clearItem,
    } = useLocalStorage({key, options: {subscribe: false, override: false}});

    const [userValue, setUserValue] = React.useState(value?.value || '');

    return (
        <div className={styles.root}>
            <h3>Set a Value to local storage</h3>
            <form
                className={styles.form}
                onSubmit={e => {
                    e.preventDefault();
                    updateValue(userValue);
                }}
            >
                <p>This component initialized with a key value pair
                    of <strong>{key} : {_.isEmpty(value.value) ? '""' : value.value}</strong>. Once
                    initialized, the useLocalStorageHook will store it and handle the value, error, key, and success.
                </p>
                <p>This instance <strong>is not subscribed to changes</strong>, so any component or human changing the
                    value of <strong>outside this component</strong> will not be reflected on the JSON output. Local
                    changes will.</p>

                <p>The API also exposes options for initializing the instance subscribed or not, or if you wish to
                    override any existing value upon initialization.</p>
                <p>Deleting the key will delete both the key and the value.</p>

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
                    className={classNames(styles.button, {[styles.disabled]: !userValue})}
                    disabled={!userValue}
                >
                    Update item
                </button>
                <button
                    type='button'
                    onClick={() => clearItem(() => setUserValue(""))}
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
