import * as React from 'react'
import { connect } from 'react-redux';
import * as R from 'ramda';

import { BusinessCardComponent } from '@/components';
import { Provider } from './context';
import {
  getProgressBar, 
  getSidebar,
  getPreloader,
  getLoader
} from '@/selectors/ui'
import { 
  createCardAction,
  getCardListAction,
  getTemplateAction,
  updateCardAction,
  exportCardAction,
  removeCardAction,
  setResponseAction,
  togglePreloaderAction,
  createNotifyAction
} from '@/actions';
import { 
  getTemplate,
  getUserCardList
} from '@/selectors/businessCard';
import storage from '@/utils/storage';
import routing from '@/routing/constants';
import { getResponse } from '@/selectors/response';
import withPreloader from '@/hoc/withPreloader';

const mapStateToProps = (state) => ({
  progressBar: getProgressBar(state),
  sidebar: getSidebar(state),
  templates: getTemplate(state),
  userCards: getUserCardList(state),
  response: getResponse(state),
  preloader: getPreloader(state),
  loaders: getLoader(state)
});

const mapDispatchToProps = {
  createCardAction,
  getCardListAction,
  getTemplateAction,
  updateCardAction,
  exportCardAction,
  removeCardAction,
  setResponseAction,
  togglePreloaderAction,
  createNotifyAction
}

const BusinessCard = (props) => {
  const [ templateColor, setColor ] = React.useState<string>(storage.businessCardTemplateColor() || 'white');
  const [ activeId, setActive ] = React.useState<number>(storage.businessCardTemplateId() || 0);
  const [ activeCard, setActiveCard ] = React.useState<number>(0);
  const [ method, setMethod ] = React.useState<string>('create');

  const { 
    history,
    sidebar,
    response,
    loaders,
    preloader,
    progressBar,
    onInputFocus, 
    handleBlur, 
    userCards,
    getCardListAction, 
    getTemplateAction, 
    createCardAction,
    updateCardAction,
    exportCardAction,
    removeCardAction,
    setResponseAction,
    togglePreloaderAction,
    createNotifyAction
  } = props;

  const templates = !!Object.keys(props.templates).length && R.clone(props.templates);

  React.useEffect(() => {
    togglePreloaderAction(true);

    !Object.keys(props.templates).length && getTemplateAction({ templateColor });
    !userCards.length && activeCard !== 0 && setActiveCard(0);
    !userCards.length && getCardListAction();

  },              [ ]);

  React.useEffect(() => {

    templates && Object.keys(templates[templateColor]).forEach((item) => {

      new Image().src = templates[templateColor][item].image;
    });

    !!preloader && togglePreloaderAction(false);
    
  },              [ templates, userCards, preloader ]);

  const TEMPLATE = {
    create: templates[templateColor] && templates[templateColor][activeId],
    update: userCards && userCards[activeCard] && userCards[activeCard]
  }

  const template = TEMPLATE[method];
  const loader = loaders.find(item => item === 'export');

  const handleCardUpdate = (id) => {
    setActiveCard(id);
    method !== 'update' && setMethod('update');

    history.push(routing.createBusinessCard);
  } 

  const handleCardCreate = () => {
    method !== 'create' && setMethod('create');
    
    history.push(routing.createBusinessCard);
  }
  
  return (
    <Provider 
      value={{
        history,
        sidebar,
        userCards,
        method,
        loader,
        response,
        progressBar,
        template,
        templates,
        templateColor,
        activeId,
        setColor,
        setMethod,
        setActive,
        handleCardUpdate,
        handleCardCreate,
        onInputFocus,
        handleBlur,
        exportCardAction,
        createCardAction,
        updateCardAction,
        removeCardAction,
        setResponseAction,
        createNotifyAction
      }}
    >
      { !!Object.keys(props.templates).length && <BusinessCardComponent {...props}/> }
    </Provider>
  )
}

const connector = connect(mapStateToProps, mapDispatchToProps)(React.memo(BusinessCard));

export default withPreloader(connector);
