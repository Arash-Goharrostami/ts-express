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
export abstract class AbstractRepository<Object extends AbstractEntity> {

  /** ------------------------------------------------------------------------------------------------------------------
   * local Constractor
   *
   * @param {Model<TDocument>} model
   * @param {Connection      } connection
   */
  protected constructor(
    protected readonly model     : mongoose.Model<Object>,
    private   readonly connection: mongoose.Connection,
  ) {}

  /** ------------------------------------------------------------------------------------------------------------------
   * @description method for Abstract create
   *
   * @async
   * @method
   * @public
   * @param { Omit<TDocument, '_id'> } document
   * @param { SaveOptions } options
   */
  public async create(document: Omit<Object, '_id'>, options?: mongoose.SaveOptions,): Promise<Object> {
    const createdDocument = new this.model({ ...document, _id: new mongoose.Types.ObjectId(), });
    return (await createdDocument.save(options)).toJSON() as unknown as Object;
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * @description method for Abstract findOne
   *
   * @async
   * @method
   * @public
   * @param { FilterQuery<TDocument> } filterQuery
   */
  public async findOne(filterQuery: mongoose.FilterQuery<Object>): Promise<Object> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });
    if (!document) {
      console.warn('Document not found with filterQuery', filterQuery);
      // TODO :: ErrorHandler
      // throw new NotFoundException('Document not found.');
    }
    return (document) as unknown as Object;
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * @description method for Abstract findOneAndUpdate
   *
   * @async
   * @method
   * @public
   * @param {FilterQuery<TDocument>} filterQuery
   * @param {UpdateQuery<TDocument>} update
   */
  public async findOneAndUpdate(
    filterQuery: mongoose.FilterQuery<Object>,
    update: mongoose.UpdateQuery<Object>,
  ): Promise<Object> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true, new: true,
    });
    if (!document) {
      console.warn(`Document not found with filterQuery:`, filterQuery);
      // TODO :: ErrorHandler
      // throw new NotFoundException('Document not found.');
    }
    return document as unknown as Object;
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * @description method for public upsert
   *
   * @async
   * @method
   * @public
   * @param {FilterQuery<TDocument>} filterQuery
   * @param {Partial    <TDocument>} document
   */
  public async upsert(filterQuery: mongoose.FilterQuery<Object>, document: Partial<Object>): Promise<Object> {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true, upsert: true, new: true,
    }) as unknown as Object;
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * @description method for public find
   *
   * @async
   * @method
   * @public
   * @param {FilterQuery<TDocument>} filterQuery
   */
  public async find(filterQuery: mongoose.FilterQuery<Object>): Promise<Object> {
    return this.model.find(filterQuery, {}, { lean: true }) as unknown as Object;
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
    await session.startTransaction();
    return session;
  }
}
