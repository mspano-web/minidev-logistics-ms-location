import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransportLocation } from './entities';
import { RqRsFactoryService } from './services/rq-rs-factory.service';
import { RQ_RS_FACTORY_SERVICE } from './interfaces';

/* ----------------------------------- */

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT')),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [TransportLocation],
        synchronize: configService.get('DB_SYNC').toLowerCase() === 'true',
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([TransportLocation]),

  ],
  controllers: [AppController],
  providers: [AppService, 
    {
      useClass: RqRsFactoryService, // You can switch useClass to different implementation
      provide: RQ_RS_FACTORY_SERVICE,
    },
  ],
})

/* ----------------------------------- */

export class AppModule {}
