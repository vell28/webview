import * as React from 'react'
import cn from 'classnames';

import {
  Sidebar,
  SidebarNav
} from './components';
import { context } from '@/containers/Sidebar/context'; 

const SidebarComponent: React.FunctionComponent<any> = (props) => {
  const { 
    sidebarOpen, logOutAction, pathname, user, children, progress
  } = props;

  const { closeSidebar, onChangeSlideIndex } = React.useContext(context);
  
  return (
    <div 
      className={ cn('main-sidebar-wrapper', { 'with-sidebar': sidebarOpen }) }
    >
      <Sidebar

        sidebar={
          <SidebarNav 
            onChangeMenu={ closeSidebar } 
            logOut={ logOutAction }
            pathname={ pathname }
            user={ user }
          />
        }
        progress={ progress }
        open={ sidebarOpen }
        onSetOpen={ onChangeSlideIndex }
        touchHandleWidth={ 50 }
        dragToggleDistance={ 25 }
        styles={{ 
          sidebar: { zIndex: '999' },
          dragHandle: { zIndex: '999' },
          overlay: { zIndex: '997' },  
          content: { zIndex: '1', width: '100%' } 
        }}
      >
        { children }
      </Sidebar>
    </div>
  )
}

export default React.memo(SidebarComponent);
