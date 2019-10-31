// @ts-ignore-all
import * as React from 'react';

const CANCEL_DISTANCE_ON_SCROLL = 20;

const defaultStyles = {
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    transition: 'transform .3s ease-out',
    minHeight: '100vh',
    width: '186%',
    display: 'flex',
    transform: 'translateX(-46.3%)',
    WebkitTransition: '-webkit-transform .3s ease-out',
    willChange: 'transform',
    WebkitOverflowScrolling: 'touch',
  },
  sidebar: {
    zIndex: 2,
    width: '86%',
    position: 'relative',
    top: 0,
    bottom: 0,
    transition: 'transform .3s ease-out',
    WebkitTransition: '-webkit-transform .3s ease-out',
    willChange: 'transform',
    overflowY: 'auto',
    minHeight: '100vh'
  },
  content: {
    position: 'relative',
    zIndex: 2,
    top: 0,
    left: '0%',
    right: 0,
    bottom: 0,
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    transition: 'transform .3s ease-out',
    willChange: 'transform',
    minHeight: '100vh',
    width: '100%',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity .3s ease-out, visibility .3s ease-out',
    backgroundColor: 'rgba(34, 43, 54, 0.65)'
  },
  dragHandle: {
    zIndex: 1,
    position: 'fixed',
    top: '60px',
    bottom: 0
  }
};
let touchCurrentX = null;

class Sidebar extends React.Component<any, any> {

  public sidebar;
  constructor(props) {
    super(props);

    this.state = {
      sidebarWidth: props.defaultSidebarWidth,
      touchIdentifier: null,
      touchStartX: null,
      touchCurrentX: null,
      dragSupported: false
    };

    this.overlayClicked = this.overlayClicked.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.saveSidebarRef = this.saveSidebarRef.bind(this);
  }

  public componentDidMount() {
    this.setState({
      dragSupported:
        typeof window === 'object' && 'ontouchstart' in window
    });
    this.saveSidebarWidth();
  }

  public componentDidUpdate() {
    if (!this.isTouching()) {
      this.saveSidebarWidth();
    }
  }

  public onTouchStart(ev) {
    if (this.props.progress !== -1) {
      return;
    }

    ev.stopPropagation();
    if (!this.isTouching()) {
      const touch = ev.targetTouches[0];
      touchCurrentX = touch.clientX;
      this.setState({
        touchIdentifier: touch.identifier,
        touchStartX: touch.clientX,
        touchCurrentX: touch.clientX
      });
    }
  }

  public onTouchMove = (ev) => {
    if (this.props.progress !== -1) {
      return;
    }
    
    ev.preventDefault();
    ev.stopPropagation();
    if (this.isTouching()) {
        if (ev.targetTouches[0] && ev.targetTouches[0].identifier === this.state.touchIdentifier) {

        const ident = ev.targetTouches[0].clientX;
        const percentage = this.touchSidebarWidth() / this.state.sidebarWidth;

        const el = this.sidebar.closest('.sidebar-main-wrap').style;
        const opa = this.sidebar.nextElementSibling.style;

        el.transform = `translateX(-${(1 - percentage) * 46.3}%)`;
        el.WebkitTransform = `translateX(-${(1 - percentage) * 46.3}%)`;

        opa.opacity = percentage;

        const rootTransform = el.transform.replace('translateX(', '').replace('%)', '');

        if(rootTransform < -46.3) {
          el.transform = 'translateX(-46.3%)';
          el.WebkitTransform = 'translateX(-46.3%)';
        };

        touchCurrentX = ident;
      }
    }
  }

  public onTouchEnd() {
    if (this.isTouching()) {
      const touchWidth = this.touchSidebarWidth();

      if (
        (this.props.open &&
          touchWidth <
            this.state.sidebarWidth - this.props.dragToggleDistance) ||
        (!this.props.open && touchWidth > this.props.dragToggleDistance)
      ) {
        this.props.onSetOpen(!this.props.open);
      }
      touchCurrentX = null;
      this.setState({
        touchIdentifier: null,
        touchStartX: null,
        touchCurrentX: null
      });
    }
  }

  public onScroll() {
    if (this.isTouching() && this.inCancelDistanceOnScroll()) {
      this.setState({
        touchIdentifier: null,
        touchStartX: null,
        touchCurrentX: null
      });
      touchCurrentX = null;
    }
  }

  public inCancelDistanceOnScroll() {
    let cancelDistanceOnScroll;

    if (this.props.pullRight) {
      cancelDistanceOnScroll =
        Math.abs(touchCurrentX - this.state.touchStartX) <
        CANCEL_DISTANCE_ON_SCROLL;
    } else {
      cancelDistanceOnScroll =
        Math.abs(this.state.touchStartX - touchCurrentX) <
        CANCEL_DISTANCE_ON_SCROLL;
    }
    return cancelDistanceOnScroll;
  }

  public isTouching() {
    return this.state.touchIdentifier !== null;
  }

  public overlayClicked() {
    if (this.props.open) {
      this.props.onSetOpen(false);
    }
  }

  public saveSidebarWidth() {
    const width = this.sidebar.offsetWidth;

    if (width !== this.state.sidebarWidth) {
      this.setState({ sidebarWidth: width });
    }
  }

  public saveSidebarRef(node) {
    this.sidebar = node;
  }

  public touchSidebarWidth() {
    if (this.props.pullRight) {
      if (
        this.props.open &&
        window.innerWidth - this.state.touchStartX < this.state.sidebarWidth
      ) {
        if (touchCurrentX > this.state.touchStartX) {
          return (
            this.state.sidebarWidth +
            this.state.touchStartX -
            touchCurrentX
          );
        }
        return this.state.sidebarWidth;
      }
      return Math.min(
        window.innerWidth - touchCurrentX,
        this.state.sidebarWidth
      );
    }

    if (this.props.open && this.state.touchStartX < this.state.sidebarWidth) {
      if (touchCurrentX > this.state.touchStartX) {
        return this.state.sidebarWidth;
      }
      return (
        this.state.sidebarWidth -
        this.state.touchStartX +
        touchCurrentX
      );
    }
    return Math.min(touchCurrentX, this.state.sidebarWidth);
  }

  public render() {
    
    let dragHandleStyle;
    const sidebarStyle = {
      ...defaultStyles.sidebar,
      ...this.props.styles.sidebar
    };
    const contentStyle = {
      ...defaultStyles.content,
      ...this.props.styles.content
    };
    const overlayStyle = {
      ...defaultStyles.overlay,
      ...this.props.styles.overlay
    };

    const useTouch = this.state.dragSupported && this.props.touch;
    const isTouching = this.isTouching();
    const rootProps = {
      className: this.props.rootClassName,
      style: { ...defaultStyles.root, ...this.props.styles.root },
      role: 'navigation',
      id: this.props.rootId
    };

    const hasBoxShadow =
      this.props.shadow && (isTouching || this.props.open || this.props.docked);

    if (this.props.pullRight) {
      sidebarStyle.right = 0;
      sidebarStyle.transform = 'translateX(100%)';
      sidebarStyle.WebkitTransform = 'translateX(100%)';
      if (hasBoxShadow) {
        sidebarStyle.boxShadow = '-2px 2px 4px rgba(0, 0, 0, 0.15)';
      }
    } else {
      rootProps.style.left = 0;
      rootProps.style.transform = 'translateX(-46.3%)';
      rootProps.style.WebkitTransform = 'translateX(-46.3%)';

      if (hasBoxShadow) {
        sidebarStyle.boxShadow = '2px 2px 4px rgba(0, 0, 0, 0.15)';
      }
    }

    if (isTouching) {
      const percentage = this.touchSidebarWidth() / this.state.sidebarWidth;

      // slide open to what we dragged
      if (this.props.pullRight) {
        rootProps.style.transform = `translateX(${(1 - percentage) * 46.3}%)`;
        rootProps.style.WebkitTransform = `translateX(${(1 - percentage) * 46.3}%)`;

      } else {
        rootProps.style.transform = `translateX(-${(1 - percentage) * 46.3}%)`;
        rootProps.style.WebkitTransform = `translateX(-${(1 - percentage) *
          46.3}%)`;
      }

      const rootTransform = rootProps.style.transform.replace('translateX(', '').replace('%)', '');

      if(Number(rootTransform) < -46.3) {
        rootProps.style.transform = 'translateX(-46.3%)';
        rootProps.style.WebkitTransform = 'translateX(-46.3%)';
      }

      // fade overlay to match distance of drag
      overlayStyle.opacity = percentage;
      overlayStyle.visibility = 'visible';
    } else if (this.props.docked) {
      // show sidebar
      if (this.state.sidebarWidth !== 0) {
        rootProps.style.transform = 'translateX(0%)';
        rootProps.style.WebkitTransform = 'translateX(0%)';
      }

      // make space on the left/right side of the content for the sidebar
      if (this.props.pullRight) {
        contentStyle.right = `${this.state.sidebarWidth}px`;
      } else {
        contentStyle.left = `${this.state.sidebarWidth}px`;
      }
    } else if (this.props.open) {
      // slide open sidebar
      rootProps.style.transform = 'translateX(0%)';
      rootProps.style.WebkitTransform = 'translateX(0%)';

      // show overlay
      overlayStyle.opacity = 1;
      overlayStyle.visibility = 'visible';
    }

    if (isTouching || !this.props.transitions) {
      rootProps.style.transition = 'none';
      rootProps.style.WebkitTransition = 'none';
      // contentStyle.transition = "none";
      overlayStyle.transition = 'none';
    }

    if (useTouch) {
      if (this.props.open) {
        // @ts-ignore
        rootProps.onTouchStart = this.onTouchStart;
        // @ts-ignore
        rootProps.onTouchMove = this.onTouchMove;
        // @ts-ignore
        rootProps.onTouchEnd = this.onTouchEnd;
        // @ts-ignore
        rootProps.onTouchCancel = this.onTouchEnd;
        // @ts-ignore
        rootProps.onScroll = this.onScroll;
      }
    }
    dragHandleStyle = {
      ...defaultStyles.dragHandle,
      ...this.props.styles.dragHandle
    };
    dragHandleStyle.width = this.props.touchHandleWidth;
    return (
      <>
        <div 
          {...rootProps} 
          className="sidebar-main-wrap"
        >
          <div
            className={this.props.sidebarClassName}
            style={sidebarStyle}
            ref={this.saveSidebarRef}
            id={this.props.sidebarId}
          >
            {this.props.sidebar}
          </div>
          <div
            className={this.props.overlayClassName}
            style={overlayStyle}
            onClick={this.overlayClicked}
            id={'sidebar-overlay'}
          />
          <div
            className={this.props.contentClassName || 'sidebar-content'}
            style={contentStyle}
            id={this.props.contentId}
          >
            {this.props.children}
          </div>
        </div>
        <div
          style={dragHandleStyle}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
          onTouchCancel={this.onTouchEnd}
          className="sidebar-touch-wrap"
        />
      </>
    );
  }
}
// @ts-ignore
Sidebar.defaultProps = {
  docked: false,
  open: false,
  transitions: true,
  touch: true,
  touchHandleWidth: 20,
  pullRight: false,
  shadow: true,
  dragToggleDistance: 30,
  onSetOpen: () => {},
  styles: {},
  defaultSidebarWidth: 0
};

export default Sidebar;
