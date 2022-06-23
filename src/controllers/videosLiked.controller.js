import videosLiked from '../views/videosLiked.html';
import variables from '../globalVariables';
//* Data
const videos = require('../videos.json');
const users = require('../users.json');
const container = document.getElementById('app');

const videosLikedArray = [];

const creator = (id) => {
    let user = users.find(user => user.id === id);
    return user;
};

const addVideosLiked = (container) => {
    videosLikedArray.map(video => {
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
    variables.videosLiked.forEach(videoLiked => {
        if (videos.some(video => video.id == videoLiked)) {
            videosLikedArray.push(videos.find(video => video.id == videoLiked));
        }
    });
    const div = document.createElement('div');
    div.innerHTML = videosLiked;
    container.appendChild(div);

    const videosLikedContainer = document.getElementById('videos-liked-container');

    addVideosLiked(videosLikedContainer);
    
    return div;
}