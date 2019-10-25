import { Environment } from './environment';
import { ServiceLocator } from './service-locator';

document.addEventListener('DOMContentLoaded', () => {
    console.log('run preview window')
    Environment.DesignerUrl = window['__designer_preview__'];
    const app = ServiceLocator.createApp();
    app.run();
});

window.addEventListener('click', (event) => {
    event.preventDefault();
});
