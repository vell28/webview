import * as React from 'react';

import UserCard from './user-card';
import { Props } from './types';

const Header: React.FunctionComponent<Props> = (props) => {
  
  return (
    <div className="sidebar-header">
      <UserCard { ...props }/>
      <div className="header-underline"/>
    </div>
  )
}

export default React.memo(Header);
