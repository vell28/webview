import * as React from 'react';

import CategoryItem from '../Product';
import ComingSoonImage from '../ComingSoonImage';

import './style.less';

const Category = (props) => {
  const { products, comingSoon } = props;
  const shouldShowComingSoon = (products.length % 2 !== 0);
  
  return (
    <div className="category-container">
      <h3>{props.title.toUpperCase()}</h3>
      <div className="category-items-wrapper">
        <CategoryItem products={props.products} />
        
        {shouldShowComingSoon 
          ? <ComingSoonImage products={props} comingSoon={comingSoon} /> 
          : null
        }
      </div>
    </div>
  )
}

export default React.memo(Category);
