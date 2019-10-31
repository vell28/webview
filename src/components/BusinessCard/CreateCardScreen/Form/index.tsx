import * as React from 'react';
import * as R from 'ramda';

import { Input } from '@/components/Basic';
import { context } from '@/containers/BusinessCard/context';
import { translateText } from '@/utils/format-text';
import mainMessage from '@/messages';
import './styles.less'

const CardEditForm = () => {
    const [ state, setState ] = React.useState<any>(undefined)

    const { 
        template,
        method,
        templateColor,
        onInputFocus,
        handleBlur,
        createCardAction,
        updateCardAction,
        createNotifyAction
    } = React.useContext(context);
    
    React.useEffect(() => {

        if (!state  && template) {

            const body = template && R.clone(template.schema);

            if (method === 'update') {
                Object.keys(body).forEach(item => {

                    if(body[item] && (body[item].type === 'file' || body[item].type === 'image')) {
                        body[item].value = '';
                    }

                });
            }

            setState(body);
        }

    },              [ template ]);

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;

        const tel = value.replace(/[^\d]/g, '').substr(0, 12);
        const field = value.replace(/^\s+/g, '').replace(/\s*\s/g, ' ');

        const text = type !== 'tel' ? field : tel;

        setState({
            ...state,
            [name]: {
                ...state[name],
                value: type !== 'file' && type !== 'image' ? text : { value, files }
            }
        });
    }

    const handleSubmit = () => {
        const body = R.clone(template);
        const newState = R.clone(state);
        let error = false;
        let totalFiles = 0;

        Object.keys(newState).forEach(item => {
            if(error) {
                return;
            }

            if(!newState[item].value && !newState[item].hidden) {

                if (method === 'update' && (newState[item].type === 'file' || newState[item].type === 'image')) {
                    return;
                }

                createNotifyAction('empty_fields');
                error = true;
                return;
                
            }

            if(newState[item].type === 'email') {

                if(!newState[item].value.match(/@/) || !newState[item].value.match(/./)) {
                    createNotifyAction('email_invalid');
                    error = true;
                    return;
                }
            }

            if(newState[item].type === 'url') {

                if(!newState[item].value.match(/http/) || !newState[item].value.match(/./)) {
                    createNotifyAction('url_invalid');
                    error = true;
                    return;
                }
            }

            if(newState[item].split) {
                const values = newState[item].value.split(' ');

                newState[item].split.forEach((field, i) => {
                    newState[newState[item].split[ i ].field] = { ...newState[item].split[ i ] }

                    if(values.length === newState[item].split.length) {
                        newState[newState[item].split[ i ].field].value = values[i]
                    }

                    if(values.length < newState[item].split.length) {
                        newState[newState[item].split[ i ].field].value = values[i] || '';
                    }

                    if(values.length > newState[item].split.length) {

                        if(!!newState[item].split[ i + 1 ]) {
                            
                            newState[newState[item].split[ i ].field].value = values[i];
                        } else {
                            const val = values.slice(i, values.length - 1);
                            
                            newState[newState[item].split[ i ].field].value = val.join(' ');
                        }
                    }
                })
            }

            if (state[item].value && state[item].value.files) {
                totalFiles++;
            }
        });

        body.schema = { ...newState };

        !error && method === 'create' && createCardAction({ template: { ...body }, templateColor, totalFiles });
        !error && method === 'update' && updateCardAction({ body: { ...body }, totalFiles });
    }

    return (
        <div className="business-card-edit-form form-wrap">
            {state && 
                Object.keys(state).map((item, i) => (
                    !state[item].hidden && 
                    <Input 
                        key={ i }
                        classname={'auth-input'}
                        type={state[item].type}
                        name={item}
                        value={state[item].value || ''}
                        error={''}
                        onChange={handleChange}
                        onFocus={onInputFocus}
                        onBlur={handleBlur}
                        placeholder={ state[item].placeHolder }
                    />
                ))
            }
            <button  
                onClick={ handleSubmit }
                className="login-btn"
            >
                { translateText(mainMessage.submit) }
            </button>
        </div>
    )
}

export default React.memo(CardEditForm);
