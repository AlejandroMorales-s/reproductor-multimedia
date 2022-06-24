import Home from './home.controller';
import notFound from './404.controller';
import video from './video.controller';
import channel from './channel.controller';
import videosLiked from './videosLiked.controller';
import subscriptions from './subscription.controller';

const pages = {
    home: Home,
    notFound: notFound,
    video: video,
    channel: channel,
    videosLiked: videosLiked,
    subscriptions: subscriptions,
}

export {pages};