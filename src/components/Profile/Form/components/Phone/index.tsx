import * as React from 'react';

import { context } from '@/containers/Profile/context';
import './styles.less';
import { translateText } from '@/utils/format-text';
import { Input } from '@/components/Basic';
import message from './messages';
import { getCountry } from '@/utils';

const country = require('@/constants/country.json');

const Phone = (props) => {
    const [ phone, setPhone ] = React.useState<string>('');
    
    const { locale } = React.useContext(context);

    const { goBack, getPhone, handleFocus } = props;

    const handleChange = (e) => {
        setPhone(e.target.value);
    }

    const data = country.filter(item => getCountry(item.en, phone) || getCountry(item.code, phone));
    
    const handleClick = (code) => {
        handleFocus();
        typeof(code) === 'string' && getPhone(code);
        goBack(false);
    }

    return (
        <div className="phone-input-number">
            <div className="header-wrap">
                <div className="phone-input-back">
                    <span 
                        className="btn-back"
                        onClick={ handleClick } 
                    />
                </div>
                <div className="phone-input-search">
                    <Input
                        type={'text'}
                        name={'search'}
                        classname={'search-country'}
                        value={phone}
                        error={''}
                        onChange={handleChange}
                        placeholder={translateText(message.countryPlaceholder)}
                    />
                   { !phone && <span className="icon-search"></span>}
                </div>
            </div>
            <ul className="country-list-wrap">
                {data.map((item, i) => (
                    <li 
                        key={ i }
                        onClick={ () => handleClick(item.code) }
                    >
                        <span className="country">{ item[locale] || item.en }</span>
                        <span className="code">+ { item.code }</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Phone;
