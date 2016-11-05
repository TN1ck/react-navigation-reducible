import React        from 'react';
import CSSModules   from 'react-css-modules';
import styles       from './Button.css';

/**
 * Simple button
 */
class Button extends React.Component {
    render () {
        return (
            <div
                styleName='button'
                onClick={this.props.onClick}
            >
                {'...'}
            </div>
        );
    }
}

module.exports = CSSModules(Button, styles);
