/** --------------------------------------------------------------------------------------------------------------------
 * @file AbstractRepository
 * @tutorial only need to extand in your repository.
 * @description this file will share common repository methods for the project.
 * @typedef {Object} TDocument
 */
import { AbstractEntity } from './abstract.entity';
import mongoose, {Connection, Model} from 'mongoose';



/** --------------------------------------------------------------------------------------------------------------------
 * class AbstractRepository for use abstract useg
 *
 * @class
 * @extends AbstractEntity
 * @protected abstract readonly logger
 * @protected constractor
 * @protected create
 * @protected findOne
 * @protected findOneAndUpdate
 * @protected upsert
 */
export abstract class AbstractRepository<TDocument extends AbstractEntity> {
  /** ------------------------------------------------------------------------------------------------------------------
   * just import logger for this class
   * @protected
   */

  // protected readonly model: Model<TDocument>;
  // protected readonly connection: Connection; // ✅ Change 'private' to 'protected'

  /** ------------------------------------------------------------------------------------------------------------------
   * local Constractor
   *
   * @param {Model<TDocument>} model
   * @param {Connection      } connection
   */
  // protected constructor(model: Model<TDocument>, connection: Connection) {
  //   this.model = model;
  //   this.connection = connection;
  // }

  protected constructor(
    protected readonly model     : mongoose.Model<TDocument>,
    private   readonly connection: mongoose.Connection,
  ) {}

  /** ------------------------------------------------------------------------------------------------------------------
   * method for Abstract create
   *
   * @param { Omit<TDocument, '_id'> } document
   * @param { SaveOptions } options
   */
  protected async create(document: Omit<TDocument, '_id'>, options?: mongoose.SaveOptions,): Promise<TDocument> {
    const createdDocument = new this.model({ ...document, _id: new mongoose.Types.ObjectId(), });
    return (await createdDocument.save(options)).toJSON() as unknown as TDocument;
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * method for Abstract findOne
   *
   * @param { FilterQuery<TDocument> } filterQuery
   */
  protected async findOne(filterQuery: mongoose.FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });
    if (!document) {
      console.warn('Document not found with filterQuery', filterQuery);
      // TODO :: ErrorHandler
      // throw new NotFoundException('Document not found.');
    }
    return (document) as unknown as TDocument;
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * method for Abstract findOneAndUpdate
   *
   * @param {FilterQuery<TDocument>} filterQuery
   * @param {UpdateQuery<TDocument>} update
   */
  protected async findOneAndUpdate(
    filterQuery: mongoose.FilterQuery<TDocument>,
    update: mongoose.UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true, new: true,
    });
    if (!document) {
      console.warn(`Document not found with filterQuery:`, filterQuery);
      // TODO :: ErrorHandler
      // throw new NotFoundException('Document not found.');
    }
    return document as unknown as TDocument;
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * method for protected upsert
   *
   * @param {FilterQuery<TDocument>} filterQuery
   * @param {Partial    <TDocument>} document
   */
  protected async upsert(filterQuery: mongoose.FilterQuery<TDocument>, document: Partial<TDocument>): Promise<TDocument> {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true, upsert: true, new: true,
    }) as unknown as TDocument;
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * method for protected find
   *
   * @param {FilterQuery<TDocument>} filterQuery
   */
  protected async find(filterQuery: mongoose.FilterQuery<TDocument>): Promise<TDocument> {
    return this.model.find(filterQuery, {}, { lean: true }) as unknown as TDocument;
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * method for protected startTransaction
   */
  protected async startTransaction(): Promise<mongoose.ClientSession> {
    const session = await this.connection.startSession();
    await session.startTransaction();
    return session;
  }
}
