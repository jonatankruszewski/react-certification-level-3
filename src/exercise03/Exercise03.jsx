import  {useState} from 'react';
import AutoComplete from "./components/Autocomplete.jsx";
import _ from "lodash";
import {countries} from "./utils/countries.js";

const Exercise03 = () => {
    const [valueChange, setValueChange] = useState(null);

    console.log({valueChange})
    return (
        <h2>
            Exercise 03
            <AutoComplete list={countries} filterProp='name' label='name' valueChange={setValueChange}/>
            {!_.isEmpty(valueChange) && <h5> Selected Country: {JSON.stringify(valueChange)}</h5>}
        </h2>
    );
};

export default Exercise03;
