import * as React from 'react'

interface ListItemsProps {
  as?: typeof React.Component|string,
  className?: string,
  items: object[],
  renderItem: any
}

/**
 * Component for rendering lists
 */
export default class ListItems extends React.Component<ListItemsProps> {
  public static defaultProps = {
    as: 'div'
  }

  public render() {
    const { as: ElementType, className, items, renderItem } = this.props
    
    return (
      <ElementType className={ className }>
        { items.map(item => renderItem(item)) }
      </ElementType>
    )
  }
}
