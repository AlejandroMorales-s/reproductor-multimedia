import Home from './home.controller';
import notFound from './404.controller';
import video from './video.controller';
const pages = {
    home: Home,
    notFound: notFound,
    video: video
}

export {pages};