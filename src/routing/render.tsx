import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import { Sidebar } from '@/containers';
import routes from './routes';
import { getLocations } from '@/selectors/location';
import routing from './constants';

const mapStateToProps = state => ({
    location: getLocations(state)
})

const RenderRoutes = (props) => {
    const { location: { pathname } } = props; 
    
    return (
        <>
            { !pathname.match(routing.logIn)
                ?
                <Sidebar { ...props }>
                    { renderRoutes(routes) }
                </Sidebar>
                :
                <>
                    { renderRoutes(routes) }
                </>
            }   
        </>
        
    )
}

export default connect(mapStateToProps, {})(RenderRoutes);
