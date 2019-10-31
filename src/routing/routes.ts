import { getProtect } from '@/utils';

import {
  Auth,
  Categories,
  BusinessCard,
  Profile,
  Support,
} from '@/containers';

import routes from './constants';

export default getProtect([{
  path     : routes.categories,
  exact    : true,
  component: Categories,
}, {
  path     : routes.businessCard,
  component: BusinessCard
}, {
  path     : routes.support,
  exact    : true,
  component: Support
}, {
  path     : routes.logIn,
  component: Auth
}, {
  path     : routes.profile,
  exact    : true,
  component: Profile,
}, {
  path     : '*',
  component: () => '<H1>404</H1>'
}]);
