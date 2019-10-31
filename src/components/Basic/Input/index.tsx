import * as React from 'react';
import * as R from 'ramda';

import { injectIntl } from 'react-intl';
import { Props } from './types';
import './styles.less';
import messages from './messages';
import { translateText } from '@/utils/format-text';

const Input: React.FunctionComponent<Props> = (props) =>  {
    const [show, isShow] = React.useState(false);

    const { 
        error,
        value,
        disabled,
        name,
        classname,
        onChange,
        type, 
        placeholder,
        intl,
        onFocus,
        inputRef,
        onBlur,
        onClick
    } = props;

    const holder = intl.messages [ R.path([ 'props', 'message', 'id' ], placeholder) ] || placeholder;

    const ref = inputRef || React.createRef();

    const handleClick = () => {
        isShow(!show);
        ref.current.focus();
    }

    return (
        <div className={ classname || 'input-block-wrap' }>
            <div className="input-wrap">
                <>
                    {type === 'image' || type === 'file' ?
                        <label htmlFor="">
                            <span className="file-name">
                                {value && !!value.files && value.files[0] 
                                    && value.files[0].name.substr(0, 18) || placeholder
                                }
                            </span>
                            <div className="image-wrap">
                                <span>{ translateText(messages.upload) }</span>
                            </div>
                            <input 
                                ref={ ref }
                                type={ 'file' }
                                name={ name }
                                value={ value.value || '' }
                                disabled={ disabled }
                                onChange={ onChange }
                                placeholder={ holder }
                                onFocus={ onFocus }
                                onBlur={ onBlur }
                                onClick={ onClick }
                            />
                        </label>
                        :
                        <input 
                            ref={ ref }
                            type={ !show ? type : 'text' }
                            name={ name }
                            value={ value }
                            disabled={ disabled }
                            onChange={ onChange }
                            placeholder={ holder }
                            onFocus={ onFocus }
                            onBlur={ onBlur }
                            onClick={ onClick }
                        />
                    }
                    {type === 'password' &&
                        <span 
                            className={ show ? 'eye-open' : 'eye-close' }
                            onClick={ handleClick }
                        >
                        </span>
                    }
                    </>
            </div>
            <span className="error">{ error }</span>
        </div>
    )
}

export default React.memo(injectIntl(Input));
