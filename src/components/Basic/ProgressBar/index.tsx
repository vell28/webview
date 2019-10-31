import * as React from 'react';

import { Props } from './types';
import './styles.less';

const ProgressBar: React.FunctionComponent<Props> = (props) => {
    const { progress } = props;
    return (
        <div className="progres-bar-block">
            <div className="progress-wrap">
                <div className="start" />
                <div className="progress" style={{ height: `${progress}%` }}/>
                <span className="procent">
                    { progress } %
                </span>
            </div>
        </div>
    )
}

export default React.memo(ProgressBar);
