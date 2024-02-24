import {useEffect, useRef} from 'react';
import _ from "lodash";

export const useFocusTrap = () => {
    const ref = useRef(null);
    const handleFocus = (e) => {
        const focusableEls = ref.current.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            ),
            firstFocusableEl = focusableEls[0],
            lastFocusableEl = focusableEls[focusableEls.length - 1];

        const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) {
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
            }
            return;
        }

        if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
            e.preventDefault();
        }
    }


    useEffect(() => {
        ref.current.addEventListener('keydown', handleFocus);

        return () => {
            if (_.isEmpty(ref.current)) {
                return
            }

            ref.current.removeEventListener('keydown', handleFocus);
        };
    }, []);

    return ref;
}
