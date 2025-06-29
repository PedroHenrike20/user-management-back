import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity/user.entity';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from 'src/users/dto/update-user.dto';
import { FilterUserDto } from 'src/users/dto/filter-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const normalizedEmail = userDTO.email.trim().toLowerCase();
    const existingUser = await this.userRepository.findOneBy({
      email: normalizedEmail,
    });
    if (existingUser) {
      throw new ConflictException('Já existe um usuário com este e-mail');
    }
    const hashedPassword = await bcrypt.hash(userDTO.password, 10);
    const user = this.userRepository.create({
      ...userDTO,
      email: normalizedEmail,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async findAllFiltered(filter: FilterUserDto): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('user');

    if (filter.role) {
      query.andWhere('user.role = :role', { role: filter.role });
    }
    const allowedOrderFields = ['name', 'email', 'createdAt'];
    const orderBy = allowedOrderFields.includes(filter.sortBy)
      ? filter.sortBy
      : 'name';
    const orderDirection =
      filter.orderDirection?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    query.orderBy(`user.${orderBy}`, orderDirection);

    return query.getMany();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.trim().toLowerCase();
    return this.userRepository.findOneBy({ email: normalizedEmail });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async update(id: string, userDTO: UpdateUserDTO): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!userDTO.name || userDTO.name.trim() === '') {
      throw new BadRequestException('O nome é obrigatório');
    }

    const updatedFields: Partial<User> = {
      name: userDTO.name.trim(),
    };

    if (userDTO.email) {
      updatedFields.email = userDTO.email.toLowerCase().trim();
    }

    if (userDTO.role !== undefined) {
      updatedFields.role = userDTO.role;
    }

    if (userDTO.isEnable !== undefined) {
      updatedFields.isEnable = userDTO.isEnable;
    }

    if (userDTO.password && userDTO.password.trim() !== '') {
      updatedFields.password = await bcrypt.hash(userDTO.password, 10);
    }

    Object.assign(user, updatedFields);
    return this.userRepository.save(user);
  }
}
