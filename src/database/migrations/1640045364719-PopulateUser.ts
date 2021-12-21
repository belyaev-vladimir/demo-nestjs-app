import {
  getRepository,
  MigrationInterface,
  QueryRunner,
  Repository,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

export class PopulateUser1640045364719 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository: Repository<User> = getRepository(User);

    await userRepository.save({
      email: 'admin@example.com',
      password: '$2a$10$cnCm8MgECCHEGApKQlbTh.pZuQn1aK2ubYsOooL9NwlYjks5RcT6W',
    } as User);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository: Repository<User> = getRepository(User);
    await userRepository.clear();
  }
}
