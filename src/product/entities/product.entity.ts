import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @ApiProperty({ example: '100500', description: 'identifier of product' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'hammer', description: 'product name' })
  @Column({ nullable: false })
  name: string;
}
