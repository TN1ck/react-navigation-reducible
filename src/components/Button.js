import React        from 'react';
import classNames   from 'classnames';

/**
 * Simple button
 */
class Button extends React.Component {
    render () {
        return (
            <div
                className={
                    classNames('dropdown-button', {
                        'dropdown-button--left': this.props.leftAligned
                    })
                }
                onClick={this.props.onClick}
                style={{
                    visibility: this.props.isHidden ? 'hidden' : 'visible'
                }}
            >
                {
                    this.props.label || '...'
                }
            </div>
        );
    }
}

module.exports = Button;
