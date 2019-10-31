import * as React from 'react';
import cn from 'classnames';
import * as R from 'ramda';

import routes from '@/routing/constants';
import { context } from '@/containers/BusinessCard/context';
import messages from './messages';
import { translateText } from '@/utils/format-text';
import { LoaderBtn } from '@/components/Basic';
import './styles.less';
import { injectIntl } from 'react-intl';

const BusinessCardSection = (props) => {
  const [ hover, setHover ] = React.useState<boolean>(false);

  const { changeDirection, intl } = props;

  const { 
    history, method, template, templateColor, exportCardAction, removeCardAction
  } = React.useContext(context);

  const onFlipClick = () => {
    setHover(!hover);
  }

  const onCancel = () => {
    method === 'create' ? history.push(routes.businessCard) : history.push(routes.createCard);
    method === 'create' ? changeDirection('back') : changeDirection('front');
  }

  const onCreate = () => {
    method === 'create' && history.push(routes.createCard);

    method === 'update' && exportCardAction({ idcard: template.id, name: 'export' });

    changeDirection('front');
  }

  const animateRout = () => {

    const mess = translateText(messages.delete);
    const text = intl.messages [ R.path([ 'props', 'message', 'id' ], mess) ];
    const conf = confirm(text);

      if(!!conf) {
        removeCardAction({ id: template.id, component: 'BusinessCardSection' });
      }
  }
  
  const iconFlip = template && template.template 
  ? template.template !== 'white' 
    ? require('@/images/ar-business-card/flip-icon.png') 
    : require('@/images/flipIconCopyBlack.png') 
  : templateColor !== 'white' 
    ? require('@/images/ar-business-card/flip-icon.png') 
    : require('@/images/flipIconCopyBlack.png');

  return (
    <div className="business-card">
      <div className="section-header">
        <div className="title">
          { translateText(messages.businessCard) }
        </div>
      </div>

      <div className="preview-card">
        <div 
          className="flip-icon" 
          onClick={ onFlipClick } 
        >
          <img src={ iconFlip } alt="card" />
        </div>
        <div className={cn('flip-card', { hover })}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={ template && template.frontImage } alt="card" />
            </div>
            <div className="flip-card-back">
              <img src={ template && template.backImage } alt="card" />
            </div>
          </div>
        </div>
      </div>

      <div className="buttons-container">
        <div className="button-wrap">
          <button 
            className="link cancel" 
            onClick={onCancel}
          >
            { method === 'create' ? translateText(messages.cancel) : translateText(messages.edit) }
          </button>
        </div>
        {method === 'update' &&
          <div className="remove-card-wrap">
            <span
              className="remove-card-btn"
              onClick={ animateRout }
            />
          </div>
        }
        <div className="button-wrap">
        {method === 'create' 
          ?
          <button 
            className="link create"
            onClick={onCreate}
          > 
            { translateText(messages.create) }
          </button>
          :
          <LoaderBtn
            onClick={ onCreate } 
            classname={ 'link create' }
            name={ 'export' }
            text={ translateText(messages.export) }
          /> 
        }
        </div>
      </div>
    </div>
  )
}

export default React.memo(injectIntl(BusinessCardSection));
