import subscribe from '../views/subscriptions.html';
import variables from '../globalVariables';
let {subscriptions} = variables;
let videos = require('../videos.json');
const users = require('../users.json');
const container = document.getElementById('app');

const creator = (id) => {
    let user = users.find(user => user.id === id);
    return user;
};

const videosFeed = (container) => {
    subscriptions.map(sub => {
        let videosSubscriptions = videos.filter(video => video.creator_id === sub);
        videosSubscriptions.map(video => {
            let element = `
            <a href='${`#/v=${video.id}`}'>
                <div class='feed-card-video'>
                    <div class='feed-thumbnail-container'>
                        <img class='feed-thumbnail' src=${video.thumbnail}>
                    </div>
                    <div class='feed-video-description'>
                        <img class='feed-video-img' src=${creator(sub).profile_pic}>
                        <div>
                            <p class='feed-video-title'>${video.name}</p>
                            <p class='feed-video-creator'>${creator(sub).name}</p>
                        </div>
                    </div>
                </div>
            </a>
            `;
    
            container.innerHTML += element;
        });
    });
};

export default () => {
    const div = document.createElement('div');
    div.innerHTML = subscribe;
    container.appendChild(div);
    const subscriptionsContainer = document.getElementById('subscriptions-container');
    videosFeed(subscriptionsContainer);
    return div;
}