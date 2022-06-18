import home from '../views/home.js';
let app = document.getElementById('app');

const router = (route) => {
    app.innerHTML = '';
    switch (route) {
        case '#/':
            console.log('home');
            break;
        default:
            console.log('404');
            break;
    }
}

export {router};