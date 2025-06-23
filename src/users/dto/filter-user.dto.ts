import { ApiProperty } from '@nestjs/swagger';

export class FilterUserDto {
  @ApiProperty({ example: 'admin' })
  role!: string;

  @ApiProperty({ example: 'nome' })
  sortBy!: string;

  @ApiProperty({ example: 'asc' })
  orderDirection!: 'asc' | 'desc';
}
