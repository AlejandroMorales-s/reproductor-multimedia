import scss from'./main.scss';
import {router} from './router/index.routes';
navbar();
router(window.location.hash);
window.addEventListener('hashchange', () => {
    router(window.location.hash);
})