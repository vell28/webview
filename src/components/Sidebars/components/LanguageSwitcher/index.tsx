import './language-switcher.less'
import * as React from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import { EN, RU, TR } from '@/constants/locales'
import { setLocaleAction } from '@/actions';
import { Props } from './types';
import messages from './messages';
import { translateText } from '@/utils/format-text';

const mapStateToProps = state => ({
  currentLanguage: state.locale
})

const mapDispatchToProps = {
  setLocaleAction
}

@connect(mapStateToProps, mapDispatchToProps)
export default class LanguageSwitcher extends React.PureComponent<Props | any, null> {

  public isLanguage(lang) {
    return this.props.currentLanguage === lang
  }

  public render() {
    const { setLocaleAction } = this.props;

    return (
      <div className="main-navigation-item language-switcher">
        <span className="main-navigation-label">{ translateText(messages.language) }</span>
        <div className="languages">
          <span 
            className={ cn({ 'active-language': this.isLanguage(RU) }) }
            onClick={ () => setLocaleAction(RU) }
          >
            { RU }
          </span>
          <span 
            className={ cn({ 'active-language': this.isLanguage(TR) }) }
            onClick={ () => setLocaleAction(TR) }
          >
            { TR }
          </span>
          <span 
            className={ cn({ 'active-language': this.isLanguage(EN) }) }
            onClick={ () => setLocaleAction(EN) }
          >
            { EN }
          </span>
        </div>
      </div>
    )
  }
}
