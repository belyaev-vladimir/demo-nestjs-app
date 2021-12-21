import { Entity, Column, BeforeInsert, PrimaryColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { UserResponse } from '../user.interface';

@Entity()
export class User {

  @PrimaryColumn()
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  //
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return bcrypt.compare(attempt, this.password);
  }

  toJSON(): UserResponse {
    return <UserResponse>classToPlain(this);
  }
}
