export const getToken = () => {
    const token = localStorage['token'] || '';

    return { 
        isLogged: token ? true : false,
        token
    }
}
