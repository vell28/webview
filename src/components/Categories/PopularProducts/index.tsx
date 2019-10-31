import * as React from 'react';

import CategoryItem from '../Product';
import messages from '../messages';
import { translateText } from '@/utils/format-text';

import './style.less';

class Popular extends React.PureComponent<any> {
  protected container: any = React.createRef();

  public componentDidMount() {
    const containerNode = this.container.current;

    if (!containerNode) {
      return;
    }

  }

  public componentWillUnmount() {
    const containerNode = this.container.current;

    if (!containerNode) {
      return;
    }
  }

  public isolateTouch(e) {
    e.stopPropagation();
  }

  public render() {
    const { products } = this.props;

    return (
      <div className="popular-container">
        <h3>{ translateText(messages.popular) }</h3>
        <div className="scroll-container" ref={ this.container }>
          <div className="category-items-wrapper">
            <CategoryItem products={ products }/>
          </div>
        </div>
      </div>
    )
  }
}

export default Popular;
