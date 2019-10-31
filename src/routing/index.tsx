import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';

import RenderRoutes from './render';
import { Notify } from '@/containers';

const RouterContainer: React.StatelessComponent<any> = (props) => {
  const { history } = props;
  return (
      <>
        <Notify />
        <ConnectedRouter history={ history }>
          <RenderRoutes />
        </ConnectedRouter>
      </>
  );
};

export default RouterContainer;
