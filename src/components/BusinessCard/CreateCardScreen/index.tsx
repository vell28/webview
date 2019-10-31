import * as React from 'react';

import messages from './messages';
import { translateText } from '@/utils/format-text';
import routes from '@/routing/constants';
import CardEditForm from './Form';
import WithScroll from '@/hoc/withResize';
import { ProgressBar } from '@/components/Basic';
import { context } from '@/containers/BusinessCard/context';
import './style.less';

const CreateCardScreen = (props) => {
    const { history: { push }, changeDirection } = props;

    const { onClickOutsideInput, progressBar, method } = React.useContext(context);

    const goBack = () => {
        push(routes.createBusinessCard);
        changeDirection('back');
    }

    return (
        <>
            { progressBar >= 0 && <ProgressBar progress={ progressBar }/> }
            <div className="create-edit-card" onClick={onClickOutsideInput}>
                <div className="header">
                    <div className="go-back-button" onClick={ goBack } />
                </div>
                <div className="section-header">
                    <h2 className="title">{method && translateText(messages[method])}</h2>
                </div>
                <CardEditForm {...props}/>
            </div>
        </>
    )
}

export default React.memo(WithScroll(CreateCardScreen));
