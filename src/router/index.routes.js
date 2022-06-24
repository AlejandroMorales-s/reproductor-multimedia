import {pages} from '../controllers/index';
const {home, notFound, video, channel, videosLiked, subscriptions} = pages;
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
        case `#/subscriptions`: {
            return app.appendChild(subscriptions());
        }
        case `#/v=${id}`: {
            return app.appendChild(video());
        }
        case `#/${creatorName}`: {
            return app.appendChild(channel());
        }
        default: {
            return app.appendChild(notFound());
        }
    }
}

export {router};