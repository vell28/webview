import * as React from 'react';

import { Input } from '@/components/Basic';
import messages from './messages';
import { translateText } from '@/utils/format-text';
import authMessage from '../../messages';
import { Context } from '@/containers/Auth/context';
import validate from '@/utils/validation';
import mainMessage from '@/messages';
import routes from '@/routing/constants';
import { setDisabled } from '@/utils';

const ResetPassword: React.FunctionComponent<any> = (props) => {

    const { changeDirection } = props;

    const { 
        handleSubmit, history, onClickOutsideInput, pathname
    } = React.useContext(Context);

    const [password, setPassword] = React.useState<string>('');
    const [retype, setRetype] = React.useState<string>('');
    const [reliability, setReliability] = React.useState<number>(0);
    const [valid, setValid] = React.useState({ text: '', error: false });

    const state = {
        password: value => setPassword(value),
        retype: value => setRetype(value),
    }

    const animateRout = () => {
        history.push(routes.logIn);
        changeDirection('back');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        const validation = validate(value, name, null, retype, password);

        const { text, type, error } = validation;

        if (text) {
            setValid({ text, error });
            setReliability(type);
        }

        state[name](value.trim());
    }

    const onSubmit = () => {
        const fields = { 'password': password, 'retype': retype };
        let newError = false;

        if(!retype || !retype.length) {
            
            setValid({ text: 'passwordNotMatch', error: true });
            setReliability(0);

            newError = true;
            return;
        }

        Object.keys(fields).forEach(item => {
            
            const validation = validate(fields[item], item, null, retype, password);

            const { text, type, error } = validation;

            if (text) {
                setValid({ text, error });
                setReliability(type);

                newError = error;
                return;
            }
        })

        !newError && handleSubmit({ password, component: 'ResetPassword' });
    }

    const circles: number[] = [1, 2, 3, 4, 5];

    return (
        <div
            className="auth-wrapper reset-password container"
            onClick={onClickOutsideInput}
            data-scroll="scroll"
        >
            <div className="to-center">
                <div className="auth-logo-wrap2">
                    <img src={require('@/images/logo-2.png')} alt="GlobalVirtual" />
                </div>
                <div className="auth-btn-back">
                    <span
                        className="btn-back"
                        onClick={animateRout}
                    />
                </div>
                <div className="login-wrap">
                    <div className="forgot-text-wrap">
                        <h2>{translateText(messages.title)}</h2>
                        <p>{translateText(messages.text)}</p>
                    </div>
                    <div className="form-wrap">
                        <Input
                            classname={'auth-input'}
                            type={'password'}
                            name={'password'}
                            value={password}
                            error={''}
                            onChange={handleChange}
                            placeholder={translateText(messages.title)}
                            disabled={ setDisabled(pathname, routes.resetPassword) }
                        />
                        <Input
                            classname={'auth-input'}
                            type={'password'}
                            name={'retype'}
                            value={retype}
                            error={''}
                            onChange={handleChange}
                            placeholder={translateText(authMessage.retypePasswordPlaceholder)}
                            disabled={ setDisabled(pathname, routes.resetPassword) }
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
                                {translateText(authMessage.submit)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;
