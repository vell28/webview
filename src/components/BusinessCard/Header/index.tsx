import * as React from 'react'

import Hamburger from '@/components/Basic/Hamburger'
import Hexagon from '../Hexagon'
import routes from '@/routing/constants';
import './styles.less'

const BCHeader = (props) => {

  const { history, changeDirection } = props;

  const onInfoIconClick = () => {
    history.push(routes.infoBusinessCard);

  }

  return (
    <div className="bc-header-container">
      <div className="bc-header-icon-wrap">
        <Hamburger />
        <div className="info-button">
          <Hexagon onClick={onInfoIconClick} className="blue">
            <div onClick={() => changeDirection('front')}>i</div>
          </Hexagon>
        </div>
      </div>
    </div>
  )
}

export default BCHeader;
