import { Environment } from './environment';
import { ServiceLocator } from './service-locator';

document.addEventListener('DOMContentLoaded', () => {
    console.log('run preview window');
    console.log(document.cookie);
    Environment.DesignerUrl = window.location.search.substr(1).split('&').find(q => q.startsWith('ep=')).substr(3);
    const app = ServiceLocator.createApp();
    app.run();
});

window.addEventListener('click', (event) => {
    event.preventDefault();
});
