import * as React from 'react';

import routes from '@/routing/constants';
import PreviewSection from './PreviewSection';
import BusinessCardSection from './BusinessCardSection';
import { context } from '@/containers/BusinessCard/context';
import './styles.less';

const BusinessCardEditor = (props) => {

  const { changeDirection } = props;

  const { history } = React.useContext(context);

  const onGoBackClick = () => {
    history.push(routes.businessCard);
    changeDirection('back');
  }

  return (
      <div className="business-card-editor-container">
        <div className="header">
            <div 
              className="go-back-button" 
              onClick={ onGoBackClick }
            />
        </div>
        <PreviewSection/>
        <BusinessCardSection {...props}/>
      </div>
  )
}

export default BusinessCardEditor;
