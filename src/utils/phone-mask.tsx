import * as React from 'react';

const phoneMask = '+000 __ ___ __ __';

export const mask = (value) => {

    const buf = phoneMask.split('');
    let j = 0;
    let space = 0;

    for (let i = 0; i < value.length; i++) {
        if(buf[j] === '+' || buf[j] === ' ') {
            space++;
            j++;
        }

        buf[j] = value[i];
        j++;
    }

    let str = '';
    buf.forEach(item => str+=item)

    return str.substr(0, value.length + space);
};
