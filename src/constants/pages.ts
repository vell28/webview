import routes from '@/routing/constants'

const PAGES = [{
  to      : routes.profile,
  disabled: false,
  id      : 'profile'
}, {
  to      : routes.businessCard,
  disabled: false,
  id      : 'bc'
}, {
  to      : routes.categories,
  disabled: false,
  id      : 'products'
}, {
  to      : 'uniwebview://action?product=xcard&mode=ar',
  disabled: false,
  id      : 'qw'
}, {
  to      : routes.support,
  disabled: false,
  id      : 'support'
}, {
  to       : '#',
  disabled : false,
  id       : 'logout',
  icon     : 'sign-out-alt',
  className: 'logout-menu'
}]

export default PAGES
