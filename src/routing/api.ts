export default {
    login: 'auth/v1/login',
    passRestore: 'auth/v1/password.restore',
    passChange: 'auth/v1/password.change',
    products: 'products/v1/',
    signUp: 'id/v1/create',
    getUser: 'id/v1/id.get',
    userUpdate: 'id/v1/id.update',
    changePassword: 'id/v1/password.set',
    businessCard: {
        create: 'xcard/v1/create',
        update: 'xcard/v1/update',
        export: 'xcard/v1/export',
        remove: 'xcard/v1/remove',
        getList: 'xcard/v1/list',
        getTemplate: 'xcard/v1/template.list.schema',
        getImageFront: 'xcard/v1/get.front',
        getImageBack: 'xcard/v1/get.back',
        getArPreview: 'xcard/v1/get.ar.preview'
    },
    storage: {
        upload: 'storage/v1/upload',
        get: 'storage/v1/get'
    }
}
