import {pages} from '../controllers/index';
const {home, notFound, video, channel, videosLiked} = pages;
let app = document.getElementById('app');

const router = (route, id, creatorName) => {
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
        case `#/liked`: {
            return app.appendChild(videosLiked());
        }
        case `#/v=${id}`: {
            return app.appendChild(video());
        }
        case `#/${creatorName}`: {
            return app.appendChild(channel());
        }
        default:
            console.log('404');
            break;
    }
}

export {router};