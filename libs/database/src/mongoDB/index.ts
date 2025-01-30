import mongoose, { ConnectOptions } from 'mongoose';

type MongoConfig = {
  mongoDBIp: string;
  mongoDBProt: string;
  mongoDbUser: string;
  mongoDbName: string;
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
      useUnifiedTopology: true,
      useNewUrlParser: true,
      authSource: config.mongoDbAuthUser,
    } as ConnectOptions;

    try {
      await mongoose.connect(this.connectionUrl, this.options);
      console.log(`MongoDB connection was SUCCESSFUL on ${this.connectionUrl}`);
    } catch (error) {
      console.error({ MONGO_ERROR: error });
    }
  }
}

export default MongoDB;
