import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'João Silva' })
  email!: string;

  @ApiProperty({ example: 'joao@email.com' })
  password!: string;
}
