import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import process from 'node:process';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URL, {
      dbName: process.env.MONGO_DB_NAME,
    }),
  ],
})
export class CommonModule {}
