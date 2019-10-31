import * as React from 'react';

import './style.less';

const ListElement = (props) => {
    return (
        <div className="list-item-container">
            <div className="list-number">
                <span>{props.number}</span>
            </div>
            <div className="list-item-description">
                <h3>{props.title}</h3>
                <p>{props.text}</p>
            </div>
        </div>
    )
}

export default ListElement;
