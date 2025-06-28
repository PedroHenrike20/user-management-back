import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { JwtUserPayload } from 'src/auth/interfaces/jwt-user-payload.interface';
import { UpdateUserDTO } from 'src/users/dto/update-user.dto';
import { UserService } from 'src/users/services/user/user.service';
import { RequestExpress } from 'express';
import { FilterUserDto } from 'src/users/dto/filter-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity/user.entity';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/register')
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  register(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('auth/users')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Listar todos usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    type: [User],
  })
  getAllUsers() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/user/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Buscar por um usuário pelo Id' })
  @ApiResponse({
    status: 200,
    type: [User],
  })
  getUserById(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('auth/user/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    type: [User],
  })
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('auth/user/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Excluir usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário excluído com sucesso',
  })
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/filtered/users')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Ordernar a lista de usuários' })
  @ApiResponse({
    status: 200,
    description: 'Usuários filtrados com sucesso',
    type: [User],
  })
  getAllUsersFilterd(@Query() filter: FilterUserDto) {
    return this.userService.findAllFiltered(filter);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Carregar informações do usuário autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Informações do usuário carregado com sucesso',
    type: [User],
  })
  getProfile(@Request() req: RequestExpress & { user: JwtUserPayload }) {
    return this.userService.findOne(req.user.sub);
  }
}
