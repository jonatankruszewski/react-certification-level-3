import {useState} from 'react';
import AutoComplete from "../components/Autocomplete.jsx";
import _ from "lodash";
import {countries} from "../utils/countries.js";
import {fakeUsers} from "../utils/fakeUsers.js";
import styles from './Exercise03.module.scss';
const choices = [fakeUsers, countries]

const item = choices[Math.floor(Math.random()*choices.length)];
const Exercise03 = () => {

    const [valueChange, setValueChange] = useState(null);

    return (
        <section className={styles.root}>
            <h2>
                Exercise 03
            </h2>
            <AutoComplete list={item} filterProp='name' label='name' valueChange={setValueChange}/>
            {!_.isEmpty(valueChange) && <h5> Selected Item: {JSON.stringify(valueChange)}</h5>}
        </section>
    );
};

export default Exercise03;

