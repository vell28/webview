import * as React from 'react';

import { Input } from '@/components/Basic';
import { validate } from '@/utils';
import { context } from '@/containers/Profile/context';
import authMessage from '@/components/Auth/messages';
import { translateText } from '@/utils/format-text';
import mainMessage from '@/messages';
import messages from './messages';

const Password = (props) => {
    const { 
        reliability, 
        valid, 
        switched,
        setValid,
        setSwitched,
        setReliability, 
        response, 
        setResponseAction, 
        handlePasswordChange
    } = React.useContext(context);

    const { classname } = props;

    const [ password, setPassword ] = React.useState<string>('');
    const [ retype, setRetype ] = React.useState<string>('');

    const state = { 
        password: value => setPassword(value.trim()),
        retype:   value => setRetype(value.trim()),
    };

    const { component, filedName } = response;

    const circles = [ 1, 2, 3, 4, 5 ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        if(component === 'ProfileForm' && filedName === 'name') {
            setResponseAction({})
        }

        state[name](value);

        const validation = validate(value, name, null, retype, password);

        const { text, type, error } = validation;

        if(text) {
            setValid({ text, error });
            setReliability(type);
        }
    }

    return (
        <>
            <Input 
                classname={ classname }
                type={'password'}
                name={'password'}
                value={password}
                error={''}
                onChange={handleChange}
                placeholder={translateText(authMessage.passwordPlaceholder)}
                disabled={ !switched }
            />
            <Input 
                classname={'auth-input'}
                type={'password'}
                name={'retype'}
                value={retype}
                error={''}
                onChange={handleChange}
                placeholder={translateText(authMessage.retypePasswordPlaceholder)}
                disabled={ !switched }
            />
            <div className="circles-block">
                <div className="circles-wrap">
                    {circles.map((circle, i) => {
                        if(circle > reliability) return <span key={ i } className="circle-white"></span>
                        if(circle <= reliability) return <span key={ i } className="circle-purpure"></span>
                    })}
                </div>
                <p className={ valid.error ? 'error' : 'text'}>
                    {valid.error || valid.text 
                        ? translateText(mainMessage[ valid.text ]) 
                        : translateText(mainMessage.good) 
                    }
                </p>
            </div>
            <div className="profile-password-button-wrap">
                <button 
                    className="link cancel"
                    onClick={ () => setSwitched(false) }
                >
                    {translateText(messages.cancel)}
                </button>
                <button 
                    className="link create"
                    onClick={ () => handlePasswordChange(password, retype) }
                    disabled={ !!valid.error || !password.length || !retype.length }
                >
                    {translateText(messages.save)}
                </button>
            </div>
        </>
    )
}

export default Password;
