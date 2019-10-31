import * as React                           from 'react';
import { IntlProvider, addLocaleData }      from 'react-intl';
import en                                   from 'react-intl/locale-data/en';
import ru                                   from 'react-intl/locale-data/ru';
import tr                                   from 'react-intl/locale-data/tr';
import { connect }                          from 'react-redux';

import { getLocale } from '../selectors/locale';
import messages      from './locale';

addLocaleData([...en, ...ru, ...tr]);

const mapStateToProps = state => ({
    locale: getLocale(state)
});

const LanguageProvider = (props) => {
    const { children, locale } = props;

    return (
        <IntlProvider
            key={ locale }
            locale={ locale }
            messages={ messages[locale] }
        >
            { children }
        </IntlProvider>
    );
};

const connector = connect(mapStateToProps);

export default connector(LanguageProvider);
