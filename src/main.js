import scss from'./main.scss';
import {router} from './router/index.routes';
import navbar from './controllers/navbar.controller';

navbar();
router(window.location.hash);
window.addEventListener('hashchange', () => {
    const id = window.location.hash.substring(4);
    const creatorName = window.location.hash.substring(2);
    router(window.location.hash, id, creatorName);
})