import * as React from 'react';
import { Link } from 'react-router-dom';

import { Input } from '@/components/Basic';
import { translateText } from '@/utils/format-text';
import authMessage from '../../messages';
import validate from '@/utils/validation';
import routes from '@/routing/constants';
import mainMessage from '@/messages';
import { Context } from '@/containers/Auth/context';
import { setDisabled } from '@/utils';

const SignUp = (props) => {

    const { changeDirection } = props;

    const {
        pathname,
        handleSubmit, 
        response: { component, status }, 
        setResponseAction, 

    } = React.useContext(Context);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [retype, setRetype] = React.useState('');
    const [reliability, setReliability] = React.useState(0);
    const [valid, setValid] = React.useState({ text: '', error: false });

    const state = {
        email: value => setEmail(value),
        password: value => setPassword(value),
        retype: value => setRetype(value),
    }

    React.useEffect(() => {
        component === 'SignUp' && setResponseAction({});
    },              [])

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;

        const Name = name === 'email' && email.length > 1 ? 'password' : name;
        const Value = name === 'email' && email.length > 1 ? retype : value;

        const validation = validate(Value, Name, email, retype, password);

        const { text, type, error } = validation;

        if (text) {
            setValid({ text, error });
            setReliability(type);
        }

        state[name](value.trim());

    }

    const error = () => component === 'SignUp' && status === 400 ? true : false;

    const onSubmit = () => {
        const fields = { 'email': email, 'password': password, 'retype': retype };
        let newError = false;

        Object.keys(fields).forEach(item => {
            const validation = validate(fields[item], item, email, retype, password);

            const { text, type, error } = validation;

            if(!retype || !retype.length) {
                setValid({ text: 'passwordNotMatch', error: true });
                setReliability(0);
                newError = true;
            }

            if (text) {
                setValid({ text, error });
                setReliability(type);

                newError = error;
                return;
            }
        })

        !newError && handleSubmit({ email, password, component: 'SignUp' });
    }

    const circles = [1, 2, 3, 4, 5];
    return (
        <div
            className="auth-wrapper sign-up-wrap"
            data-scroll="scroll"
        >
            <div className="to-center">
                <div className="auth-logo-wrap2">
                    <img src={require('@/images/logo-2.png')} alt="GlobalVirtual" />
                </div>
                <div className="login-wrap">
                    <div className="form-wrap">
                        <Input
                            classname={`auth-input${error() ? ' error' : ''}`}
                            type={'email'}
                            name={'email'}
                            value={email}
                            error={''}
                            onChange={handleChange}
                            placeholder={translateText(authMessage.emailPlaceholder)}
                            disabled={ setDisabled(pathname, routes.signUp) }
                        />
                        <Input
                            classname={`auth-input${error() ? ' error' : ''}`}
                            type={'password'}
                            name={'password'}
                            value={password}
                            error={''}
                            onChange={handleChange}
                            placeholder={translateText(authMessage.passwordPlaceholder)}
                            disabled={ setDisabled(pathname, routes.signUp) }
                        />
                        <Input
                            classname={`auth-input${error() ? ' error' : ''}`}
                            type={'password'}
                            name={'retype'}
                            value={retype}
                            error={''}
                            onChange={handleChange}
                            placeholder={translateText(authMessage.retypePasswordPlaceholder)}
                            disabled={ setDisabled(pathname, routes.signUp) }
                        />
                        <div className="circles-block">
                            <div className="circles-wrap">
                                {circles.map((circle, i) => {
                                    if (circle > reliability) return <span key={i} className="circle-white"></span>
                                    if (circle <= reliability) return <span key={i} className="circle-purpure"></span>
                                })}
                            </div>
                            <p className={valid.error ? 'error' : 'text'}>
                                {valid.error || valid.text 
                                    ? translateText(mainMessage[valid.text]) 
                                    : translateText(mainMessage.good)
                                }
                            </p>
                        </div>
                        <div className="auth-btn-wrap">
                            <button
                                className="login-btn"
                                onClick={onSubmit}
                            >
                                {translateText(authMessage.signUp)}
                            </button>
                            <div className="auth-btn-back" onClick={() => changeDirection('back')}>
                                <Link to={routes.logIn} className="btn-back"></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
