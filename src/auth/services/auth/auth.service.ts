import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity/user.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/services/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService, // Assuming UsersService is properly imported
    private readonly jwtService: JwtService, // Assuming JwtService is properly imported
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.usersService.findOneByEmail(normalizedEmail);

    if (!user) {
      throw new UnauthorizedException('E-mail e/ou senha inválidos');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('E-mail e/ou senha inválidos');
    }

    return user;
  }

  async login(user: User) {
    const payload = { sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
