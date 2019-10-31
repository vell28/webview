import './navigation.less'
import * as React from 'react'

import { ListItems } from '@/components/Basic'
import Link from './link'
import LanguageSwitcher from '../LanguageSwitcher'
import Pages from '@/constants/pages'
import messages from './messages';
import { translateText } from '@/utils/format-text';
import { getToken } from '@/utils';

class Navigation extends React.PureComponent<any> {

  public onChangeMenu = menuId => () => {
    if (menuId === 'logout') {
      if(getToken()) {
        localStorage.removeItem('token')
      }

      this.props.logOut();
    }

      this.props.onChangeMenu();
  }
  
  public renderItem = (item) => {
    const { id, to, disabled, className, icon } = item;

    const classname = this.props.pathname === to ? 'active' : '';
    
    return (
      <Link
        key={ id }
        to={ to }
        disabled={ disabled }
        label={ translateText(messages[id]) }
        className={ classname }
        icon={ icon }
        onChange={ this.onChangeMenu(id) }
      />
    )
  }

  public render() {

    return (
      <div className="aside-navigation">
        <ListItems
          as="div"
          items={ Pages }
          className="main-navigation"
          renderItem={ this.renderItem }
        />
        <LanguageSwitcher 
          onChangeMenu={ this.props.onChangeMenu }
        />
      </div>
    )
  }
}

export default Navigation;
