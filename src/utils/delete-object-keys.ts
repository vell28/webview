export const deleteKeys = (Object) => {
    delete Object['frontImage'];
    delete Object['image'];
    delete Object['backImage'];
    delete Object['template'];

    return Object;
}
