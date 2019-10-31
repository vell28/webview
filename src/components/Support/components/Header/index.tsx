import * as React from 'react';
import { Hamburger } from '@/components/Basic';

import './style.less';

const Header = () => {
  return (
    <div className="header-support-page">
      <Hamburger />
    </div>
  )
}

export default React.memo(Header);
