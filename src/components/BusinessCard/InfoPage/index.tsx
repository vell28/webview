import * as React from 'react';
import { Link } from 'react-router-dom';

import routes from '@/routing/constants';

import ListElement from './ListElement';
import text from './ListElement/text';

import messages from './messages';
import { translateText } from '@/utils/format-text';

import './style.less';

const InfoPage = (props) => {
    const { changeDirection } = props;

    return (
        <div className="info-page-container">
            <div className="info-header">
                <Link to={routes.businessCard} onClick={()=>changeDirection('back')}>
                    <img
                        src={require('@/images/close-icon.png')}
                        alt="close-icon"
                    />
                </Link>
            </div>
            <div className="info-content">
                <div className="info-main-description">
                    <h2>{ translateText(messages.title) }</h2>
                </div>
                <div>
                    <ListElement number={1} title={ translateText(messages.listTitle_1) } text={text.first} />
                    <ListElement number={2} title={ translateText(messages.listTitle_2) } text={text.second} />
                    <ListElement number={3} title={ translateText(messages.listTitle_3) } text={text.third} />
                    <ListElement number={4} title={ translateText(messages.listTitle_4) } text={text.fourth} />
                    <ListElement number={5} title={ translateText(messages.listTitle_5) } text={text.fifth} />
                </div>
            </div>
        </div>
    )
}
export default InfoPage;
