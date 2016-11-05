import React        from 'react';

/**
 * Simple button
 */
class Button extends React.Component {
    render () {
        return (
            <div
                className='dropdown-button'
                onClick={this.props.onClick}
            >
                {'...'}
            </div>
        );
    }
}

module.exports = Button;
