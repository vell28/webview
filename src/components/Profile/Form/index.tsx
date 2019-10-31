import * as React from 'react';

import { Input } from '@/components/Basic';
import { translateText } from '@/utils/format-text';
import authMessage from '@/components/Auth/messages';
import message from './messages';
import { mask } from '@/utils';
import { Phone, Password } from './components';
import { context } from '@/containers/Profile/context';

const ProfileForm = (props) => {
    const { country, setCountry } = props;
    
    const { 
        user,
        response,
        switched,
        onInputFocus,
        setSwitched,
        handleBlur,
        handlerUpdate,
        setResponseAction
    } = React.useContext(context);

    const [ name, setName ]   = React.useState<string>('');
    const [ email, setEmail ] = React.useState<string>('');
    const [ phone, setPhone ] = React.useState<string>('');

    const state = { 
        name: value => setName(value.replace(/^\s+/g, '').replace(/\s\s/g, ' ')),
        email: value => setEmail(value.trim()),
        phone: value => setPhone(value.replace(/[^\d]/g, ''))
    };

    const { component, filedName, status } = response;

    React.useEffect(() => {
        Object.keys(state).forEach(item => {
            if (user[item] && item !== 'name') {

                state[item](user[item])
            }
        })

        if(user && user.firstName) {
            state.name(`${user.firstName} ${user.lastName}` || '')
        }

        return () => {
            component === 'ProfileForm' && setResponseAction({}); 
        }
    },              [ user ])

    const onBlur = (e) => {
        handleBlur(e);
        handlerUpdate(e);
    }

    const phoneRef = React.useRef<HTMLInputElement>();

    const handleError = (name) => {
        if (component === 'ProfileForm' && name === filedName && status === 400) {
            return 'auth-input error';
        } 

        return 'auth-input';
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        let text;
        
        if(name === 'name') {

            const data = value.split(' ')
                .map(item => {
                    if(item[0] && item[0] !== item[0].toUpperCase()) {
                        return `${item[0].toUpperCase()}${item.substr(1, item.length - 1)}`;
                    }
                    return item;
                });

            text = data.join(' ');
        }

        if(component === 'ProfileForm' && filedName === 'name') {
            setResponseAction({})
        }

        state[name](text || value);
    }

    const handleFocus = () => {
        !!phone && setCountry(false);
    
        phoneRef.current.focus();
    }

    return (
        <>
            {country &&
                <Phone 
                    goBack={setCountry}
                    getPhone={setPhone}
                    handleFocus={handleFocus}
                />
            }
            <div className={`form-wrap ${!!country ? ' hide' : ''}`}>
                <div className={`profile-top-form${switched ? ' active' : ''}`}>
                    <Input 
                        classname={ `${handleError('name')} profile-name-input` }
                        type={'text'}
                        name={'name'}
                        value={name}
                        disabled={ switched || country }
                        error={''}
                        onChange={handleChange}
                        onBlur={ onBlur }
                        placeholder={ translateText(message.namePlaceholder) }
                    />
                    <Input 
                        classname={ handleError('email') }
                        type={'email'}
                        name={'email'}
                        value={email}
                        disabled={ switched || country }
                        error={''}
                        onChange={handleChange}
                        onBlur={ onBlur }
                        placeholder={ translateText(authMessage.emailPlaceholder) }
                    />
                    <div className="phone-mask-wrap">
                        <Input 
                            inputRef={phoneRef}
                            classname={ handleError('phone') }
                            type={'tel'}
                            name={'phone'}
                            value={ mask(phone) }
                            disabled={ switched || country }
                            error={''}
                            onChange={handleChange}
                            onFocus={ !!phone.length ? onInputFocus : () => setCountry(true) }
                            onBlur={ onBlur }
                            placeholder={''}
                        />
                        <span 
                            onClick={ () => setCountry(true) }
                            className="phone-mask"
                        >
                            { mask(phone) }
                        </span>
                    </div>
                    <div className="auth-btn-wrap">
                        <button 
                            className="signup-btn"
                            onClick={ () => setSwitched(true) }
                        >
                            <span className="change">
                                { translateText(message.changePassword) }
                            </span> 
                        </button>
                    </div>
                </div>
                <div className={`profile-opacity-inputs${switched ? ' active' : '' }`}>
                    <Password 
                        classname={ handleError('password') }
                        switched={ switched }
                    />
                </div>
            </div>
        </>
    )
}

export default React.memo(ProfileForm);
