import * as React from 'react'
import * as PropTypes from 'prop-types'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'
import * as R from 'ramda';

import { FontIcon } from '@/components/Basic'
import { injectIntl } from 'react-intl';

interface PropTypes {
  label: any,
  to: string,
  disabled: boolean,
  icon: string,
  className: string,
  intl: any,
  onChange: () => void
}

class Link extends React.Component<PropTypes> {

  public renderLabel = () => {
    const { intl, label } = this.props;
    const text = R.prop('props', label)

    return (
      <span className="main-navigation-label">
        { intl.messages[text.message.id] || label }
      </span>
    )
  }

  public render() {
    const { label, to, disabled, onChange, icon } = this.props
    const className = cn('main-navigation-item', this.props.className, { disabled })

    return (
      <>
        { label.props.message.id === 'src.sidebar.qw' ?
          <a className="main-navigation-item" href={ to }>
            { this.renderLabel() }
          </a>
          :
          <NavLink
            exact
            className={ className }
            to={ to }
            disabled={ disabled }
            onClick={ onChange }
          >
            { this.renderLabel() }

            { icon && <FontIcon name={ icon }/> }
          </NavLink>
        }
      </>
    )
  }
}

export default React.memo(injectIntl(Link));
