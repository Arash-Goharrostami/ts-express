/** --------------------------------------------------------------------------------------------------------------------
 * @file index.ts
 * @fileOverview
 *  this file represent mongoDB connection 4 application
 */
import mongoose, { ConnectOptions } from 'mongoose';

/** --------------------------------------------------------------------------------------------------------------------
 * @define just regular mongoDB auth adn location information.
 * @type MongoConfig
 */
type MongoConfig = {
  mongoDBIp: string;
  mongoDBProt: string;
  mongoDbUser: string;
  mongoDbName: string;
  mongoDbTime?: string;
  mongoDbPassword: string;
  mongoDbAuthUser?: string;
};

/** --------------------------------------------------------------------------------------------------------------------
 * @description
 *  main class and only class of this file
 *  this class will serve mongoDB 4 your project depents on inputs,
 *  it can handle more than one or two connection in same time.
 * @class
 */
class MongoDB {

  /** ------------------------------------------------------------------------------------------------------------------
   * @define local values validation
   * @private
   */
  private static instance: MongoDB;
  private connectionUrl: string = '';
  private options: ConnectOptions = {};

  private constructor() {} // Prevent direct instantiation

  /** ------------------------------------------------------------------------------------------------------------------
   * @description just create instance of new mongoDB connection
   * @public
   * @static
   * @method
   */
  public static getInstance(): MongoDB {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
    }
    return MongoDB.instance;
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * @description method connec 4 mongoDB
   * @public
   * @async
   * @method
   * @param { MongoConfig } config
   */
  public async connect(config: MongoConfig): Promise<void> {
    this.connectionUrl = `mongodb://${config.mongoDBIp}:${config.mongoDBProt}/${config.mongoDbName}`;
    this.options = {
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

/** --------------------------------------------------------------------------------------------------------------------
 * export mine class of this file with default flag
 */
export default MongoDB;
