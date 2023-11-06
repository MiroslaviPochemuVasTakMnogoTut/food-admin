import { IsNumber, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsNumber()
  readonly brand: number;

  @IsString()
  readonly address: string;

  @IsString()
  readonly time: string;

  // readonly

  readonly coordinates: number[];
}
