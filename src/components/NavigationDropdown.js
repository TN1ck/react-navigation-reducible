import React        from 'react';
import classNames   from 'classnames';

/**
 * Create the horizontal navigation itself
 * Elements which do not have space are hidden with CSS magic
 */
class NavigationDropdown extends React.Component {
    render () {
        const secondNavigationClasses = classNames({
            'navigation-dropdown--active': !this.props.isHidden
        }, 'navigation-dropdown');

        return (
            <ul className={secondNavigationClasses}>
                {
                    this.props.items.map((item, index) => {
                        return (
                            <li
                                key={'navigation-dropdown__navigation-item-' + index}
                                className='navigation-dropdown__navigation-item'
                            >
                                {item}
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}

module.exports = NavigationDropdown;
