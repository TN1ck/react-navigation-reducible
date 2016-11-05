import React        from 'react';
import CSSModules   from 'react-css-modules';
import styles       from './NavigationHorizontal.css';
import _            from 'lodash';
import ReactDOM     from 'react-dom';

/**
 * Create the horizontal navigation itself
 * Elements which do not have space are hidden with CSS magic
 */
class NavigationHorizontal extends React.Component {
    calculateHiddenItems () {
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

        // check how much px of the navigation are hidden
        const spaceAvailable = fullWidth - listItemsContainerWidth;

        // start with the last navigation item and sum up widths until all hidden items are in array
        let currendAggregatedWidth = 0;
        let currentSecondNavigationItems = [];

        _.forEachRight(listItems, (item) => {
            currendAggregatedWidth = currendAggregatedWidth + item.width;
            currentSecondNavigationItems.push(item.item);
            if (currendAggregatedWidth > spaceAvailable) {
                return false;
            }
        });

        return {
            secondNavigationItems: _.reverse(currentSecondNavigationItems)
        };
    }
    render () {
        return (
            <ul styleName='navigation-horizontal' ref='navigationHorizontal'>
                {
                    React.Children.map(this.props.items, (item, index) => {
                        return (
                            <li
                                key={'item-container-' + index}
                                styleName='item-container--visible'
                            >
                                <div styleName='navigation-item'>
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

module.exports = CSSModules(NavigationHorizontal, styles);
