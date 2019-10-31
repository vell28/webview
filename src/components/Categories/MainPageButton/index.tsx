import * as React from 'react';

import { context } from '@/containers/Categories/context';
import './style.less';

const MainPageButton = (props) => {
  const { locale } = React.useContext(context);

  const { showPreloader } = (window as any);

  return (
    <div className="button-wrap-shadow">
      <div className="button-wrap">
        <a 
          href={`${props.href}&lang=${locale}`}
          className="link"
          onClick={ showPreloader }
        >
          <span>{props.value}</span>
        </a>
      </div>
    </div>
  )
}

export default MainPageButton
