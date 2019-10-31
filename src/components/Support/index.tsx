import * as React from 'react';

import { 
    Header,
    MainContent,
    SendButton
} from './components';

const Support = (props) => {
    const {
        value, version, loader, handlerFeedback, onSubmitFeedback
    } = props;

    return(
        <div className="support-container">
            <div className="support-content-container">
                <Header />
                <MainContent 
                    onChange={handlerFeedback} 
                    value={value} 
                    version={version}
                />
            </div>
            <SendButton 
                onClick={onSubmitFeedback}
                value={ value }
                classname={value.length > 0 && !loader ? 'not-empty' : 'empty'}
                loader={loader}
            />
        </div>
    )
}

export default React.memo(Support);
