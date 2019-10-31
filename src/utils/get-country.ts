export const getCountry = (str: string, value: string) => {
    const newValue = value.replace('+', '');
    
    if(str.toUpperCase().match(newValue.toUpperCase()) 
        && str.toUpperCase().match(newValue.toUpperCase()).index === 0) return true;

    return false;
}
