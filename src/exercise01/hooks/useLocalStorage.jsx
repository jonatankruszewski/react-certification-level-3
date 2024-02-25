import {useEffect, useRef, useState} from "react";
import {isValidKey} from "../utils/localStorageUtils.js";
import _ from "lodash";
import {v4 as uuid, validate as isUuidString} from "uuid";

const useLocalStorage = ({key = uuid(), initialValue = "", options = {subscribed: false, override: false}} = {}) => {

    const override = useState(_.get(options, 'override', false));
    const memoizedKey = useRef(isValidKey(key) ? key : uuid());
    const initValue = useRef(override ? initialValue : localStorage.getItem(memoizedKey.current) || "");

    const [error, setError] = useState(null);
    const [value, setValue] = useState(null);
    const [subscribed, setSubscribed] = useState(_.get(options, 'subscribed', false));
    const [exists, setExists] = useState(false);
    const [success, setSuccess] = useState(false);

    // Everything gets stringified!
    const handleStringify = (value) => {
        if (_.isString(value)) {
            return value;
        }

        if (_.isSymbol(value)) {
            return value.toString();
        }

        if (_.isNil(value)) {
            return "";
        }

        try {
            return JSON.stringify(value);
        } catch (e) {
            setError(e.message || "Error stringifying value")
            return "";
        }
    }

    const storeItem = futureValue => {
        try {
            const sanitizedValue = handleStringify(futureValue);
            localStorage.setItem(memoizedKey.current, sanitizedValue);
            setError(null);
            setSuccess(true);
            setValue(sanitizedValue);
            setExists(true);
        } catch (e) {
            setError(e.message || "Error storing value");
            setSuccess(false);
            setValue("");
            setExists(true);
        }
    }
    const handleRetrieveRawValue = (value) => {
        try {
            const parsedItem = JSON.parse(value);
            setValue(parsedItem);
            setError(null)
            setSuccess(true)
            setExists(true)

        } catch (e) {
            if (e instanceof SyntaxError) {
                setValue(value || "");
                setError(null)
                setSuccess(true)
                setExists(true)
                return;
            }

            setValue(null);
            setError(e.message || "Error retrieving value");
            setSuccess(false)
            setExists(true)
        }
    }

    const retrieveExistingValue = () => {
        if (!(memoizedKey.current in localStorage)) {
            setSuccess(false);
            setError('Key does not exist');
            setValue(null);
            setExists(false);
            return;
        }

        const value = localStorage.getItem(memoizedKey.current);
        return handleRetrieveRawValue(value);
    }

    const getItem = () => {
        handleRetrieveRawValue(initValue.current);
    }


    useEffect(() => {
        const isInStorage = memoizedKey.current in localStorage;

        if (!isInStorage || override) {
            storeItem(initValue.current);
            return;
        }

        getItem();

        return () => {
            for (const key in localStorage) {
                if (localStorage.getItem(key) === "" && isUuidString(key)) {
                    localStorage.removeItem(key)
                }
            }
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!subscribed) {
            return;
        }
        let mounted = true;
        const timer = setInterval(() => {
            if (mounted) {
                retrieveExistingValue();
            }
        }, 5000);

        return () => {
            clearInterval(timer);
            mounted = false;
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subscribed]);

    const clearItem = (cb) => {
        localStorage.removeItem(memoizedKey.current);
        setSuccess(true);
        setError(null);
        setValue("");
        setExists(false);

        if (_.isFunction(cb)) {
            cb();
        }

    }

    const pointToDifferentKey = (newKey, forceRemove = false) => {
        if (!isValidKey(newKey) || newKey === memoizedKey.current) {
            return;
        }

        if (forceRemove) {
            clearItem();
        }

        memoizedKey.current = newKey;

        if (!(newKey in localStorage)) {
            storeItem("");
            return;
        }

        getItem()

    }

    const updateValue = (newValue) => storeItem(newValue);

    const subscribe = () => setSubscribed(true)

    const unSubscribe = () => setSubscribed(false)

    useEffect(() => {
        const handleStorageChange = (e) => {
            const {key, newValue} = e;

            if (!subscribed) {
                return;
            }

            if (key === memoizedKey.current) {
                setValue(newValue);
                setSuccess(true);
                setError(null);
                setExists(true)
            }
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    })

    return {
        item: {error, value, key: memoizedKey.current, exists, success, subscribed},
        updateValue,
        clearItem,
        subscribe,
        unSubscribe,
        pointToDifferentKey,
        initValue: initValue.current,
    }
};

export default useLocalStorage;
