import { setUnityAction } from '@/actions/support';

import { store } from '@/index';

if (!(window as any).receiveUnityInfo) {
    (window as any).receiveUnityInfo = (data = {}) => {
        store.dispatch(setUnityAction({
            version: data.version,
            revision: data.revision,
            creationDate: data.creationDate.toDateString(),
            pipeline: data.pipeline
        }));
    }
}
