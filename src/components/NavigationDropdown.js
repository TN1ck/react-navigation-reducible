import React        from 'react';
import classNames   from 'classnames';
import CSSModules   from 'react-css-modules';
import styles       from './NavigationDropdown.css';

/**
 * Create the horizontal navigation itself
 * Elements which do not have space are hidden with CSS magic
 */
class NavigationDropdown extends React.Component {
    render () {
        const secondNavigationClasses = classNames({
            active: !this.props.isHidden
        }, 'navigation-dropdown');

        return (
            <ul styleName={secondNavigationClasses}>
                {
                    this.props.items.map((item, index) => {
                        return (
                            <li
                                key={'navigation-item-' + index}
                                styleName='navigation-item'
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

module.exports = CSSModules(NavigationDropdown, styles, {
    allowMultiple: true
});
