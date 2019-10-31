import * as React from 'react';

import messages from '../../messages';
import { translateText } from '@/utils/format-text';
import FeedbackField from '../FeedbackField';
import './style.less';

const MainContent = (props) => {

  const { onChange, value, handleFocus, version } = props;

  const [isShowVersion, handleShow] = React.useState(false);

  const { build, ui } = version;

  const showVersion = () => {
    handleShow(!isShowVersion);
  }

  return (
    <div className="support-content-container">
      <h2>{translateText(messages.supportHeader)}</h2>
      <div className="logo-container">
        <img src={require('@/images/support_logo.png')} alt="support_logo_img" />
        <div className="logo-description">
          <h3>Global & Virtual</h3>
          <p onClick={showVersion}>version {build.version}</p>
        </div>
      </div>
      <FeedbackField
        onChange={onChange}
        value={value}
        handleFocus={handleFocus}
      />
      {isShowVersion && <div className="popup-background">
        <div className="popup-content">
          <h3>== Build ==</h3>
            <p>
              <span>Version: { build.version || '' }</span>
              <span>Revision: { build.revision || '' }</span>
              <span>Creation date: { build.creationDate || '' }</span>
              <span>Pipeline: { build.pipeline || '' }</span>
            </p>
          <h3>== UI ==</h3>
          <p>
            <span>Version: { ui.version || '' }</span>
            <span>Revision: { ui.revision || '' }</span>
            <span>Creation date: { ui.creationDate || '' }</span>
            <span>Pipeline: { ui.pipeline || '' }</span>
          </p>
          <div className="button-wrap">
            <button className="link" onClick={showVersion}>OK</button>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default React.memo(MainContent);
