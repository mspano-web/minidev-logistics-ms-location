import { BusinessLocation } from 'src/business/business-location';
import { RsGetLocationsTransportDto } from 'src/dto';

//   interface and provide that token when injecting to an interface type.
export const RQ_RS_FACTORY_SERVICE = 'RQ_RS_FACTORY_SERVICE';

/* ----------------------- */

export interface IRqRsFactory {
  getDTOResponse(
    statusCode: number,
    message: string,
    locations: BusinessLocation[],
  ): RsGetLocationsTransportDto;
}

/* ----------------------- */

