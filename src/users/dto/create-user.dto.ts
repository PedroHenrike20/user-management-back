import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'João Silva' })
  name!: string;

  @ApiProperty({ example: 'joao@email.com' })
  email!: string;

  @ApiProperty({ example: 'joao1234' })
  password!: string;
}
