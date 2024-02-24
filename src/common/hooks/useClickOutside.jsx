import {useCallback, useEffect} from "react";

export const useOnClickOutside = (ref, callback) => {

    const handleClickOutside = useCallback(event => {
            const {target} = event;

            if (!target || !target.isConnected) {
                return
            }

            const isOutside = Array.isArray(ref)
                ? ref.every(r => r.current && !r.current.contains(target))
                : ref.current && !ref.current.contains(target)

            if (isOutside) {
                callback(event)
            }
        },
        [callback, ref],
    );

    useEffect(() => {
        document.addEventListener('pointerdown', handleClickOutside);
        return () => {
            document.removeEventListener('pointerdown', handleClickOutside);
        };
    }, [handleClickOutside, callback]);
};

export default useOnClickOutside;


