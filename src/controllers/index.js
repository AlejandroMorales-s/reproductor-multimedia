import Home from './home.controller';
import notFound from './404.controller';
import video from './video.controller';
import channel from './channel.controller';
const pages = {
    home: Home,
    notFound: notFound,
    video: video,
    channel: channel,
}

export {pages};