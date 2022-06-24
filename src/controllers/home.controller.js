import view from '../views/home.html';
let videos = require('../videos.json');
const users = require('../users.json');
const feedContainer = document.getElementById('app');

const creator = (id) => {
    let user = users.find(user => user.id === id);
    return user;
};

const videosFeed = (container) => {
    container.innerHTML = '';
    videos.map(video => {
        const {thumbnail, creator_id, name, id} = video;
        let element = `
        <a href='${`#/v=${id}`}'>
            <div class='feed-card-video'>
                <div class='feed-thumbnail-container'>
                    <img class='feed-thumbnail' src=${thumbnail}>
                </div>
                <div class='feed-video-description'>
                    <img class='feed-video-img' src=${creator(creator_id).profile_pic}>
                    <div>
                        <p class='feed-video-title'>${name}</p>
                        <p class='feed-video-creator'>${creator(creator_id).name}</p>
                    </div>
                </div>
            </div>
        </a>
        `;

        container.innerHTML += element;
    });
};
const videosFeedFilter = (container) => {
    container.innerHTML = '';
    videos.map(video => {
        let element = videosFeed(container);
        const div = document.createElement('div');
        div.innerHTML = element;
        container.appendChild(div);
    });
};

export default () => {
    const div = document.createElement('div');
    div.innerHTML = view;
    feedContainer.appendChild(div);

    const container = document.getElementById('feed-container');
    
    videosFeed(container);
    
    //* Search bar
    const input = document.getElementById('search-input');
    const inputIcon = document.getElementById('search-button');
    const logo = document.getElementById('logo');

    inputIcon.onclick = () => {
        window.location.href = `#/`;
        if (input.value === '') {
            input.style.display = 'block';
            videos = require('../videos.json');
            videosFeed(container);
        } else {
            input.style.display = 'block';
            videos = require('../videos.json');
            videos = videos.filter(video => video.name.includes(input.value));
            videosFeedFilter(container);
        };
    };

    logo.onclick = () => {
        videos = require('../videos.json');
        videosFeed(container);
    }

    return div;
};