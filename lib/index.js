'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _styles = require('./styles.css');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var classNames = require('classnames');

var NavigationReducible = function (_React$Component) {
    _inherits(NavigationReducible, _React$Component);

    function NavigationReducible(props) {
        _classCallCheck(this, NavigationReducible);

        var _this = _possibleConstructorReturn(this, (NavigationReducible.__proto__ || Object.getPrototypeOf(NavigationReducible)).call(this, props));

        _this.state = {
            secondNavigationItems: [],
            secondNavigationHidden: true,
            leftAlignment: false
        };
        _this.handleResize = _this.handleResize.bind(_this);
        _this.hideExtendedNavigation = _this.hideExtendedNavigation.bind(_this);
        _this.toggleExtendedNavigation = _this.toggleExtendedNavigation.bind(_this);
        return _this;
    }

    _createClass(NavigationReducible, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.addEventListener('resize', this.handleResize);
            document.addEventListener('click', this.hideExtendedNavigation);
            this.handleResize();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this.handleResize);
            document.removeEventListener('click', this.hideExtendedNavigation);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            if (this.props.children.length !== props.children.length) {
                this.handleResize();
            }
        }
    }, {
        key: 'handleResize',
        value: function handleResize() {
            var _this2 = this;

            var listItemsContainer = ReactDOM.findDOMNode(this.refs.navitems);
            // current width of navigation: content + padding (without border!)
            var listItemsContainerWidth = listItemsContainer.clientWidth;
            var listItems = listItemsContainer.childNodes;

            listItems = _.map(listItems, function (item, index) {
                return {
                    item: React.Children.toArray(_this2.props.children)[index],
                    element: item,
                    width: item.offsetWidth
                };
            });
            // full width when navigation is not reduced
            var fullWidth = _.sumBy(listItems, function (item) {
                return item.width;
            });

            // return if navigation is not reduced
            if (fullWidth <= listItemsContainerWidth) {
                this.setState({
                    secondNavigationItems: []
                });
                return;
            }

            // check how much px of the navigation are hidden
            var spaceAvailable = fullWidth - listItemsContainerWidth;

            // start with the last navigation item and sum up widths until all hidden items are in array
            var currendAggregatedWidth = 0;
            var currentSecondNavigationItems = [];

            _.forEachRight(listItems, function (item) {
                currendAggregatedWidth = currendAggregatedWidth + item.width;
                currentSecondNavigationItems.push(item.item);
                if (currendAggregatedWidth > spaceAvailable) {
                    return false;
                }
            });
            this.setState({
                // last item is first in the array, so reverse it for correct visual order
                noSpaceLeft: listItemsContainerWidth <= 20,
                secondNavigationItems: _.reverse(currentSecondNavigationItems),
                leftAlignment: this.refs.navitems && ReactDOM.findDOMNode(this.refs.navitems).getBoundingClientRect().width < 200
            });
        }
    }, {
        key: 'toggleExtendedNavigation',
        value: function toggleExtendedNavigation(event) {
            event.nativeEvent.stopImmediatePropagation();
            this.setState({
                secondNavigationHidden: !this.state.secondNavigationHidden
            });
        }
    }, {
        key: 'hideExtendedNavigation',
        value: function hideExtendedNavigation() {
            this.setState({
                secondNavigationHidden: true
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var buttonContainer = void 0;
            var secondNavigation = void 0;

            if (this.state.secondNavigationItems.length > 0) {
                buttonContainer = React.createElement(
                    'aside',
                    {
                        styleName: 'nav-reducable__expand-button-container',
                        onClick: this.toggleExtendedNavigation
                    },
                    '...'
                );
            }

            // when there are secondNavigationItems, create the second navigation
            if (this.state.secondNavigationItems && this.state.secondNavigationItems.length > 0) {

                var secondNavigationClasses = classNames({
                    'nav-reducable__expanded-navigation--active': !this.state.secondNavigationHidden,
                    'nav-reducable__expanded-navigation--left': this.state.leftAlignment
                }, 'nav-reducable__expanded-navigation');

                secondNavigation = React.createElement(
                    'ul',
                    { styleName: secondNavigationClasses, ref: 'navsecond' },
                    this.state.secondNavigationItems.map(function (item, index) {
                        return React.createElement(
                            'li',
                            {
                                key: 'nav-expanded-item-' + index,
                                styleName: 'nav-reducable-items__item-container--hidden'
                            },
                            item
                        );
                    })
                );
            }

            var navigationClasses = classNames({
                'nav-reducable--expanded-navigation-contains-all': this.state.noSpaceLeft
            }, 'nav-reducable');

            return React.createElement(
                'nav',
                { styleName: navigationClasses },
                React.createElement(
                    'ul',
                    { styleName: 'nav-reducable-items', ref: 'navitems' },
                    React.Children.map(this.props.children, function (item, index) {
                        return React.createElement(
                            'li',
                            {
                                key: 'nav-reducible-item-' + index,
                                styleName: 'nav-reducable-items__item-container--visible'
                            },
                            React.createElement(
                                'div',
                                { styleName: 'nav-reducable-items__item' },
                                item
                            )
                        );
                    })
                ),
                secondNavigation,
                buttonContainer
            );
        }
    }]);

    return NavigationReducible;
}(React.Component);

NavigationReducible.propTypes = {
    // general calback if no specific callback for an item is given
    callback: React.PropTypes.func,
    navigationItems: React.PropTypes.array // eslint-disable-line
};

module.exports = (0, _reactCssModules2.default)(NavigationReducible, _styles2.default, {
    allowMultiple: true
});