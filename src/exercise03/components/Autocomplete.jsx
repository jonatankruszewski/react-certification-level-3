import {useEffect, useRef, useState} from "react";
import styles from "./Autocomplete.module.scss"
import {useDebounce} from "../hooks/useDebounce.jsx";
import PropTypes from "prop-types";
import useOnClickOutside from "../hooks/useClickOutside.jsx";

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
        setIsOpen(true);
        inputRef.current.value = "";
        inputRef.current.value = searchPhrase;
    }

    const onChange = (e) => {
        setSearchPhrase(e.target.value)
    }

    const onSelectItem = entity => {
        setIsOpen(false);
        setSearchPhrase("");
        valueChange(entity)
    }
    const getHighlightedText = (text) => {
        // Split on highlight term and include term into parts, ignore case
        const parts = text.split(new RegExp(`(${searchPhrase})`, 'gi'));
        return <span> {parts.map((part, i) =>
            <span key={i} style={part.toLowerCase() === searchPhrase.toLowerCase() ? {fontWeight: 'bold'} : {}}>
            {part}
        </span>)
        } </span>;
    }

    const renderList = list
        .filter((entity) => {
            return entity[filterProp].toLowerCase().includes(searchPhrase.toLowerCase())
        })
        .map((entity, idx) => (
                <li
                    key={`${entity[name]}_${idx}`}
                    onClick={() => onSelectItem(entity)}
                >
                    {getHighlightedText(entity[label])}
                </li>
            )
        )


    return (
        <div className={styles.root}>
            <input onChange={onChange} onFocus={onFocus} value={searchPhrase} ref={inputRef}/>
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
