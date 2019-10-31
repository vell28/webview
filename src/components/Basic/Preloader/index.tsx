import * as React from 'react';

import { Props } from './types';
import './styles.less';

const Preloader: React.FunctionComponent<Props> = (props) => {
    const { classname, preloaderRef } = props;
    return(
        <div 
            className={`preloader-wrap${classname}`}
            ref={ preloaderRef }
        >
            <div className="dot-bricks" />
        </div>
    )
}

export default React.memo(Preloader);
