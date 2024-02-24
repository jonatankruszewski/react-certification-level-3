import React, {useEffect} from "react";
import {handleStringify, isValidKey} from "../utils/localStorageUtils.js";
import _ from "lodash";
import {v4 as uuid, validate as isUuidString} from "uuid";

const useLocalStorage = ({key, initialValue = "", options = {subscribed: false, override: false}} = {}) => {

        const memoizedKey = React.useRef(isValidKey(key) ? key : uuid());

        const storeItem = futureValue => {
            try {
                const sanitizedValue = handleStringify(futureValue);
                localStorage.setItem(memoizedKey.current, sanitizedValue);

                const newValue = {
                    success: true, error: null, key: memoizedKey.current, value: sanitizedValue, exists: true,
                }

                setValue(newValue)

            } catch (e) {
                setValue({
                    success: false, error: e, key: memoizedKey.current, value: null, exists: true,
                })
            }
        }
        const handleRawValue = (value) => {
            try {
                const parsedItem = JSON.parse(value);
                return {
                    success: true, error: null, key: memoizedKey.current, value: parsedItem, exists: true,
                }
            } catch (e) {

                if (e instanceof SyntaxError) {
                    return {
                        success: true, error: null, key: memoizedKey.current, value, exists: true,
                    }
                }

                return {
                    success: false, error: e, key: memoizedKey.current, value: "", exists: true,
                }
            }
        }

        const retrieveItem = () => {
            if (!(memoizedKey.current in localStorage)) {
                return {
                    success: false,
                    error: new SyntaxError('Key not found'),
                    key: memoizedKey.current,
                    value: null,
                    exists: false,
                }
            }
            const value = localStorage.getItem(memoizedKey.current);
            return handleRawValue(value);
        }

        const getItem = () => {
            const override = _.get(options, 'override', false);
            const value = override ? initialValue : localStorage.getItem(memoizedKey.current) || "";
            return handleRawValue(value);
        }


        const [value, setValue] = React.useState(getItem());
        const [subscribed, setSubscribed] = React.useState(_.get(options, 'subscribed', false));


        useEffect(() => {
            const isInStorage = memoizedKey.current in localStorage;
            const shouldOverride = _.get(options, 'override', false);
            if (!isInStorage || shouldOverride) {
                storeItem(initialValue);
                return;
            }

            const currentValue = getItem();
            setValue(currentValue);

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
                    const retrievedItem = retrieveItem();
                    const currentStorageValue = _.get(retrievedItem, 'value');
                    debugger;
                    if (_.isEqual(currentStorageValue, _.get(value, 'value'))) {
                        return;
                    }

                    storeItem(retrievedItem);
                }
            }, 10000);

            return () => {
                clearInterval(timer);
                mounted = false;
            }
            //eslint-disable-next-line react-hooks/exhaustive-deps
        }, [subscribed]);

        const clearItem = (cb) => {
            if (memoizedKey.current in localStorage) {
                localStorage.removeItem(memoizedKey.current);

                setValue({
                    success: true, error: null, key: memoizedKey.current, value: null, exists: false,
                });

                if (_.isFunction(cb)) {
                    cb();
                }

                return;
            }

            setValue({
                success: false,
                error: new SyntaxError('Key not found'),
                key: memoizedKey.current,
                value: null,
                exists: true,
            })


        }

        const pointToDifferentKey = (newKey) => {
            if (!isValidKey(newKey) || newKey === memoizedKey.current) {
                return;
            }

            clearItem();
            memoizedKey.current = newKey;

            if (!(newKey in localStorage)) {
                storeItem("");
                return;
            }

            setValue(getItem());
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
                    setValue({...getItem(), value: newValue});
                }
            }

            window.addEventListener('storage', handleStorageChange)
            return () => window.removeEventListener('storage', handleStorageChange)
        })

        return {
            value,
            updateValue,
            clearItem,
            subscribe,
            unSubscribe,
            pointToDifferentKey,
            subscribed
        }
    }
;

export default useLocalStorage;
