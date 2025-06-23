import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiProperty({ example: 'João Silva' })
  name!: string;

  @ApiProperty({ example: 'joao@email.com' })
  email!: string;

  @ApiProperty({ example: 'joao1234' })
  password!: string;

  @ApiProperty({ example: true })
  isEnable?: boolean;

  @ApiProperty({ example: 'asc' })
  role?: 'admin' | 'user';
}
