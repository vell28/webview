import * as React from 'react';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import {
    LogIn,
    Forgot,
    SignUp,
    ResetPassword
} from './components';
import route from '@/routing/constants';
import { Context } from '@/containers/Auth/context';
import './styles.less';

const AuthComponent = () => {
    let [direction, setDirection] = React.useState(false);

    const { pathname } = React.useContext(Context);

    React.useEffect(() => {
        
        if(pathname.match(route.resetPassword)) {

            setDirection(direction = false);
        }

    },              [ pathname ])

    const routes = [
        { path: route.logIn, Component: LogIn },
        { path: route.signUp, Component: SignUp },
        { path: route.forgotPassword, Component: Forgot },
        { path: route.resetPassword, Component: ResetPassword }
    ];

    const handlerAnimateDirection = (param) => {
        if (param === 'front') { setDirection(direction = false) };
        if (param === 'back') { setDirection(direction = true) };
        setDirection(direction = !direction);
    };

    return (
        <>
            {routes.map(({ path, Component }) => (
                <Route key={path} path={path}>
                    {({ match }) => (
                        <CSSTransition
                            in={match != null}
                            timeout={300}
                            classNames={direction ? 'page' : 'page-return'}
                            unmountOnExit
                        >
                            <div className={direction ? 'page' : 'page-return'}>
                                <Component changeDirection={ handlerAnimateDirection }/>
                            </div>
                        </CSSTransition>
                    )}
                </Route>
            ))}
        </>
    );
}

export default AuthComponent;
