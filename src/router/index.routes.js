import {pages} from '../controllers/index';
const {home, notFound, video} = pages;
let app = document.getElementById('app');

const router = (route, id) => {
    app.innerHTML = '';
    switch (route) {
        case '#/': {
            return app.appendChild(home());
        }
        case '#/about':
            console.log('About');
            break;
        case '#/contact':
            console.log('Contact');
            break;
        case `#/v=${id}`:
            return app.appendChild(video());
        default:
            console.log('404');
            break;
    }
}

export {router};