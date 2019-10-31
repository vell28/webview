import * as actions from '@/actions';
import { store } from '@/index';
import * as moment from 'moment';
import routings from '@/routing/constants';
import { getUserToken } from '@/selectors/user';

export const _globalMethods = (history) => {
    if (!(window as any).receiveUnityInfo) {
        (window as any).receiveUnityInfo = (data = {}) => {

            store.dispatch(
                actions.setUnityAction({
                    version: data.version,
                    revision: data.revision,
                    creationDate: moment(data.creationDate).format('DD.MM.YYYY HH:mm'),
                    pipeline: data.pipeline
                }
            ));
        }
    }

    if(!(window as any).getToken) {
        (window as any).getToken = () => {

            const userToken = getUserToken(store.getState());

            const token = localStorage['token'] || userToken;

            return token;
        };
    }

    const preloader = document.getElementById('preloader');

    if(!(window as any).hidePreloader) {
        (window as any).hidePreloader = () => {
            preloader.classList.add('hide');
        }
    }

    if(!(window as any).showPreloader) {
        (window as any).showPreloader = () => {
            preloader.classList.remove('hide');
        }
    }

    if(!(window as any).deepLinkRedirect) {
        (window as any).deepLinkRedirect = (link) => {

            const domen = 'https://dev.api.globalvirtual.world/';
            const method = 'password.reset';
            
            if(link.match(method)) {
                
                const token = link.replace(`${domen}${method}`, '');

                history.push(`${routings.resetPassword}${token}`);
            }

        };
    }

    if(!(window as any).receiveUnityMessage) {
        (window as any).receiveUnityMessage = (message) => {

            let mess = 'success_support_message';

            if(message.error) {
                mess = 'error_support_message';
            }

            store.dispatch(actions.createNotifyAction(mess));
            store.dispatch(actions.getLoaderAction('support'))
        }
    }
}
