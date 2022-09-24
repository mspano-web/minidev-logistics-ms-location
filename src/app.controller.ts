import { Controller, } from '@nestjs/common';
import {
  // Ctx,
  EventPattern,
  MessagePattern,
  // MqttContext,
  Payload,
} from '@nestjs/microservices';

import { AppService } from './app.service';
import {
  RqCreateLocationDto,
  RqGetLocationsTransportDto,
} from './dto';

/* ----------------------------------- */

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
  ) {}

  /* ------------------ */

  @EventPattern('ms-create-location')
  createLocation(
    @Payload() data: RqCreateLocationDto,
    // @Ctx() context: MqttContext,
  ) {
    const { transport_id, position, date_register } = data;
    // console.log(`Topic: ${context.getTopic()}`);
    this.appService.createLocation(
      transport_id,
      position.latitude,
      position.longitud,
      date_register,
    );
  }

  /* ------------------ */

  @MessagePattern('ms-get-locations-transport')
  async getLocationsTransport(payload: RqGetLocationsTransportDto) {
    const { date_route, transport_id } = payload;
    return await this.appService.getLocationsTransport(
      date_route,
      transport_id,
    );
  }

}

/* ----------------------------------- */
