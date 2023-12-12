import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { BadRequestException } from '@nestjs/common/exceptions';
import { Point } from 'typeorm';

@Injectable()
export class PointFromStringPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const splitted = value.split(',');
    if (splitted.length !== 2){
      throw new BadRequestException()
    }
    const coordinates = splitted.map(coord=> {
      if (Number.isNaN(+coord)){
        throw new BadRequestException()
      }
      return +coord
    })

    if (coordinates[0] > 180 || coordinates[0] < -180){
      throw new BadRequestException();
    }
    if (coordinates[1] > 90 || coordinates[1] < -90){
      throw new BadRequestException();
    }

    return { type: 'Point', coordinates } as Point;
  }
}
