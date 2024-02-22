import {useEffect, useRef, useState} from "react";
import styles from "./Autocomplete.module.scss"
import {useDebounce} from "../hooks/useDebounce.jsx";
import {useOnClickOutside} from "../hooks/useClickOutside.jsx";
import PropTypes from "prop-types";

const AutoComplete = ({list, label, filterProp, valueChange}) => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const debouncedSearchTerm = useDebounce(searchPhrase, 300);
    const menuRef = useRef();
    const inputRef = useRef();

    useOnClickOutside(menuRef, () => {
        setIsOpen(false)
    });


    useEffect(() => {
        if (searchPhrase) {
            setIsOpen(true)
        }
    }, [searchPhrase]);

    const onFocus = () => {
        setIsOpen(true)
    }

    const onChange = (e) => {
        setSearchPhrase(e.target.value)
    }

    const onBlur = () => {
        setIsOpen(false)
    }

    const renderList = list
        .filter((entity) => {
            return entity[filterProp].toLowerCase().includes(searchPhrase.toLowerCase())
        })
        .map((entity, idx) => (
                <li
                    key={`${entity[name]}_${idx}`}
                    onClick={() => valueChange(entity)}
                >
                    {entity[label]}
                </li>
            )
        )


    return (
        <div className={styles.root}>
            <input onChange={onChange} onFocus={onFocus} onBlur={onBlur} value={searchPhrase} ref={inputRef}/>
            {list.length > 0 && debouncedSearchTerm && isOpen &&
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
