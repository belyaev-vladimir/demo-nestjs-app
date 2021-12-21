import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1640045301508 implements MigrationInterface {
  name = 'InitDb1640045301508';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`email\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`product\``);
  }
}
