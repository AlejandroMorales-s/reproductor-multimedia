import playVideo from '../views/video.html';
//* Icons
import playIcon from '../assets/icons/play.svg';
import rewindIcon from '../assets/icons/rewind.svg';
import forwardIcon from '../assets/icons/forward.svg';
import fullscreenIcon from '../assets/icons/fullscreen.svg';
import likeIcon from '../assets/icons/like.svg';
import dislikeIcon from '../assets/icons/dislike.svg';  
//* Data
const videos = require('../videos.json');
const users = require('../users.json');
const commentaries = require('../commentary.json');
//* Container
const container = document.getElementById('app');

let id;

window.addEventListener('hashchange', () => {
    id = window.location.hash.substring(4);
});

const creator = (id) => {
    let user = users.find(user => user.id === id);
    return user;
};

//* Video
//*=============================================================================================
const setVideo = (video, container) => {
    const {url} = video;
    let element = `
        <div class="video-container">
            <video id="video" class="video">
                <source src="${url}" type="video/mp4">
                <p>Your browser does not support the video</p>
            </video>
            <div class="video-buttons">
                ${rewindIcon}
                ${playIcon}
                ${forwardIcon}
                <input type="range" id="control" min="0" max="100" step="0.1" value="0">
                ${fullscreenIcon}
            </div>
        </div>
    `;

    container.innerHTML += element;
};

//* Video info
//*=============================================================================================
const videoInfo = (video, container) => {
    const {description, name, creator_id, id} = video;
    let element = `
        <div class="video-info-container">
            <div class="video-interaction-container">
                <h3>${name}</h3>
                <div class="video-interaction-buttons">
                <div class="video-interaction-button">
                    ${likeIcon}
                    <p>Like</p>
                </div>
                <div class="video-interaction-button">
                    ${dislikeIcon}
                    <p>Dislike</p>
                </div>
                </div>
            </div>
            <div class="video-description-container">   
                <div class='video-description'>
                    <div class="video-creator-container">
                        <img class='video-creator-img' src=${creator(creator_id).profile_pic}>
                        <p class='video-creator-name'>${creator(creator_id).name}</p>
                    </div>
                    <button>Subscribe</button>
                </div>
                <p>${description}</p>
            </div>
        </div>
        <div id="commentaries-container"></div>
    `;

    container.innerHTML += element;
};

//* Commentaries
//*=============================================================================================
const commentary = (container) => {
    let addCommentary = `
        <div class="add-commentary-container">
            <img class="add-commentary-photo" src="https://source.unsplash.com/user/alan">
            <div class="add-commentary-input-container">
                <input type="text" class="add-commentary-input" placeholder="Add a commentary">
                <button class="add-commentary-button">Comment</button>
            </div>
        </div>
    `;

    container.innerHTML += addCommentary;

    commentaries.map(comment => {
        const {name, commentary, photo} = comment;
        let element = `
            <div class="commentary">
                <img class="commentary-photo" src=${photo}>
                <div>
                    <h4 class="commentary-name">${name}</h4>
                    <p class="commentary-info">${commentary}</p>
                    <div class="commentary-buttons-container">
                        ${likeIcon}
                        ${dislikeIcon}
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML += element;
    });
};

//* Aside videos
//*=============================================================================================
const setAsideVideos = (container) => {
    videos.map(video => {
        const {thumbnail, creator_id, name, id} = video;
        let element = `
        <a href='${`#/v=${id}`}'>
            <div class='aside-card-video'>
                <div class='aside-thumbnail-container'>
                    <img class='aside-thumbnail' src=${thumbnail}>
                </div>
                <div class='aside-video-description'>
                    <p class='aside-video-title'>${name}</p>
                    <p class='aside-video-creator'>${creator(creator_id).name}</p>
                </div>
            </div>
        </a>
        `;
        
        container.innerHTML += element;
    });
};

export default () => {
    const videoSet = videos.find(video => video.id === Number(id));
    const div = document.createElement('div');
    div.innerHTML = playVideo;
    container.appendChild(div);

    const videoContainer = document.getElementById('video-div');
    const asideVideosContainer = document.getElementById('aside-videos-container');
    
    setVideo(videoSet, videoContainer);
    videoInfo(videoSet, videoContainer);

    const commentariesContainer = document.getElementById('commentaries-container');
    
    commentary(commentariesContainer);
    
    setAsideVideos(asideVideosContainer);
    
    const video = document.getElementById('video');
    
    const play = document.getElementById('play-button');
    const control = document.getElementById('control');

    //* Video range control
    let duration;

    video.addEventListener("loadeddata",(event)=>{
        duration = event.target.duration;
    });

    video.addEventListener("timeupdate",(event)=>{
        const percentage = (event.target.currentTime / duration) * 100;
        control.value = percentage;
    });

    control.oninput = (event)=>{
        video.currentTime = (duration / 100) * event.target.value;
    };
    
    //* Video play/pause
    play.onclick = ()=>{
        if(video.paused){
            video.play()
        }else{
            video.pause()
        };
    };

    //* Video fullscreen
    const fullscreen = document.getElementById('fullscreen-button');

    let onFullscreen = false;

    fullscreen.onclick = ()=>{
        if(onFullscreen){
            onFullscreen = false;
            document.exitFullscreen();
        }else{
            onFullscreen = true
            videoContainer.requestFullscreen();
        };
    };

    //* Video rewind/forward
    const rewindSeconds = document.getElementById('rewind-button');
    const forwardSeconds = document.getElementById('forward-button');

    rewindSeconds.onclick = () =>{
        video.currentTime = video.currentTime - 1;
    };

    forwardSeconds.onclick = () =>{
        video.currentTime = video.currentTime + 1;
    };
    
    return div;
};