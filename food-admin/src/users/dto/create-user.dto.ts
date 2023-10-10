import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @Length(2, 25)
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly passwd: string;

  // @IsBoolean()
  // readonly email_verified: boolean;

  //   @IsDate()
  //   readonly created_at: Date;

  //   @IsDate()
  //   readonly updated_at: Date;
}
