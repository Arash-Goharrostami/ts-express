/** --------------------------------------------------------------------------------------------------------------------
 * @file abstract.entity.ts
 * @tutorial only need to extand in your entity.
 * @description this class will provide mongoDB objectId.
 */
import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

/** --------------------------------------------------------------------------------------------------------------------
 * @description class AbstractEntity / TypeORM-Entity
 *
 * @class AbstractEntity
 */
@Entity('User')
export class AbstractEntity {
  @ObjectIdColumn()
  _id!: ObjectId;
}
