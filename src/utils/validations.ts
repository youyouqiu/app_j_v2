const isExisty = (value: any) => {
    return value !== null && value !== undefined;
};

const isEmpty = (value: any) => {
    return value === '' || value == null || !/\S/.test(value)
};

const validations = {
    isDefaultRequiredValue: function (value: any) {
        return value === undefined || value === '';
    },
    isRequired: function (value: any) {
        return isExisty(value) && !isEmpty(value) && !(value instanceof Array && (value.length === 0 || (value.length === 1 && !value[0])));
    },
    isExisty: function (value: any) {
        return isExisty(value);
    },
    matchRegexp: function (value: any, regexp: RegExp) {
        return !isExisty(value) || isEmpty(value) || regexp.test(value);
    },
    isUndefined: function (value: any) {
        return value === undefined;
    },
    isEmptyString: function (value: any) {
        return isEmpty(value);
    },
    isUrl: function (value: string) {
        //return validations.matchRegexp(value, /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i);
        return validations.matchRegexp(value, /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|\/|\?)*)?$/i);
    },
    isTrue: function (value: boolean) {
        return value === true;
    },
    isFalse: function (value: boolean) {
        return value === false;
    },
    isNumeric: function (value: any) {
        if (typeof value === 'number') {
            return true;
        }
        return validations.matchRegexp(value, /^[-+]?(?:\d*[.])?\d+$/);
    },
    isNumber: function (value: any) {
        if (typeof value === 'number') {
            return true;
        }
        return validations.matchRegexp(value, /^[-+]?(?:\d*[.])?\d+$/);
    },
    isAlpha: function (value: any) {
        return validations.matchRegexp(value, /^[A-Z]+$/i);
    },
    isAlphanumeric: function (value:any) {
        return validations.matchRegexp(value, /^[0-9A-Z]+$/i);
    },
    isInt: function (value:any) {
        return validations.matchRegexp(value, /^(?:[-+]?(?:0|[1-9]\d*))$/);
    },
    isGreaterThan: function (value: number, eq: number) {
        return isEmpty(value) || (value * 1) > (eq * 1);
    },
    isGreaterThanOrEqual: function (value:number, eq: number) {
        return (value * 1) >= (eq * 1);
    },
    isLessThan: function (value:number, eq: number) {
        return (value * 1) < (eq * 1);
    },
    isLessThanOrEqual: function (value:any, eq: number) {
        return (value * 1) <= (eq * 1);
    },
    isFloat: function (value:any) {
        //return validations.matchRegexp(value, /^(?:[-+]?(?:\d+))?(?:\.\d*)?(?:[eE][\+\-]?(?:\d+))?$/);
        return validations.matchRegexp(value, /^(?:[-+]?(?:\d+))?(?:\.\d*)?(?:[eE][+-]?(?:\d+))?$/);
    },
    isCurrency: function (value:any) {
        return validations.matchRegexp(value, /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/);
    },
    isWords: function (value:any) {
        return validations.matchRegexp(value, /^[A-Z\s]+$/i);
    },
    isSpecialWords: function (value:any) {
        return validations.matchRegexp(value, /^[A-Z\s\u00C0-\u017F]+$/i);
    },
    isLength: function (value:any, length: number) {
        return !isExisty(value) || isEmpty(value) || value.length === length;
    },
    equals: function (value:any, eql: any) {
        return !isExisty(value) || isEmpty(value) || value === eql;
    },
    password: function(value: any) {
        return validations.matchRegexp(value, /^[0-9A-Za-z]{8,16}$/)
    },
    maxLength: function (value:any, length: number) {
        return !isExisty(value) || value.length <= length;
    },
    minLength: function (value:any, length: number) {
        return !isExisty(value) || isEmpty(value) || value.length >= length;
    },
    isPureNumber: function (value:any) {
        return validations.matchRegexp(value, /^[\d]+$/i);
    },
    isPhoneNumber: function (value:any) {
        return validations.matchRegexp(value, /^1(3|4|5|6|7|8|9)\d{9}$/);
    },
    isTrueName: function (value:any) {
        return validations.matchRegexp(value, /^[\u4e00-\u9fa5]{1,10}$/);
    },
    isNormalString: function(value: any, length:number=25) {
        return validations.matchRegexp(value, /^[\u4e00-\u9fa5A-Za-z0-9-\_]+$/) && validations.maxLength(value, length)
    },
    validate: (values: any, rules: any) => {
        let errors : any;
        Object.keys(rules).forEach(k => {
            let val = values[k];
            let rule = rules[k];
            if (rule) {
                for (var i = 0; i < rule.length; i++) {
                    let item = rule[i];
                    let [func, msg, ...args] = item;
                    if (!func(val, ...args)) {
                        errors[k] = msg;
                        break;
                    }
                }
            }
        });

        return errors;
    },
    validateArr: (values: any, rules: any) => {
        let errors: any;
        Object.keys(rules).forEach(k => {
            let val = values[k];
            let rule = rules[k];
            if (rule) {
                for (var i = 0; i < rule.length; i++) {
                    let item = rule[i];
                    let [func, msg, ...args] = item;
                    if (!func(val, ...args)) {
                        errors.push(msg)
                        break;
                    }
                }
            }
        });

        return errors;
    }


};

export default validations;
