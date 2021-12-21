import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { LoginDTO } from './login.dto';

export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  username: string;
}
