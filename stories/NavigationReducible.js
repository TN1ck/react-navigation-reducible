import React from 'react';

import {
    storiesOf,
    setAddon
} from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import NavigationReducible from '../src/index.js';

setAddon(infoAddon);

const navigationDashboardItems = [
    {
        link: '/dashboard/portfolio-overview',
        id: 'portfolio_overview',
        translation: 'Portfolio Overview'
    },
    {
        link: '/dashboard/portfolios',
        id: 'portfolios',
        translation: 'Portfolios'
    },
    {
        link: '/dashboard/reporting',
        id: 'reporting',
        translation: 'Reporting'
    },
    {
        link: '/dashboard/transactions',
        id: 'transactions',
        translation: 'Transactions'
    },
    {
        link: '/dashboard/simulator',
        id: 'simulator',
        translation: 'Simulator'
    }
];

storiesOf('Navigation Reducible', module)
    .addWithInfo(
        'Reducible navigation: Default',
        `Default behavior - navigation items are aligned left.
        As soon as there is not enough space for the items anymore, the button to open the dropdown is shown on the right.`,
        () => (
            <NavigationReducible>
                {navigationDashboardItems.map(({id, translation}) => {
                    return (
                        <div key={'navigation-item-' + id}>
                            {translation}
                        </div>
                    );
                })}
            </NavigationReducible>
        ), {
            source: true,
            inline: false
        }
    )
    .addWithInfo(
        'Reducible navigation: Minimize on breakpoint',
        `At a given size,
        reduce the navigation to the button only.`,
        () => (
            <NavigationReducible
                minimizeAtWidth={640}
            >
                {navigationDashboardItems.map(({id, translation}) => {
                    return (
                        <div key={'navigation-item-' + id}>
                            {translation}
                        </div>
                    );
                })}
            </NavigationReducible>
        ), {
            source: true,
            inline: false
        }
    )
    .addWithInfo(
        'Reducible navigation: Minimize on item amount',
        `At a given amount of still shown items,
        reduce the navigation to the button only.`,
        () => (
            <NavigationReducible
                minimizeAtItemsLeft={3}
            >
                {navigationDashboardItems.map(({id, translation}) => {
                    return (
                        <div key={'navigation-item-' + id}>
                            {translation}
                        </div>
                    );
                })}
            </NavigationReducible>
        ), {
            source: true,
            inline: false
        }
    )
    .addWithInfo(
        'Reducible navigation: Dropdown shows always all items',
        'Sometimes it makes sense to always show all items in the dropdown.',
        () => (
            <NavigationReducible
                dropdownShowsAll
            >
                {navigationDashboardItems.map(({id, translation}) => {
                    return (
                        <div key={'navigation-item-' + id}>
                            {translation}
                        </div>
                    );
                })}
            </NavigationReducible>
        ), {
            source: true,
            inline: false
        }
    )
    .addWithInfo(
        'Reducible navigation: Minimize on first hidden',
        'Minimize as soon as one item becomes hidden',
        () => (
            <NavigationReducible
                minimizeOnFirstHidden
            >
                {navigationDashboardItems.map(({id, translation}) => {
                    return (
                        <div key={'navigation-item-' + id}>
                            {translation}
                        </div>
                    );
                })}
            </NavigationReducible>
        ), {
            source: true,
            inline: false
        }
    )
    .addWithInfo(
        'Reducible navigation: Minimized',
        'Only the dropdown button is shown',
        () => (
            <NavigationReducible
                minimized
            >
                {navigationDashboardItems.map(({id, translation}) => {
                    return (
                        <div key={'navigation-item-' + id}>
                            {translation}
                        </div>
                    );
                })}
            </NavigationReducible>
        ), {
            source: true,
            inline: false
        }
    )
    .addWithInfo(
        'Reducible navigation: Minimized on left',
        'Only the dropdown button is shown',
        () => (
            <NavigationReducible
                minimized
                alignMinimizedButtonLeft
            >
                {navigationDashboardItems.map(({id, translation}) => {
                    return (
                        <div key={'navigation-item-' + id}>
                            {translation}
                        </div>
                    );
                })}
            </NavigationReducible>
        ), {
            source: true,
            inline: false
        }
    )
    .addWithInfo(
        'Reducible navigation: Custom button label',
        'Change the label of the button',
        () => (
            <NavigationReducible
                buttonLabel={'show more..'}
            >
                {navigationDashboardItems.map(({id, translation}) => {
                    return (
                        <div key={'navigation-item-' + id}>
                            {translation}
                        </div>
                    );
                })}
            </NavigationReducible>
        ), {
            source: true,
            inline: false
        }
    )
    .addWithInfo(
        'Reducible navigation: Custom button label and left aligned button on minimize',
        'Change the label of the button',
        () => (
            <NavigationReducible
                buttonLabel={'show more..'}
                alignMinimizedButtonLeft
            >
                {navigationDashboardItems.map(({id, translation}) => {
                    return (
                        <div key={'navigation-item-' + id}>
                            {translation}
                        </div>
                    );
                })}
            </NavigationReducible>
        ), {
            source: true,
            inline: false
        }
    )
;
