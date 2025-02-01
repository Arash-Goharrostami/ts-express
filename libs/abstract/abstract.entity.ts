
import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';


// TypeORM Entity
@Entity('User')
export class AbstractEntity {
  @ObjectIdColumn()
  _id!: ObjectId;
}
