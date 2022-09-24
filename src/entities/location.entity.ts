import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Geometry } from 'geojson';

import { GeometryTransformer } from '../utils/tranform-geoposition';

/* ---------------------------- */

@Entity()
export class TransportLocation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  transport_id: number;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326, // WGS84 reference system
    transformer: new GeometryTransformer(),
  })
  location?: Geometry;

  @Column({ type: 'timestamp' })
  date_register: Date;

}

/* ---------------------------- */
