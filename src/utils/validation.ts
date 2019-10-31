const min  = 8;
const max = 20;

const validate = (value, name, email, retype, password) => {
    const valid = {
        text: '',
        type: 0,
        error: false
    }
    const symbol = 
    [ '@', '_', '$', '!', '.', ',', '#', '%', '(', ')', '-', '+', '=', '/', '*', '^', '?', '>', '<', '№', ';' ];

    const regexp = /[A-Z]/gi;
    
    if(name === 'retype' && !!value.length) {

        if (value !== password) {
            valid.text = 'passwordNotMatch';
            valid.error = true;
            return valid;
        }
    }

    if (name === 'password' && !!value.length)  {

        if (retype.length && value !== retype) {
            valid.text = 'passwordNotMatch';
            valid.error = true;
            return valid;

        }
    }

    if(email !== null  && email.length < 4) {
        valid.text = 'emailMin';
        valid.error = true;
        return valid;
    }

    if(name === 'email' && email.length < 4) {
        valid.text = 'emailMin';
        valid.error = true;
        return valid;
    }

    if(name === 'password') {
        if(!value.length && !retype.length) {
            valid.text = 'passwordMin';
            valid.error = true;
            return valid;
        }
    }

    if(name === 'retype') {
        if(!value.length && !password.length) {
            valid.text = 'passwordMin';
            valid.error = true;
            return valid;
        }
    }

    if (value && (name === 'password' || name === 'retype')) {
        if (value.length < min || !/[0-9]/.test(value) || !/[A-Z]/.test(value.toUpperCase())) {

            valid.text = 'passwordMin';
            valid.error = true;
            return valid;
        }

        if (value.length > max) {

            valid.text = 'passwordMax';
            valid.error = true;
            return valid;
        }
    
        if (value.length >= min + 2 && value.length < min + 7) {
            symbol.forEach((item) => {
                if(value.indexOf(item) !== -1 && value.match(regexp)) {
                    valid.text = 'type_4';
                    valid.type = 4;
                    return valid;
                }
            })
            if(valid.text) {
                return valid;
            }
        }

        if (value.length >= min + 7 && value.length <= min + 10) {
            symbol.forEach((item) => {
                if(value.indexOf(item) !== -1 && value.match(regexp)) {
                    valid.text = 'type_5';
                    valid.type = 5;
                    return valid;
                }
            })
            if(valid.text) {
                return valid;
            }
        }

        if (value.length >= min) {
            symbol.forEach((item) => {
                if(value.indexOf(item) !== -1 && value.match(regexp)) {
                    valid.text = 'type_3';
                    valid.type = 3;
                    return valid;
                }
            })
            if(valid.text) {
                return valid;
            }

            if(value.match(regexp)) {
                valid.text = 'type_2';
            }

            if(valid.text) {
                valid.type = 2;
                return valid;
            } 
                valid.text = 'type_1';
                valid.type = 1;
                return valid;
            
        }
    }
    return valid;
}

export default validate;
