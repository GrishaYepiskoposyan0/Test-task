import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  password: string;

  @ApiProperty({ example: '077112233' })
  @IsString()
  @IsPhoneNumber('AM')
  phoneNumber: string;
}
