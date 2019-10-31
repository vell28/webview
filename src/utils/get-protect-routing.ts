import Protected from '@/hoc/routerProtect';

const getProtect = (routes) => {
    if(routes) {
        const protectedRoutes = routes.map(route => {
            route.component = Protected(route.component);
            
            return route;
        })

        return protectedRoutes;
    } 
    return routes;
    
}

export default getProtect;
