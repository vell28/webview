import * as React from 'react';

import { Input } from '@/components/Basic';
import messages from './messages';
import { translateText } from '@/utils/format-text';
import authMessage from '../../messages';
import mainMessage from '@/messages';
import './styles.less';
import { Context } from '@/containers/Auth/context';
import routes from '@/routing/constants';
import { Link } from 'react-router-dom';
import { setDisabled } from '@/utils';

const Forgot: React.FunctionComponent<any> = (props) => {
    const [email, setEmail] = React.useState<string>('');
    const [submit, setSubmit] = React.useState<boolean>(false);

    const {
        handleSubmit, response: { component, status }, setResponseAction, pathname
    } = React.useContext(Context);

    const { changeDirection } = props;

    React.useEffect(() => {
        if (component === 'Forgot' && status === 200) {
            setSubmit(true)
        }

        return () => {
            component === 'Forgot' && setResponseAction({});
        }
    },              [ status ]);

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const result = () => {
        return `auth-input${component === 'Forgot' && status === 400 ? ' error' : ''}`;
    }

    const onSubmit = () => {
        if(component === 'Forgot') {
            setResponseAction({});
        };

        !!email.length && handleSubmit({ email, component: 'Forgot' });
    }
    
    return (
        <div
            className="auth-wrapper auth-forgot-wrap container"
            data-scroll="scroll"
        >
            <div className="to-center">
                <div className="auth-logo-wrap2">
                    <img src={require('@/images/logo-2.png')} alt="GlobalVirtual" />
                </div>
                <div className="auth-btn-back">
                    <span 
                        className="btn-back"
                        onClick={ () => changeDirection('back') }
                    >
                        <Link to={routes.logIn}>a</Link>
                    </span>
                </div>
                <div className="login-wrap forgot">
                    <div className="forgot-text-wrap">
                        <h2>{translateText(messages.title)}</h2>
                        <p>{!submit ? translateText(messages.forgotEmail) : translateText(messages.checkEmail)}</p>
                    </div>
                    <div className="form-wrap">
                        <Input
                            classname={`${result()}${submit ? ' opacity' : ''}`}
                            type={'email'}
                            name={'email'}
                            value={email}
                            error={''}
                            onChange={handleChange}
                            placeholder={translateText(authMessage.emailPlaceholder)}
                            disabled={ setDisabled(pathname, routes.forgotPassword) }
                        />
                        <div className="auth-btn-wrap">
                            <button
                                className={`login-btn${submit ? ' animated' : ''}`}
                                onClick={ !submit ? onSubmit : () => changeDirection('back') }
                            >
                                {!submit ? 
                                    translateText(authMessage.submit) 
                                    : <Link to={routes.logIn}>{ translateText(mainMessage.окey) }</Link>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgot;
