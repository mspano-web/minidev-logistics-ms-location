import { Injectable } from '@nestjs/common';
import { BusinessLocation } from 'src/business/business-location';
import { RsGetLocationsTransportDto } from 'src/dto';
import { RsGetLocationsTransportDataDto } from 'src/dto/rs-get-locations-transport.dto';
import { IRqRsFactory } from 'src/interfaces';

/* ------------------------------------------------------- */

@Injectable()
export class RqRsFactoryService implements IRqRsFactory {

    getDTOResponse(
      statusCode: number,
      message: string,
      locations: BusinessLocation[],
    ): RsGetLocationsTransportDto {

      const rs: RsGetLocationsTransportDataDto[] = []; 
      locations.forEach(
        (elem) => {
          rs.push({
            date_register: elem.date_register,
            position: {
              latitude: elem.latitude,
              longitud: elem.longitude
            }}
          )
        }
      )

      return new RsGetLocationsTransportDto(
        {statusCode, message},
        rs
      );
  
    }

}

/* ------------------------------------------------------- */
