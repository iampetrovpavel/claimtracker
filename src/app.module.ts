import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { ClaimController } from './claim/claim.controller';
import { CommentController } from './comment/comment.controller';
import { getMongoConfig } from './configs/mongo.config';
import { SystemController } from './system/system.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    })
  ],
  controllers: [AppController, AuthController, ClaimController, CommentController, SystemController],
  providers: [AppService],
})
export class AppModule {}
