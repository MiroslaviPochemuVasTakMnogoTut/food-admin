import { IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  readonly login: string;

  @IsString()
  readonly passwd: string;
}
