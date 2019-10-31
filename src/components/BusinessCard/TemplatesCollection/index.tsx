import * as React from 'react';

import { translateText } from '@/utils/format-text';
import m from './messages';
import { context } from '@/containers/BusinessCard/context';
import './styles.less';

const MIN_COLLECTION_ITEMS_TO_SHOW_DUMMY: number = 3

const TemplatesCollection = (props) => {

  const { changeDirection } = props;

  const { 
    userCards, handleCardUpdate, handleCardCreate 
  } = React.useContext(context);

  return (
    <div className="bc-templates-collection">
      <div className="templates-collection-header">
        <div className="title">
          { translateText(m.myCollection) }
        </div>

        <button 
          className="add-button" 
          onClick={ handleCardCreate }
        >
          <img 
            src={ require('images/ar-business-card/add-button.png') } 
            onClick={ ()=> changeDirection('front') }
          />
        </button>
      </div>

      <div className="collection-list">
        { userCards && !!userCards.length && userCards.map((item, i) => (
          <div 
            className="collection-item"
            onClick={ () => handleCardUpdate(i) }
            key={ i }
          >
            <img 
              src={ item.image } 
              alt="template" 
              onClick={ () => changeDirection('front') }
            />
            <span className="card-name">
              {item.schema && item.schema.disign.value 
                && !!item.schema.disign.value.length && item.schema.disign.value.substr(0, 14)
              }
            </span>
          </div>
        )) }

        { userCards && userCards.length < MIN_COLLECTION_ITEMS_TO_SHOW_DUMMY && (
          <div className="collection-item empty">
            <div className="border"/>
          </div>
        ) }
      </div>
    </div>
  )
}

export default TemplatesCollection;
