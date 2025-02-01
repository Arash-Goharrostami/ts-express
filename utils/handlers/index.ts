import ResponseHandler from './ResponseHandler';

type iHandlers = {
  ResponseHandler: typeof ResponseHandler,
}

const handlers: iHandlers = {
  ResponseHandler,
}

export default handlers;
