import * as React from 'react';
import cn from 'classnames';

import { translateText } from '@/utils/format-text';
import m from './messages';
import storage from '@/utils/storage';
import Hexagon from '../Hexagon';
import { context } from '@/containers/BusinessCard/context';
import './styles.less';

const TemplateChooser = () => { 
  const { 
    templates, templateColor, setColor, activeId, setActive 
  } = React.useContext(context);

  const onTemplateColorChange = color => () => {
    storage.businessCardTemplateColor(color);

    setColor(color);
  }

  const onTemplateChange = id => () => {
    storage.businessCardTemplateId(id);

    setActive(id);
  }

  const renderColorChooser = color => (
    <div className="color-chooser">
      <Hexagon
        className={ color }
        onClick={ onTemplateColorChange(color) }
        active={ templateColor === color }
      />
    </div>
  )

  const previewImageStyle = {
    backgroundImage: templates[templateColor] && `url(${ templates[templateColor][activeId].image })`
  }

  return (
    <div className="bc-template-chooser">
      <div className="template-chooser-header">
        <div className="title">
          { translateText(m.chooseTemplate) }
        </div>

        <div className="template-color-icons">
          { renderColorChooser('white') }
          { renderColorChooser('black') }
        </div>
      </div>

      <div className="template-preview">
        <img 
          src={templates[templateColor] && templates[templateColor][activeId].image } 
          alt="preview"
        />
      </div>

      <div className="templates-list">
        { templates[templateColor] && templates[templateColor].map((item, i) => (
          <div
            key={ i }
            className={ cn('template-item', { active: i === activeId }) }
            onClick={ onTemplateChange(i) }
          >
            <img 
              src={ item.image } 
              alt="Template"
            />
          </div>
        )) }
      </div>

      <div className="separator"/>
    </div>
  )
}

export default React.memo(TemplateChooser);
