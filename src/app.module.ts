import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ListService } from './list/list.service';
import { ListController } from './list/list.controller';
import { ListModule } from './list/list.module';

@Module({
  imports: [UserModule, ListModule, MongooseModule.forRoot('mongodb+srv://venkadesh:venkadesh@cluster0.qkqpr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
