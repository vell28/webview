import './styles.less'

import * as React from 'react'
import cn from 'classnames'

interface Props {
  className?: string,

  active?: boolean,

  onClick?: () => void
}

export default class Hexagon extends React.PureComponent<Props> {
  public render() {
    const { onClick, active, className, children } = this.props

    return (
      <div className={ cn('hexagon', className, { active }) } onClick={ onClick }>
        { children }
      </div>
    )
  }
}
