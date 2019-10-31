import * as React from 'react';

import { Props } from './types';
import { translateText } from '../../../utils/format-text';

const Btn: React.FunctionComponent<Props> = (props) => {
    const { classname } = props;
    return(
        <button className={ classname }></button>
    );
}

export default React.memo(Btn);
