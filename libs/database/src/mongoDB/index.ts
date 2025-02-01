import mongoose, { ConnectOptions } from 'mongoose';

type MongoConfig = {
  mongoDBIp: string;
  mongoDBProt: string;
  mongoDbUser: string;
  mongoDbName: string;
  mongoDbTime?: string;
  mongoDbPassword: string;
  mongoDbAuthUser?: string;
};

class MongoDB {
  private static instance: MongoDB;
  private connectionUrl: string = '';
  private options: ConnectOptions = {};

  private constructor() {} // Prevent direct instantiation

  public static getInstance(): MongoDB {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
    }
    return MongoDB.instance;
  }

  public async connect(config: MongoConfig): Promise<void> {
    this.connectionUrl = `mongodb://${config.mongoDBIp}:${config.mongoDBProt}/${config.mongoDbName}`;
    this.options = {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      authSource: config.mongoDbAuthUser,
    } as ConnectOptions;

    try {
      await mongoose.connect(this.connectionUrl, this.options);
      setTimeout(() => {
        console.log(` -- MongoDB connection was SUCCESSFUL on ${this.connectionUrl}`);
      }, Number(config.mongoDbTime));
    } catch (error) {
      console.error({ MONGO_ERROR: error });
    }
  }
}

export default MongoDB;
