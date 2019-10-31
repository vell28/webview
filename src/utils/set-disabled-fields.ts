export const setDisabled = (pathname, routing) => {
    if (pathname === routing || (routing !== '/auth' && pathname.match(routing))) {
        return false;
    } 
        return true;
    
}
