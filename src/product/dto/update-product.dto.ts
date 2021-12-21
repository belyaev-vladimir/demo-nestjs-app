import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 100500, description: 'product identifier' })
  public id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'hammer', description: 'product name for update' })
  public name: string;
}
