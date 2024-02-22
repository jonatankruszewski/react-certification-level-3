import _ from "lodash";

export const isValidKey = (key) => {
    return _.isString(key) && !_.isEmpty(key);
}

export const handleStringify = (value) => {
    if (_.isString(value)) {
        return value;
    }

    if (_.isSymbol(value)) {
        return value.toString();
    }

    return JSON.stringify(value);
}
