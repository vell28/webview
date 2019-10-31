import * as React from 'react';
import { connect } from 'react-redux';

import { toggleSidebarAction } from '@/actions';
import { SidebarComponent } from '@/components';
import { 
  getSidebar,
  getPreloader,
  getProgressBar,
  getLoader
} from '@/selectors/ui';
import { logOutAction } from '@/actions/auth';
import { getUser } from '@/selectors/user';
import { Props } from './types';
import './style.less';
import { Provider } from './context';

const mapStateToProps = state => ({
  sidebarOpen: getSidebar(state),
  preloader: getPreloader(state),
  progress: getProgressBar(state),
  user: getUser(state),
  loaders: getLoader(state)
});

const mapDispatchToProps = {
  toggleSidebarAction,
  logOutAction
}

const Sidebar: React.FunctionComponent<Props> = (props) => {
  const { toggleSidebarAction, loaders  } = props;

  const onChangeSlideIndex = (slideIndex: boolean): void => {
    toggleSidebarAction(slideIndex)
  }

  const closeSidebar = (): void => {
    toggleSidebarAction(false)
  }

  return (
    <>
      {!!loaders.length && <div className="loader-cover-wrap" /> }
      <Provider 
        value={ {
          closeSidebar,
          onChangeSlideIndex
        } }
      >
        <SidebarComponent { ...props }/>
      </Provider>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
