import playVideo from '../views/video.html';
import variables from '../globalVariables';
let {videosLiked, subscriptions} = variables;
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
                    <div class="video-interaction-button like">
                        ${likeIcon}
                        <p>Like</p>
                    </div>
                    <div class="video-interaction-button dislike">
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
                    <button id="subscribe-button-video">Subscribe</button>
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
            <img class="add-commentary-photo" src="https://scontent.fmex31-1.fna.fbcdn.net/v/t1.6435-9/73117783_2530202380535334_6358232631099785216_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_eui2=AeEgqbJAC9eL_8TShynDpCzrPDwTlZ_9iy88PBOVn_2LL20wpPdZVYkmXbzW0IMbxIWRndvAk9lRje-h7imbxVPi&_nc_ohc=KLP_w6djpiMAX9nKqHV&_nc_ht=scontent.fmex31-1.fna&oh=00_AT9Iq7WSuGKKzhAJJ8b73Rwc7fQEtOYRBXPSc9nADrVmIg&oe=62DA0494">
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
                <a href="#/${name}">
                    <img class="commentary-photo" src=${photo}>
                </a>
                <div>
                    <a href="#/${name}">
                        <h4 class="commentary-name">${name}</h4>
                    </a>
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

    //* Video like
    const like = document.querySelector('.like');
    const dislike = document.getElementById('dislike');

    like.onclick = () =>{
        if (videosLiked.some(video => video === videoSet.id)){
            videosLiked = videosLiked.filter(video => video !== videoSet.id);
            like.classList.remove('liked');
        } else {
            videosLiked.push(videoSet.id);
            like.classList.add('liked');
        };
    };

    //* Subscribe
    const subscribeButton = document.getElementById('subscribe-button-video');
    subscribeButton.addEventListener('click', () => {
        subscriptions.push(videoSet.creator_id);
    });
    
    return div;
};