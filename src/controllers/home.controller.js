import view from '../views/home.html';
const videos = require('../videos.json');
const users = require('../users.json');
const feedContainer = document.getElementById('app');

const creator = (id) => {
    let user = users.find(user => user.id === id);
    return user;
};

const videosFeed = (container) => {
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

export default () => {
    const div = document.createElement('div');
    div.innerHTML = view;
    feedContainer.appendChild(div);

    const container = document.getElementById('feed-container');
    
    videosFeed(container);

    return div;
};