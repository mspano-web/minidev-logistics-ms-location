import { HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { BusinessLocation } from './business/business-location';
import { RsGetLocationsTransportDto } from './dto';
import { TransportLocation } from './entities';
import { IRqRsFactory, RQ_RS_FACTORY_SERVICE } from './interfaces';

/* ----------------------------------- */

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TransportLocation)
    private readonly locationRepository: Repository<TransportLocation>,
    
    @Inject(RQ_RS_FACTORY_SERVICE)
    private readonly rqRsFactoryService: IRqRsFactory,

  ) {}

  /* ------------------- */

  async createLocation(
    transport_id: number,
    latitude: number,
    longitude: number,
    date_register: string,
  ): Promise<boolean> {
    const locationDB = await this.locationRepository
      .createQueryBuilder()
      .insert()
      .into(TransportLocation)
      .values([
        {
          transport_id: transport_id,
          date_register: new Date(date_register),
          // Must be: POINT(longitude,latitude)
          location: () => `ST_GeomFromText('POINT(${longitude} ${latitude} )')`,
        },
      ])
      .execute();

    // TO CHECK in UI MySQL: SELECT ST_Y(location) as latitude, ST_X(location) as longitude FROM locations.tranport_location;

    if (locationDB === null) {
      throw new InternalServerErrorException('Location Create Fail');
    }
    console.log( '[ms-create-location][service]');

    return true;
  }

  /* ------------------- */

  async getLocationsTransport(date_route: string, transport_id: string) {
    let rsGetLocationsTransportDto: RsGetLocationsTransportDto = null;

    try {
      const locations: BusinessLocation[] = await this.locationRepository
        .createQueryBuilder()
        .select([
          "DATE_FORMAT(date_register, '%Y-%m-%d %T') as date_register",
          'ST_Y(location) as latitude',
          'ST_X(location) as longitude',
        ])
        .where('transport_id =  :transportId', { transportId: transport_id })
        .andWhere('DATE(date_register) = :startDate', { startDate: date_route })
        .orderBy('date_register', 'DESC')
        .getRawMany();
      if (locations) {
        rsGetLocationsTransportDto = this.rqRsFactoryService.getDTOResponse(
          HttpStatus.OK, '', locations, );

      } else {
        rsGetLocationsTransportDto = this.rqRsFactoryService.getDTOResponse(
          HttpStatus.NOT_FOUND, 'Locations not found', null, );
        }
    } catch (e) {
      rsGetLocationsTransportDto = this.rqRsFactoryService.getDTOResponse(
        HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to get locations', null, );
    }
    console.log( '[ms-get-locations-transport][service] (', rsGetLocationsTransportDto,')', );

    return rsGetLocationsTransportDto;
  }
}

/* ----------------------------------- */
