import './styles.less'
import * as React from 'react'
import { connect } from 'react-redux'
import { toggleSidebarAction } from '@/actions'

const mapDispatchToProps = {
  toggleSidebarAction
}

@connect(null, mapDispatchToProps)
export default class Hamburger extends React.Component<any> {

  public onClick = () => {
    this.props.toggleSidebarAction(true)
  }

  public render() {
    return (
      <div className="hamburger" onClick={ this.onClick }>
        <div className="hamburger-box">
          <div className="hamburger-inner"/>
        </div>
      </div>
    )
  }
}
