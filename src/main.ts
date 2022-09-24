import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

/* ----------------------------------- */

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);
  const host = configService.get<string>('LOCATION_HOST');
  const port = configService.get<string>('LOCATION_PORT');

  console.log("host:", host, "port:", port);

  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.MQTT,
    options: {
      url: `mqtt://${host}:${port}`,
    },
  };

  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );

  await app.listen();
}

/* ----------------------------------- */

bootstrap();
