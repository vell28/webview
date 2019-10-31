import * as React from 'react';
import { Link } from 'react-router-dom';

import { translateText } from '@/utils/format-text';
import messages from './messages';
import { Input } from '@/components/Basic';
import routers from '@/routing/constants';
import authMessage from '../../messages';
import { Context } from '@/containers/Auth/context';
import { setDisabled } from '@/utils';
import routes from '@/routing/constants';

const LogIn: React.FunctionComponent<any> = (props) => {

    const { changeDirection } = props;

    const { 
        handleSubmit, pathname, response, setResponseAction, onClickOutsideInput 
    } = React.useContext(Context);

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [checked, setChecked] = React.useState<boolean>(true);

    const { component } = response;

    const state = {
        password: value => setPassword(value),
        email: value => setEmail(value)
    }

    React.useEffect(() => {
        component === 'LogIn' && setResponseAction({});
    },              [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;

        state[name](value.trim());
    };

    const onSubmit = () => {
        handleSubmit({ email, password, checked, component: 'LogIn' });
    }

    return (
        <div
            className="auth-wrapper"
            onClick={onClickOutsideInput}
            data-scroll="scroll"
        >
            <div className="to-center">
                <div className="auth-logo-wrap2">
                    <img src={require('@/images/logo-2.png')} alt="GlobalVirtual" />
                </div>
                <div className="login-wrap">
                    <div className="form-wrap">
                        <Input
                            classname={`auth-input${component === 'LogIn' ? ' error' : ''}`}
                            type={'email'}
                            name={'email'}
                            value={email}
                            error={''}
                            onChange={handleChange}
                            placeholder={translateText(messages.loginPlaceholder)}
                            disabled={ setDisabled(pathname, routes.logIn) }
                        />
                        <Input
                            classname={`auth-input${component === 'LogIn' ? ' error' : ''}`}
                            type={'password'}
                            name={'password'}
                            value={password}
                            error={''}
                            onChange={handleChange}
                            placeholder={translateText(messages.passPlaceholder)}
                            disabled={ setDisabled(pathname, routes.logIn) }
                        />
                        <div className="auth-checkbox-block">
                            <div className="auth-checkbox">
                                <label htmlFor="checkbox">
                                    <input
                                        type="checkbox"
                                        onChange={() => setChecked(!checked)}
                                        checked={checked}
                                    />
                                    <span></span>
                                </label>
                            </div>
                            <p onClick={() => setChecked(!checked)}>
                                {translateText(messages.keepMe)}
                            </p>
                        </div>
                        <div className="auth-btn-wrap">
                            <button
                                className="login-btn"
                                onClick={onSubmit}
                            >
                                {translateText(authMessage.login)}
                            </button>
                            <button
                                className="signup-btn"
                                onClick={() => changeDirection('front')}
                            >
                                <Link to={routers.signUp}>
                                    {translateText(authMessage.signUp)}
                                </Link>
                            </button>
                        </div>
                        <div onClick={() => changeDirection('front')}>
                            <Link to={routers.forgotPassword}>
                                {translateText(messages.forgot)}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn;
