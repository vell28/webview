import * as React from 'react';

import messages from '../../messages';
import { translateText } from '@/utils/format-text';
import { LoaderBtn } from '@/components/Basic';
import './style.less';

const SendButton = (props) => {
  const { onClick, classname, value } = props;
  
  return (
    <div className="button-container">
      <LoaderBtn
        url={`uniwebview://action?issue=${value}`}
        onClick={onClick} 
        classname={`support-btn ${classname}`}
        name={'support'}
        text={translateText(messages.supportButton)}
      /> 
    </div>
  )
}

export default React.memo(SendButton);
