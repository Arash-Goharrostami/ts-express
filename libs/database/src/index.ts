import MongoDB from './mongoDB';

type IDatabase = {
  MongoDB: typeof MongoDB;
};

const database: IDatabase = {
  MongoDB,
};

export default database;
