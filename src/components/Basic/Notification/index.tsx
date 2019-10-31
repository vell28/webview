import * as React from 'react';

import messages from '@/messages/requestFromServer';
import { translateText } from '@/utils/format-text';
import './styles.less';

const Notification = (props) => {
    const [ show, setShow ] = React.useState<string>('');
    
    const { textId, maxLen, id, i } = props;

    React.useEffect(() => {
        setShow(' show');
    },              [ ])

    React.useEffect(() => {
        i < maxLen && setShow('')
    },              [ maxLen ])

    return (
        <div className={`notify-wrap${show}`}>
            <span className={`notify-icon${textId.match(/success/) ? ' success' : ''}`}/>
            <p>{ messages[textId] && translateText(messages[textId])}</p>
        </div>
    )
}

export default React.memo(Notification);
