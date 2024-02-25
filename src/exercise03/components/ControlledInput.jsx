import {useEffect, useState, forwardRef} from "react";
import _ from "lodash";

const ControlledInput = forwardRef((props, ref) => {
    // eslint-disable-next-line react/prop-types
    const {value, onChange, ...rest} = props;
    const [cursor, setCursor] = useState(null);

    useEffect(() => {
        const input = ref.current;
        if (input) {
            input.setSelectionRange(cursor, cursor);
        }
    }, [ref, cursor, value]);

    const handleChange = (e) => {
        setCursor(e.target.selectionStart);
        if (_.isFunction(onChange)) {
            onChange(e);
        }
    };

    return <input ref={ref} value={value} onChange={handleChange} {...rest} />;
});

ControlledInput.displayName = "ControlledInput";

export default ControlledInput;
