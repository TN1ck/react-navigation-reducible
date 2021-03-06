import React, { PropTypes } from 'react';
import classNames           from 'classnames';

import NavigationHorizontal from './NavigationHorizontal';
import NavigationDropdown   from './NavigationDropdown';
import Button               from './Button';
import ReactDOM             from 'react-dom';

const propTypes = {
    children: PropTypes.array, // eslint-disable-line
    dropdownShowsAll: PropTypes.bool,
    minimizeAtItemsLeft: PropTypes.number,
    minimizeAtWidth: PropTypes.number,
    minimizeOnFirstHidden: PropTypes.bool,
    minimized: PropTypes.bool,
    buttonLabel: PropTypes.string,
    alignMinimizedButtonLeft: PropTypes.bool
};

/**
 * A horizontal, responsive navigation.
 * As soon as there is not enough place anymore to show all items,
 * start rendering a dropdown next to the navigation with all items not visible anymore.
 */
class NavigationReducible extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            // Second navigation items are items
            // which don't have space in the regular horizontal navigation anymore
            secondNavigationItems: [],
            // Is second navigation shown right now?
            isSecondNavigationHidden: true,
            isMinimized: props.minimized
        };
        this.checkVisibleItems = this.checkVisibleItems.bind(this);
        this.hideExtendedNavigation = this.hideExtendedNavigation.bind(this);
        this.toggleExtendedNavigation = this.toggleExtendedNavigation.bind(this);
    }
    componentDidMount () {
        // Add global events
        window.addEventListener('resize', this.checkVisibleItems);
        document.addEventListener('click', this.hideExtendedNavigation);
        // After first render check which elements to show / hide
        this.checkVisibleItems();
    }
    componentWillUnmount () {
        // Before component unmounts, remove events again
        window.removeEventListener('resize', this.checkVisibleItems);
        document.removeEventListener('click', this.hideExtendedNavigation);
    }
    componentWillReceiveProps (props) {
        // If amount of navigation items changes, make sure to recheck visible items
        if (this.props.children.length !== props.children.length) {
            if (!this.props.dropdownShowsAll) {
                this.checkVisibleItems();
            }
        }
    }
    /**
     * On init and resize check which items have to go to the dropdown (if any)
     * @returns {undefined}
     */
    checkVisibleItems () {
        const buttonWidth = ReactDOM.findDOMNode(this.refs.buttonRef).offsetWidth;
        const currentFullNavigationWidth = ReactDOM.findDOMNode(this.refs.navigationReducibleWrapRef).offsetWidth;
        let newState = this.refs.navigationHorizontalRef.calculateHiddenItems(buttonWidth, {
            minimizeAtWidth:        this.props.minimizeAtWidth,
            minimizeAtItemsLeft:    this.props.minimizeAtItemsLeft,
            minimizeOnFirstHidden:  this.props.minimizeOnFirstHidden,
            minimized:              this.props.minimized
        }, currentFullNavigationWidth) || {
            secondNavigationItems: []
        };
        this.setState(newState);
    }
    /**
     * Hide / show extended navigation
     * @param {object} event - hand event to prevent propagation
     * @returns {undefined}
     */
    toggleExtendedNavigation (event) {
        event.nativeEvent.stopImmediatePropagation();
        this.setState({
            isSecondNavigationHidden: !this.state.isSecondNavigationHidden
        });
    }
    /**
     * Hide extended navigation
     * @returns {undefined}
     */
    hideExtendedNavigation () {
        this.setState({
            isSecondNavigationHidden: true
        });
    }
    render () {
        const hasSecondLevel = this.state.secondNavigationItems && this.state.secondNavigationItems.length > 0;
        const minimized = this.state.isMinimized;
        const navigationClasses = classNames('navigation-reducible', {
            'navigation-reducible--minimized': minimized
        });
        let buttonContainer;
        let secondNavigation;

        buttonContainer = (
            <Button
                onClick={this.toggleExtendedNavigation}
                leftAligned={this.props.alignMinimizedButtonLeft}
                isHidden={!hasSecondLevel}
                ref='buttonRef'
                label={this.props.buttonLabel}
            />
        );

        // If not all items can be shown in main navigation
        // render dropdown and button to toggle it
        if (hasSecondLevel) {
            secondNavigation = (
                <NavigationDropdown
                    items={this.props.dropdownShowsAll ? this.props.children : this.state.secondNavigationItems}
                    isHidden={this.state.isSecondNavigationHidden}
                />
            );
        }

        return (
            <nav
                className='navigation-reducible-wrap'
                ref='navigationReducibleWrapRef'
            >
                <div className={navigationClasses}>
                    <NavigationHorizontal
                        ref='navigationHorizontalRef'
                        items={this.props.children}
                    />
                    {buttonContainer}
                    {secondNavigation}
                </div>
            </nav>
        );
    }
}

NavigationReducible.propTypes = propTypes;

module.exports = NavigationReducible;
