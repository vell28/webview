import * as React from 'react';
import { connect } from 'react-redux';

import { 
  getProductsAction,
  togglePreloaderAction
} from '@/actions';
import { 
  getSidebar,
  getPreloader
} from '@/selectors/ui';
import { 
  getCategories,
  getPopularProducts
} from '@/selectors/categories';
import './style.less';
import { CategoriesComponent } from '@/components';
import withPreloader from '@/hoc/withPreloader';
import { getLocale } from '@/selectors/locale';
import { Provider } from './context';

const mapStateToProps = state => ({
  categories: getCategories(state),
  popular: getPopularProducts(state),
  sidebar: getSidebar(state),
  preloader: getPreloader(state),
  locale: getLocale(state)
})

const mapDispatchToProps = {
  getProductsAction,
  togglePreloaderAction
}

const Categories = (props) => {
  const { 
    getProductsAction, togglePreloaderAction, categories, preloader, locale
  } = props;
  
  React.useEffect(() => {
    togglePreloaderAction(true);
    
    categories && !categories.length && getProductsAction();

  },              [ ]);

  React.useEffect(() => {

    categories.forEach((item) => {
        new Image().src = item.comingSoon;
    });

    !!preloader && togglePreloaderAction(false);

  },              [ categories, preloader ]);

  return (
    !!categories.length && 
      <Provider value={ {
        locale
      } }>
        <CategoriesComponent { ...props }/>
      </Provider>
  );
}

const connector = connect(mapStateToProps, mapDispatchToProps)(Categories);

export default withPreloader(connector);
