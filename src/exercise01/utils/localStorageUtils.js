import _ from "lodash";

export const isValidKey = (key) => {
    return _.isString(key) && !_.isEmpty(key);
}

