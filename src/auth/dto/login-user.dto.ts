import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'joao@email.com' })
  email!: string;

  @ApiProperty({ example: 'joao123' })
  password!: string;
}
