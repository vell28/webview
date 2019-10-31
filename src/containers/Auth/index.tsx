import * as React from 'react';
import { connect } from 'react-redux';

import { AuthComponent } from '@/components';
import { 
  getLoginAction,
  getSignUpAction,
  getForgotPassAction,
  getResetPassAction
} from '@/actions/auth';
import { Provider } from './context';
import { getResponse } from '@/selectors/response';
import routers from '@/routing/constants';
import WithScroll from '@/hoc/withResize';
import { setResponseAction } from '@/actions';
import { Props } from './types';

const mapStateToProps = state => ({
  response: getResponse(state)
});

const mapDispatchToProps = {
  getLoginAction,
  getSignUpAction,
  getForgotPassAction,
  getResetPassAction,
  setResponseAction
}

const Auth: React.FunctionComponent<Props> = (props) => {
  const {
    history: { location: { pathname } },
    location: { search },
    getSignUpAction,
    getLoginAction,
    getForgotPassAction,
    getResetPassAction,
    history,
    response,
    onClickOutsideInput,
    onInputFocus,
    setResponseAction,
    handleBlur
  } = props;

  const handleResetPassword = (payload) => {
    if(search) {
      const token = search.replace('?t=', '');
      
      getResetPassAction({ ...payload, token });
    }
  }

  const handleSubmit = (payload) => {
    const action = {
      [routers.logIn]         : () => getLoginAction(payload),
      [routers.signUp]        : () => getSignUpAction(payload),
      [routers.forgotPassword]: () => getForgotPassAction(payload),
      [routers.resetPassword] : () => handleResetPassword(payload),
    }

    action[pathname]();
  }

  return (
    <Provider
      value={ {
        pathname,
        handleSubmit,
        response,
        history,
        onClickOutsideInput,
        setResponseAction,
        onInputFocus,
        handleBlur
      } }
    >
      <AuthComponent/>
    </Provider>
  )
};

const connector = connect(mapStateToProps, mapDispatchToProps)(Auth);

export default WithScroll(connector);
