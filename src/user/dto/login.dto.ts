import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @ApiProperty({ example: 'admin@example.com'  })
  email: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({ example: '0000'  })
  password: string;
}
