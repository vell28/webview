import * as React from 'react';

import MainPageButton from '../MainPageButton';

import './style.less';

const CategoryItem = (props) => {

    return (
        props.products.map((item, i) => <div key={ i } className="image-container">
            <p>
                {item.title.replace(/\n/g, '*').split('*')
                    .map(imgName => <span key={imgName}>{imgName}</span>)
                }
            </p>
            <img src={item.image} alt={item.title} />
            <div className="buttons-container">
                <MainPageButton href={item.actionVr} value="VR" />
                <MainPageButton href={item.action3d} value="3D" />
            </div>
        </div>
        )
    )
}

export default React.memo(CategoryItem);
