import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { ClaimController } from './claim/claim.controller';
import { CommentController } from './comment/comment.controller';
import { getMongoConfig } from './configs/mongo.config';
import { SystemController } from './system/system.controller';
import { SystemModule } from './system/system.module';
import { SystemService } from './system/system.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    }),
    SystemModule
  ],
  // controllers: [AuthController, ClaimController, CommentController, SystemController],
  // providers: [SystemService],
})
export class AppModule {}
