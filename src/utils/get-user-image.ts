export const getUserImage = () => {
    const min = 1;
    const max = 9;

    const number = Math.floor(min + Math.random() * (max - min + 1));

    const source = `https://dev.api.globalvirtual.world/gvw/avatar/v1/get?id=${number}`;

    localStorage.setItem('userImage', source);

    return localStorage.getItem('userImage');
}
