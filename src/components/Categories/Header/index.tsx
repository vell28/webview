import * as React from 'react';

import './style.less';
import { Hamburger } from '@/components/Basic';

const Header = (props) => {
  return (
    <div className="header-categories-page">
      <Hamburger/>
    </div>
  )
}

export default Header
