import { PointDto } from "./rq-create-location.dto";
import { RsGenericHeaderDto } from "./rs-generic-header.dto";

/* ---------------------------- */

export class RsGetLocationsTransportDataDto {
    date_register: string;
    position: PointDto;
}

/* ---------------------------- */

export class RsGetLocationsTransportDto {
    rsGenericHeaderDto: RsGenericHeaderDto;
    rsGetLocationsTransportDataDto:  RsGetLocationsTransportDataDto[];
  
    constructor(
      rsGenericHeaderDto: RsGenericHeaderDto,
      rsGetLocationsTransportDataDto: RsGetLocationsTransportDataDto[],
    ) {
      this.rsGenericHeaderDto = rsGenericHeaderDto;
      this.rsGetLocationsTransportDataDto = rsGetLocationsTransportDataDto;
    }
}

/* -------------------------------------- */
