
export const checkPositiveNumber = (value: string) => /^(\d+\d+)$|^(\d+)$/gm.test(value)
export const checkDivideBy = (number: number, by: number) => number%by === 0 ? true : false

export const checkMinMax = (value: number, min: number, max: number) => {
    return value >= min && value <= max
}

export const checkIsInterge = (value: any) => Number.isInteger(value)
export const check = (value: any) => /^[0-9]*$/gm.test(value)
export const checkIsNaN = (value: any) => isNaN(value);
export const checkNoSymbolsOrSpecialChars = (value: any) => {
    let regex = new RegExp(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g)
    return regex.test(value)
}