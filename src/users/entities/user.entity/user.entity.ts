import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 1 })
  id!: string;

  @Column()
  @ApiProperty({ example: 'João Silva' })
  name!: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'joao@email.com' })
  email!: string;

  @Column()
  @ApiProperty({ example: 'joao1234' })
  password!: string;

  @Column({ default: 'user' })
  @ApiProperty({ example: 'admin' })
  role!: 'user' | 'admin';

  @CreateDateColumn()
  @ApiProperty({ example: '2025-06-22T01:10:07.503Z' })
  createdAt!: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: '2025-06-22T01:10:07.503Z' })
  updatedAt!: Date;
}
