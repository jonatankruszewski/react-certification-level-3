import {useLayoutEffect, useRef, useState} from "react";
import styles from "./Autocomplete.module.scss"
import PropTypes from "prop-types";
import useOnClickOutside from "../../common/hooks/useClickOutside.jsx";
import _ from "lodash";
import ControlledInput from "./ControlledInput.jsx";

const AutoComplete = ({list, label, filterProp, valueChange}) => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();
    const inputRef = useRef();
    const updateWidth = () => {
        if (!_.isElement(inputRef.current) || !_.isElement(menuRef.current)) {
            return;
        }

        if (inputRef.current.clientWidth === menuRef.current.clientWidth) {
            return;
        }

        menuRef.current.style.width = inputRef.current.clientWidth + 2 + 'px';
    }

    useLayoutEffect(() => {
        if (isOpen) {
            updateWidth()
        }
    }, [isOpen, searchPhrase])

    useOnClickOutside(menuRef, () => {
        setIsOpen(false)
    });

    const onFocus = () => {
        setIsOpen(true);
    }

    const onChange = (e) => {
        setSearchPhrase(e.target.value)
        setIsOpen(true)
    }

    const onBlur = () => {
        setIsOpen(false)
    }

    const onSelectItem = entity => {
        valueChange(entity)
        setIsOpen(false)
        setSearchPhrase("");
    }

    const onMouseDown = () => {
        setIsOpen(true)
    }
    const highlightText = (text) => {
        const parts = text.split(new RegExp(`(${searchPhrase})`, 'gi'));
        return (
            <span> {
                parts.map((part, i) =>
                    <span key={i} style={part.toLowerCase() === searchPhrase.toLowerCase() ? {fontWeight: 'bold'} : {}}>
                        {part}
                    </span>
                )
            }
            </span>
        );
    }

    const renderList = list
        .filter((entity) => {
            return entity[filterProp].toLowerCase().includes(searchPhrase.toLowerCase())
        })
        .map((entity, idx) => (
                <li
                    key={`${entity[name]}_${idx}`}
                    onMouseDown={() => onSelectItem(entity)}
                >
                    {highlightText(entity[label])}
                </li>
            )
        )

    return (
        <div className={styles.root}>
            <ControlledInput
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onMouseDown={onMouseDown}
                value={searchPhrase}
                ref={inputRef}
            />
            {list.length > 0 && searchPhrase && isOpen &&
                <div className={styles.content} ref={menuRef}>
                    <ul className={styles.overflowWrapper}>
                        {renderList.length > 0 ? renderList : <li className={styles.noResults}>No results</li>}
                    </ul>
                </div>}
        </div>
    );
};

AutoComplete.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    label: PropTypes.string.isRequired,
    filterProp: PropTypes.string.isRequired,
    valueChange: PropTypes.func.isRequired
}

export default AutoComplete;
