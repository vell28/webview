import * as React from 'react';

import Category from '@/components/Categories/Category';
import Header from '@/components/Categories/Header';
import Popular from '@/components/Categories/PopularProducts';
import './styles.less';

const CategoriesComponent = (props) => {
    const { sidebar, categories, popular } = props;

    return (
        <div className={`main-page-container${sidebar ? ' open-sidebar' : ''}`} >
            <div className="non-scroll-container">
                <Header />
                <Popular products={popular} />
            </div>
            <div className="section-container">
                <>
                    {categories.map((item, i) =>
                        <Category
                            key={ i }
                            title={item.title}
                            products={item.products}
                            comingSoon={item.comingSoon}
                        />)
                    }
                </>
            </div>
        </div>
    )
}

export default React.memo(CategoriesComponent);
