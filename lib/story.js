'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybook = require('@kadira/storybook');

var _reactStorybookAddonInfo = require('@kadira/react-storybook-addon-info');

var _reactStorybookAddonInfo2 = _interopRequireDefault(_reactStorybookAddonInfo);

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _storybook.setAddon)(_reactStorybookAddonInfo2.default);

var navigationDashboardItems = [{
    link: '/dashboard/portfolio-overview',
    id: 'portfolio_overview'
}, {
    link: '/dashboard/portfolios',
    id: 'portfolios'
}, {
    link: '/dashboard/reporting',
    id: 'reporting'
}, {
    link: '/dashboard/transactions',
    id: 'transactions'
}, {
    link: '/dashboard/simulator',
    id: 'simulator'
}];

(0, _storybook.storiesOf)('Navigation', module).addWithInfo('Navigation', 'Navigation in default style', function () {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            _index2.default,
            null,
            navigationDashboardItems.map(function (_ref) {
                var link = _ref.link,
                    id = _ref.id;

                return _react2.default.createElement(
                    'div',
                    null,
                    id
                );
            })
        )
    );
}, {
    source: true,
    inline: true
});