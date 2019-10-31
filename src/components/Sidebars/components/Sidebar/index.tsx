import * as React from 'react'

import { 
    Header,
    Navigation
} from '../index';
import { Props } from './types';
import './sidebar.less';

const SidebarNav: React.FunctionComponent<Props> = (props) => {
    const { user, onChangeMenu, pathname, logOut } = props;

    return (
        <div className="app-sidebar">
            <Header user={ user } onChangeMenu={onChangeMenu} />
            <Navigation 
                onChangeMenu={ onChangeMenu } 
                pathname={ pathname } 
                logOut={ logOut }
            />
        </div>
    )
}

export default React.memo(SidebarNav);
