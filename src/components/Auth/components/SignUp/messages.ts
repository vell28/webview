import { defineMessages } from 'react-intl';

export default defineMessages({
    passwordNotMatch: {
        id            : 'src.auth.signup.not.match',
        defaultMessage: 'Passwords do not match'
    },
    emailMin: {
        id            : 'src.auth.email.min',
        defaultMessage: 'Email should be at least 5 symbols'
    },
    passwordMin: {
        id            : 'src.auth.signup.min',
        defaultMessage: 'There should be at least 8 alphanumeric symbols'
    },
    passwordMax: {
        id            : 'src.auth.signup.max',
        defaultMessage: 'There should be less then 20 alphanumeric symbols'
    },
    type_1:{
        id            : 'src.auth.signup.weak',
        defaultMessage: 'Weak'
    },
    type_2:{
        id            : 'src.auth.signup.normal',
        defaultMessage: 'Normal'
    },
    type_3:{
        id            : 'src.auth.signup.secure',
        defaultMessage: 'Secure'
    },
    type_4:{
        id            : 'src.auth.signup.strong',
        defaultMessage: 'Strong'
    },
    type_5:{
        id            : 'src.auth.signup.extra',
        defaultMessage: 'Extra security'
    },
    good:{
        id            : 'src.auth.signup.good',
        defaultMessage: 'Good'
    },
});
