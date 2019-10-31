import * as React from 'react';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import BusinessCard from './BussinessCardWrap';
import BusinessCardEditor from './Editor';
import CreateCardScreen from './CreateCardScreen';
import InfoPage from './InfoPage';
import route from '@/routing/constants';
import { context } from '@/containers/BusinessCard/context';

const BusinessCardComponent = (props) => {
    let [direction, setDirection] = React.useState(false);

    const { 
        method, setMethod, response, setResponseAction
    } = React.useContext(context);

    const {  sidebar, history } = props;

    const { location: { pathname, search } } = history;
    const { component, status } = response;

    React.useEffect(() => {

        if (pathname === route.createBusinessCard && search === '?update') {
            method !== 'update' && setMethod('update');

            setDirection(!direction);
           // console.log('sssss');
            history.push(`${route.createBusinessCard}?update`);
            
        }

        if(component === 'BusinessCardSection' && status === 200) {
            setDirection(!direction);
            
            history.push(`${route.businessCard}`);

            setResponseAction({});
        }

    },              [ pathname, component ]);

    const routes = [
        { path: route.businessCard, Component: BusinessCard },
        { path: route.createBusinessCard, Component: BusinessCardEditor },
        { path: route.createCard, Component: CreateCardScreen },
        { path: route.infoBusinessCard, Component: InfoPage }
    ];

    const handlerAnimateDirection = (param) => {
        if (param === 'front') { setDirection(direction = false) };
        if (param === 'back') { setDirection(direction = true) };
        setDirection(direction = !direction);
    }
    
    return (
        <>
            {routes.map(({ path, Component }) => (
                <Route key={path} exact path={path}>
                    {({ match }) => (
                        <CSSTransition
                            in={match != null}
                            timeout={300}
                            classNames={direction ? 'page' : 'page-return'}
                            unmountOnExit
                        >
                            <div className={`container business-card-rout-wrap${sidebar ? ' open-sidebar' : ''}`}>
                                <div className={direction ? 'page' : 'page-return'}>
                                    <Component {...props} changeDirection={handlerAnimateDirection} />
                                </div>
                            </div>
                        </CSSTransition>
                    )}
                </Route>
            ))}
        </>
    );
}

export default BusinessCardComponent;
