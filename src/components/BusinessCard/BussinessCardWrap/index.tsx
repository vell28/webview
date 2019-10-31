import './styles.less'
import * as React from 'react'

import Header from '../Header';
import TemplateChooser from '../TemplateChooser';
import TemplatesCollection from '../TemplatesCollection';

const BusinessCard = (props) => {
    return (
        <div className="business-card-container">
            <Header {...props}/>

            <TemplateChooser/>

            <TemplatesCollection {...props}/>
        </div>
    )
}

export default BusinessCard;
