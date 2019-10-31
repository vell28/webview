import './styles.less';
import * as React from 'react';
import ReactPlayer from 'react-player';

import messages from './messages';
import { translateText } from '@/utils/format-text';
import Hexagon from '@/components/BusinessCard/Hexagon';
import { context } from '@/containers/BusinessCard/context';

const Preview = () => {

  const [info, setInfo] = React.useState(false);

  const { template, method } = React.useContext(context);

  const handlerInfoEnable = () => {
    setInfo(true);
  }

  const handlerInfoDisable = () => {
    setInfo(false);
  }

  const LINK = {
    id: method === 'update' && template ? template.id : template && template.svgPreviewTemplate,
    temp: method === 'update' ? '' : '/template',
  }

  return (
    <div className="preview">
      <div className="section-header">
        <div className="title">
          {translateText(messages.previewCard)}
        </div>
        <div className="info-button">
          <Hexagon className={info ? 'blue disabled' : 'blue'} onClick={handlerInfoEnable}>
            <div>?</div>
          </Hexagon>
        </div>
      </div>

      <div>
        <div className="preview-card">
        
          {info ?
            <div className="video-container">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=668nUCeBHyY"
                playing={true}
                loop={true}
                width="100%"
                height="100%"
              />
            </div> : <div className="photo-container">
              <img src={template && template.image} alt="preview"/>
            </div>
          }

          <div className="button-wrap">
            {info ?
              <div className="link">
                <span onClick={handlerInfoDisable}>
                  {translateText(messages.gotIt)}
                </span>
              </div> :
              <a
                className="link"
                href={
                  `uniwebview://action?product=xcard&mode=ar&dataUrl=https://dev.api.globalvirtual.world/gvw/xcard${LINK.temp}/public/${LINK.id}/ar`
                }

              >
                <span>{translateText(messages.preview)}</span>
              </a>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Preview);
