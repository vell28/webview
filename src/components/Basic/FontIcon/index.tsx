import * as React from 'react'
import cn from 'classnames'

interface FontIconProps {
  name: string,
  className?: string,
  border?: boolean,
  disabled?: boolean,
  fixedWidth?: boolean,
  flip?: string,
  inverse?: boolean,
  li?: boolean,
  pull?: string,
  rotate?: number,
  size?: number,
  spin?: boolean,
  regular?: boolean,
  brand?: boolean,
  stack?: number,

  onClick?(): any,
}

class FontIcon extends React.Component<FontIconProps> {

  public render() {
    const { name, className, size, stack, pull, rotate, flip, inverse } = this.props
    const { fixedWidth, border, spin, regular, brand, li, disabled, onClick, ...rest } = this.props

    const iconClassName = cn(
      `fa-${ name }`,
      className,
      {
        [`fa-${ size }x`]        : size,
        [`fa-stack-${ stack }x`] : stack,
        [`fa-pull-${ pull }`]    : pull,
        [`fa-rotate-${ rotate }`]: rotate,
        [`fa-flip-${ flip }`]    : flip,
        'not-allowed'            : disabled,
        'fa-inverse'             : inverse,
        'fa-fw'                  : fixedWidth,
        'fa-border'              : border,
        'fa-spin'                : spin,
        'fa-li'                  : li,
        fas                      : !regular && !brand,
        far                      : regular,
        fab                      : brand,
      })

    return (
      <i className={ iconClassName } onClick={ !disabled && onClick } { ...rest }/>
    )
  }
}

export default FontIcon
