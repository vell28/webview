import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import routes from '@/routing/constants';
import { getUserLogged, getUserEmail } from '@/selectors/user';
import { getUserAction } from '@/actions/user';
import { getLocale } from '@/selectors/locale';
import { _globalMethods } from '@/utils';
import { getResponse } from '@/selectors/response';
import { setResponseAction } from '@/actions';

export default function (Component) {  

    class Protect extends React.Component<any, null> {
    
        public componentDidMount() {
           
            const { history, isLogged, userEmail, getUserAction } = this.props;

            if (isLogged && !userEmail) {
                getUserAction();
            }

            _globalMethods(history);
        }

        public componentWillUnmount() {
            const { response: { component } } = this.props;

            component && setResponseAction({});
        }

        public render() {

            const { history , isLogged, locale, location, loaders } = this.props;

            const props = { history, locale, location };

            const { location: { pathname, search } } = history;
            
            if(pathname.match(routes.resetPassword) && pathname !== location.pathname) {
                return(
                    <Redirect 
                        to={ `${routes.resetPassword}${search}` }
                    />
                )
            }
            
            if (pathname !== routes.logIn && pathname !== routes.signUp 
                    && pathname !== routes.resetPassword && pathname !== routes.forgotPassword) {
                        
                if(!isLogged) {

                    return(
                        <Redirect 
                            to={ routes.logIn }
                        />
                    )
                }
            }

           if(isLogged) {
                if (pathname === routes.logIn || pathname === routes.signUp) {

                    return(
                        <Redirect 
                            to={ routes.categories }
                        />
                    )
                }
           }
            
            return <Component { ...props } />
        }
    }
  
    const mapStateToProps = state => ({
        isLogged:  getUserLogged(state),
        userEmail: getUserEmail(state),
        response:  getResponse(state),
        locale:    getLocale(state)
    })
    
    const mapDispatchToProps = {
        getUserAction,
    }
  
    return connect(
      mapStateToProps, 
      mapDispatchToProps
    )(Protect);
};
