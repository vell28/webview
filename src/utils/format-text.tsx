import * as React     from 'react';
import { injectIntl } from 'react-intl';

const Formatted = (props) => {
    const { intl: { formatMessage }, message } = props;

    return (
        <>{ formatMessage(message) }</>
    );
};

const FormattedText = injectIntl(Formatted);

export function translateText(message) {
    return <FormattedText message={ message } />;
}
