import React        from 'react';
import _            from 'lodash';
import ReactDOM     from 'react-dom';

/**
 * Create the horizontal navigation itself
 * Elements which do not have space are hidden with CSS magic
 */
class NavigationHorizontal extends React.Component {
    calculateHiddenItems (buttonWidth, options, currentFullNavigationWidth) {
        const listItemsContainer = ReactDOM.findDOMNode(this.refs.navigationHorizontal);
        // current width of navigation: content + padding (without border!)
        const listItemsContainerWidth = listItemsContainer.clientWidth;
        let listItems = _.map(listItemsContainer.childNodes, (item, index) => {
            return {
                item: React.Children.toArray(this.props.items)[index],
                element: item,
                width: item.offsetWidth
            };
        });

        // full width when navigation is not reduced
        const fullWidth = _.sumBy(listItems, (item) => {
            return item.width;
        });

        // return if navigation is not reduced
        if (fullWidth <= listItemsContainerWidth) {
            return;
        }

        // check how many px of the navigation are hidden
        const spaceAvailable = fullWidth - listItemsContainerWidth;

        // start with the last navigation item and sum up widths until all hidden items are in array
        let currendAggregatedWidth = 0;
        let currentSecondNavigationItems = [];

        _.forEachRight(listItems, (item) => {
            currendAggregatedWidth = currendAggregatedWidth + item.width;
            currentSecondNavigationItems.push(item.item);
            if ((currendAggregatedWidth - buttonWidth) > spaceAvailable) {
                return false;
            }
        });

        // calculate breakpoints, use always the highest breakpoint
        let breakpoints = [];
        if (options.minimizeAtItemsLeft) {
            breakpoints.push(_(_.slice(listItems, 0, options.minimizeAtItemsLeft)).sumBy((item) => {
                return item.width;
            }));
        }
        if (options.minimizeAtWidth) {
            breakpoints.push(options.minimizeAtWidth);
        }
        if (options.minimizeOnFirstHidden) {
            breakpoints.push(fullWidth - buttonWidth);
        }
        if (options.minimized) {
            breakpoints.push(currentFullNavigationWidth);
        }
        // Always break latest at the last item
        breakpoints.push(_.first(listItems).width);
        breakpoints = _.max(breakpoints);

        let minimizeNavigation;
        minimizeNavigation = breakpoints && (currentFullNavigationWidth - buttonWidth) <= breakpoints;

        return {
            secondNavigationItems: _.reverse(currentSecondNavigationItems),
            isMinimized: minimizeNavigation
        };
    }
    render () {
        return (
            <ul className='navigation-horizontal' ref='navigationHorizontal'>
                {
                    React.Children.map(this.props.items, (item, index) => {
                        return (
                            <li
                                key={'navigation-horizontal__item-container-' + index}
                                className='navigation-horizontal__item-container--visible'
                            >
                                <div className='navigation-horizontal__navigation-item'>
                                    {item}
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}

module.exports = NavigationHorizontal;
