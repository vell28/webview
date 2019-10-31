import * as React from 'react';

export default function (Component) { 

    class ScrollComponent extends React.Component<any, any> {
        public state = {
            keyUp: false
        }

        public body = document.getElementsByTagName('body')[0];

        public componentWillUnmount() {
            if (this.state.keyUp) {
                this.body.classList.remove('key-up');
            }
        }
    
        public scroll = (y) => {
            const heigh: number = window.innerHeight;

            window.scrollTo({
                top: y - (heigh / 2) + 50,
                behavior: 'smooth'
            });
        }

        public handleFocus = (e) => {
            /*if(/Android/.test(navigator.userAgent)) {
                const activeEl = document.activeElement.tagName;

                if (activeEl === 'INPUT' || activeEl === 'TEXTAREA') {
                    !this.state.keyUp && this.setState({ keyUp: true });

                    if (this.body.className !== 'key-up') {
                        this.body.className = 'key-up';
                    }

                    const { y } = e.target.getBoundingClientRect();

                    !this.state.keyUp && this.scroll(y);
                }
            }*/
        }

        public handleBlur = () => {
            /*if(/Android/.test(navigator.userAgent)) { 
                const activeEl = document.activeElement.tagName;

                if (activeEl !== 'INPUT' && activeEl !== 'TEXTAREA' && activeEl !== 'BODY' && this.state.keyUp) {
                    
                    if(this.body.className === 'key-up') {

                        this.body.classList.remove('key-up');
                        this.state.keyUp && this.setState({ keyUp: false });
                    }
                    
                }
            }*/
        }

        public onClick = () => {
            /*if(/Android/.test(navigator.userAgent)) {
                const activeEl = document.activeElement.tagName;

                if (activeEl !== 'INPUT' && activeEl !== 'TEXTAREA' && this.state.keyUp) {
                    if(this.body.className === 'key-up') {
                        this.body.classList.remove('key-up');
                        this.state.keyUp && this.setState({ keyUp: false });
                    }
                }
            }*/
        }

        public render() {
            return (
                <>
                    <Component 
                        onClickOutsideInput={ this.onClick }
                        onInputFocus={ this.handleFocus }
                        handleBlur={ this.handleBlur }
                        {...this.props} 
                    />
                </>
            )
        }
    }

    return ScrollComponent;
};
