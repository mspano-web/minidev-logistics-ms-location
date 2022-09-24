import { IsDateString,  IsString } from 'class-validator';

/* ---------------------------- */

export class RqGetLocationsTransportDto {
  @IsDateString()
  date_route: string;

  @IsString()
  transport_id: string;

}

/* ---------------------------- */
