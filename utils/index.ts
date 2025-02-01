import handlers from './handlers';
import router   from './router'  ;

type iUtils = {
  handlers: typeof handlers,
  router  : typeof router  ,
}

const utils: iUtils = {
  handlers,
  router  ,
}

export default utils;
