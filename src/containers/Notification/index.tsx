import * as React from 'react';
import { connect } from 'react-redux';

import { getNotify } from '@/selectors/ui';
import { Notification } from '@/components/Basic';
import messages from '@/messages/requestFromServer';
import { Props } from './types';
import './styles.less';

const mapStateToProps = state => ({
    notifications: getNotify(state)
})

const Notify: React.FunctionComponent<Props> = (props) => {
    const { notifications } = props;

    const maxLen = 3;
    
    return (
        <div className="notification-list">
            {!!notifications.length && notifications.map((item, i) => 
                messages[item.textId] && <Notification 
                    key={ i }  
                    i={ i }
                    maxLen={ notifications.length - maxLen }
                    { ...item }  
                />
            )}
        </div>
    )
}

export default connect(mapStateToProps, {})(React.memo(Notify)); 
