import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Allow, IsInt, IsString, Min } from 'class-validator';
import { Brand } from 'src/brands/entities/brand.entity';
import {  Point } from 'typeorm';

export class CreateRestaurantDto {
  @ApiProperty({
    type:"number"
  })
  @Min(1)
  @IsInt()
  // @Transform((value)=>({id:value}),{toPlainOnly:true})
  readonly brand: Brand;

  @IsString()
  readonly address: string;

  @IsString()
  readonly time: string;

  @ApiProperty({
    type:'array',
    items:{
      type:"number",
    },
    maxItems:2,
    minItems:2
  })
  @Allow()
  @Transform(({value})=>({type: 'Point', coordinates:value}),{toPlainOnly:true})
  readonly geometry: Point;
}
