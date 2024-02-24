import {useState} from 'react';
import AutoComplete from "../components/Autocomplete.jsx";
import _ from "lodash";
import {countries} from "../utils/countries.js";
import {fakeUsers} from "../utils/fakeUsers.js";
import styles from './Exercise03.module.scss';

const choices = [fakeUsers, countries]

const item = choices[Math.floor(Math.random() * choices.length)];
const Exercise03 = () => {
    const [valueChange, setValueChange] = useState(null);

    return (
        <section className={styles.root}>
            <h2>
                Exercise 03
            </h2>
            <p>This page randomly provides to the AutoComplete component a list of users or countries. When clicked, you
                will be able to see the element selected as JSON</p>
            <p>Features:</p>
            <ul className={styles.explanation}>
                <li>Caret handled to not be at the start on focus</li>
                <li>Menu handled without using portals. Just a <code>position: absolute</code>. Width matched to the input using useLayoutEffect.</li>
                <li>Intentionally closes the menu on window resizing to avoid the trash flash of the update :)</li>
            </ul>
            <AutoComplete list={item} filterProp='name' label='name' valueChange={setValueChange}/>
            {!_.isEmpty(valueChange) && <h5> Selected Item: {JSON.stringify(valueChange)}</h5>}
        </section>
    );
};

export default Exercise03;

