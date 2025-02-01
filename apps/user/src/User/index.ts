import UserController from './user.controller';
import UserService    from './user.service'   ;

type iUser = {
  UserController: typeof UserController;
  UserService   : typeof UserService   ;
}

const User: iUser = {
  UserController,
  UserService   ,
}

export default User;
