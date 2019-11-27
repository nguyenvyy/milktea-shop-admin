
export function debounce(func, wait) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;

        var executeFunction = function () {
            func.apply(context, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(executeFunction, wait);
    };
};

export const formatVND = (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const deleteformatVND = (value) => value.replace(/\$\s?|(,*)/g, '')
export const calculateExtraPoint = priceTotal => Math.floor(priceTotal/10000) 

/**
 *  Function get random number in range
 * @param {number} min min number
 * @param {number} max max number
 * @returns {number} number in valid range
 */
export const getRandom = (min, max) => {
    const random = Math.random() * (max - min) + min
    return Math.floor(random)
}