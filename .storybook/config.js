import { configure } from '@kadira/storybook';

import '../css/navigation-reducible.css';

function requireAll (requireContext) {
    return requireContext.keys().map(requireContext);
}

function loadStories () {
    require('../stories/NavigationReducible.js');
}

configure(loadStories, module);
