import { OmitType } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { Brand } from '../entities/brand.entity';

export class CreateBrandDto extends OmitType(Brand, ['id', 'restaurants', 'company']){

  // @IsInt()
  // readonly companyId: number;

  // public static toEntity(dto: Partial<CreateBrandDto>) {
  //   const it = new Brand();

  //   if (dto.hasOwnProperty('companyId')) it.company.id = dto.companyId;

  //   if (dto.hasOwnProperty('name')) it.name = dto.name;

  //   return it;
  // }
}
