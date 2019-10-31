import * as React from 'react';
import { translateText } from '@/utils/format-text';
import messages from '../messages';

const ComingSoonImage = (props) => {

  return (
    <div className="image-container">
      <p>{translateText(messages.comingSoon)}</p>
      <img src={props.comingSoon} alt={props.comingSoon} />
    </div>
  )
}

export default React.memo(ComingSoonImage);
