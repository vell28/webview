import * as React from 'react';
import { connect } from 'react-redux';

import { getLocale } from '@/selectors/locale';
import { getUser } from '@/selectors/user';
import { Provider } from './context';
import { ProfileComponent } from '@/components';
import { 
    updateUserAction,
    setResponseAction,
    startProgressAction
} from '@/actions';
import WithScroll from '@/hoc/withResize';
import validate from '@/utils/validation';
import { getResponse } from '@/selectors/response';
import { Props } from './types';
import { getSidebar, getProgressBar } from '@/selectors/ui';

const mapStateToProps = state => ({
    sidebar: getSidebar(state),
    user: getUser(state),
    response: getResponse(state),
    progressBar: getProgressBar(state)
})

const mapDispatchToProps = {
    updateUserAction,
    setResponseAction,
    startProgressAction
}

const Profile: React.FunctionComponent<Props> = (props) => {
    const [ reliability, setReliability ] = React.useState<number>(0);
    const [ valid, setValid ] = React.useState<{ text: string; error: boolean }>({ text: '', error: false });
    const [ passChange, setPassChange ] = React.useState<boolean>(false);
    const [ switched, setSwitched ] = React.useState<boolean>(false);

    const {
        user,
        sidebar,
        response,
        progressBar,
        locale, 
        onClickOutsideInput,
        onInputFocus,
        handleBlur,
        updateUserAction,
        setResponseAction
    } = props;

    React.useEffect(() => {
        const { filedName, component, status } = response;

        if (!!sidebar && !!passChange && filedName !== 'password') {
            setSwitched(false);
        }

        if (component === 'ProfileForm' && status === 200 && filedName === 'password') {
            setSwitched(false);
        }
    },              [ sidebar, response ])

    const handlerUpdate = (e: React.SyntheticEvent<HTMLInputElement>): void => {

        const { name, value, files } = e.target as HTMLInputElement;
        let body;

        if(!!value.length && value !== user[name]) {

            switch(name) {
                case 'name':
                    body = {};
                    const data = value.split(' ');

                    if (!!data.length) {
                        let lastName;

                        if (data.length > 1) {
                            lastName = data.slice(1, data.length);
                            lastName = lastName.join(' ');
                            
                        } else {
                            lastName = data[1] || '';
                        }

                        if (data[0] !== user['firstName'] || lastName !== user['lastName']) {
                            body['firstName'] = data[0] ? data[0].trim() : '';
                            body['lastName']  = lastName;
                        }
                    }
                    break;

                case 'file':
                    body = new FormData();

                    body.append('file', files[0]);
                    body.append('tags', 'avatar');
                    body.append('replace', true);
                    body.append('internal', true);

                    break;

                case 'phone':
                    body = {};
                    const phone = value.replace('+', '').replace(/\s+/g, '');
                    
                    if(user[name] !== phone) {
                        body[name] = phone;
                    }
                    break;

                default:
                    body = {};
                    body[name] = value.trim();
                    break;
            }

            if (!!body && Object.keys(body).length || name === 'file') {
                updateUserAction({ body, component: 'ProfileForm', name })
            }
        }
    }

    const handlePasswordChange = (password: string, retype: string): void => {
        const fields = { 'password': password, 'retype': retype };
        let newError = false;

        Object.keys(fields).forEach(item => {
            const validation = validate(fields[item], item, null, retype, password);

            if(!retype || !retype.length) {
                setValid({ text: 'passwordNotMatch', error: true });
                setReliability(0);
                newError = true;
            }

            const { text, type, error } = validation;   
    
            if(text) {
                setValid({ text, error });
                setReliability(type);

                newError = error;
                return;
            }
        })
        
        !newError && updateUserAction({ 
            body: { password }, component: 'ProfileForm', name: 'password' 
        });

        !newError && setPassChange(true);
    }

    return (
        <Provider 
            value={ { 
                locale,
                switched,
                response,
                progressBar,
                reliability,
                valid,
                user,
                setSwitched,
                setValid,
                setReliability,
                handlePasswordChange,
                onClickOutsideInput,
                handlerUpdate,
                onInputFocus,
                handleBlur,
                updateUserAction,
                setResponseAction
            } }
        >
            <ProfileComponent />
        </Provider>
    )
};

const connector = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default WithScroll(connector);
