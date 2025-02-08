/** --------------------------------------------------------------------------------------------------------------------
 * @file AbstractRepository
 * @tutorial only need to extand in your repository.
 * @description this file will share common repository methods for the project.
 */

import { AbstractEntity } from './abstract.entity';
import mongoose, {Connection, Model} from 'mongoose';


/** --------------------------------------------------------------------------------------------------------------------
 * @description class AbstractRepository for use abstract useg
 *
 * @class AbstractRepository
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
   * local Constractor
   */
  protected constructor(
    protected readonly model     : mongoose.Model<TDocument>,
    private   readonly connection: mongoose.Connection,
  ) {}

  /** ------------------------------------------------------------------------------------------------------------------
   * @description method for Abstract create
   *
   * @async
   * @method
   * @public
   * @param document
   * @param { SaveOptions } options
   */
  public async create(document: Omit<TDocument, '_id'>, options?: mongoose.SaveOptions,): Promise<TDocument> {
    const createdDocument = new this.model({ ...document, _id: new mongoose.Types.ObjectId(), });
    return (await createdDocument.save(options)).toJSON() as unknown as TDocument;
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * @description method for Abstract findOne
   *
   * @async
   * @method
   * @public
   */
  public async findOne(filterQuery: mongoose.FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });
    if (!document) {
      console.warn('Document not found with filterQuery', filterQuery);
      // TODO :: ErrorHandler
      // throw new NotFoundException('Document not found.');
    }
    return (document) as unknown as TDocument;
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * @description method for Abstract findOneAndUpdate
   *
   * @async
   * @method
   * @public
   */
  public async findOneAndUpdate(
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
   * @description method for public upsert
   *
   * @async
   * @method
   * @public
   */
  public async upsert(filterQuery: mongoose.FilterQuery<TDocument>, document: Partial<TDocument>): Promise<TDocument> {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true, upsert: true, new: true,
    }) as unknown as TDocument;
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * @description method for public find
   *
   * @async
   * @method
   * @public
   */
  public async find(filterQuery: mongoose.FilterQuery<TDocument>): Promise<TDocument> {
    return this.model.find(filterQuery, {}, { lean: true }) as unknown as TDocument;
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * @description method for public startTransaction
   *
   * @async
   * @method
   * @public
   */
  public async startTransaction(): Promise<mongoose.ClientSession> {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
