import channel from '../views/channel.html';
const container = document.getElementById('app');
//* Data
const videos = require('../videos.json');
const users = require('../users.json');

let creatorName;
let creatorInfo;
let creatorVideos = [];

const creator = (id) => {
    let user = users.find(user => user.id === id);
    return user;
};

window.addEventListener('hashchange', () => {
    creatorName = window.location.hash.substring(2).replace(/%20/g, ' ');
});

const header = (creator, container) => {
    const {name, profile_pic, cover_image} = creator;
    let element = `
        <div class="channel-header-container">
            <div class="channel-header-cover-image">
                <img src="${cover_image}" alt="${name}">
            </div>
            <div class="channel-header-info container">
                <div>
                    <img class="channel-header-image" src=${profile_pic}>
                    <h2>${name}</h2>
                </div>
                <button>Subscribe</button>
            </div>
        </div>
        <div id="channel-videos-container" class="container"></div>
    `;
    container.innerHTML += element;
};

const channelVideos = () => {
    creatorVideos = [];
    videos.map(video => {
        const {creator_id} = video;
        if (creator_id === creatorInfo.id) {
            creatorVideos.push(video);
        };
    });
};

const videosChannel = (container) => {
    container.innerHTML = '';
    if (creatorVideos.length > 0) {
        creatorVideos.map(video => {
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
    } else {
        let element = `
            <h2 class="align-text">No videos yet</h2>
        `;
        container.innerHTML += element;
    };
};

export default () => {
    const name = users.find(user => user.name == creatorName);
    const div = document.createElement('div');
    div.innerHTML = channel;
    container.appendChild(div);
    
    const channelContainer = document.getElementById('channel-container');
    creatorInfo = creator(name.id);
    channelVideos();
    header(name, channelContainer);

    const channelVideosContainer = document.getElementById('channel-videos-container');

    videosChannel(channelVideosContainer);
    
    return div;
}