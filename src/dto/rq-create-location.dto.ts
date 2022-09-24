import { IsDateString, IsNumber, IsObject } from "class-validator";

/* ---------------------------- */

export class PointDto {
    @IsNumber()
    readonly latitude: number;
    @IsNumber()
    readonly longitud: number;
}

/* ---------------------------- */

export class RqCreateLocationDto {
    @IsNumber()
    readonly transport_id: number;

    @IsObject()
    readonly position: PointDto;

    @IsDateString()
    readonly date_register: string;
}

/* ---------------------------- */
