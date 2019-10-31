import * as React from 'react';
import { connect } from 'react-redux';

import { Preloader } from '@/components/Basic';
import { getPreloader } from '@/selectors/ui';

export default function (Component) { 

    function preloaderComponent(props) {
        const { preloader } = props;
        const delay = 2650;

        React.useEffect(() => {
            if(!preloader && preloaderRef.current.classList.contains('hide')) {

                setTimeout(() => {

                    if(preloaderRef.current) {
                        
                        preloaderRef.current.style.display = 'none';
                    }
                },         delay);
            };

        },              [ preloader ])

        const preloaderRef = React.useRef<HTMLDivElement>();

        return (
            <>
                <Preloader 
                    preloaderRef={ preloaderRef }
                    classname={`${!preloader ? ' hide' : ''}`}
                /> 
                <Component { ...props } />
            </>
        )
    }

    const mapStateToProps = state => ({
        preloader: getPreloader(state)
    })
  
    return connect(mapStateToProps, {})(preloaderComponent);
};
