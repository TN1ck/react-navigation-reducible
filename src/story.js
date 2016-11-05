import React from 'react';

import {
    storiesOf,
    setAddon
} from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import NavigationReducible from './index.js';

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
            inline: true
        }
    )
;
