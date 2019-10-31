import * as React from 'react';
import TextareaAutosize  from 'react-textarea-autosize';
import messages from '../../messages';
import { translateText } from '@/utils/format-text';

import './style.less';

const FeedbackField = (props) => {
  const { onChange, value } = props;

  return (
    <div className="support-write-container">
      <h2>{translateText(messages.feedback)}</h2>
      <TextareaAutosize  
        minRows={1}
        maxRows={9}
        onChange={onChange} 
        value={value} 
        maxLength="300"
      />
    </div>
  )
}

export default FeedbackField
