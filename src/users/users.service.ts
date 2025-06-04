import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entities";
import CreateUserDto from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import QueryUserDto from "./dto/query-user.dto";
import UpdateUserDto from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User>{
        const existingUser = await this.usersRepository.findOne({
            where: {email: createUserDto.email}
        })

        if (existingUser) throw new ConflictException('Email já existe!');

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        return this.usersRepository.save(user);
    }

    async findAll(queryDto: QueryUserDto): Promise<User[]> {
        const query = this.usersRepository.createQueryBuilder('user');
        
        if (queryDto.role)
            query.where('user.role = :role', { role: queryDto.role })

        if (queryDto.sortBy) {
            const order = queryDto.order || 'asc';
            query.orderBy(`user.${queryDto.sortBy}`, order.toUpperCase() as 'ASC' || 'DESC');
        }

        return query.getMany();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where : { id } });
        if (!user) throw new NotFoundException('Usuário não encontrado');
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOne({ where: { email } });
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        
        if (updateUserDto.password)
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);

        Object.assign(user, updateUserDto);
        return this.usersRepository.save(user);
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await this.usersRepository.remove(user);
    }

    async updateLastLogin(id: string): Promise<void> {
        await this.usersRepository.update(id, { lastLogin: new Date() });
    }

    async findInactiveUsers(): Promise<User[]> {
        const thirdyDaysAgo = new Date();
        thirdyDaysAgo.setDate(thirdyDaysAgo.getDate() - 30);

        return this.usersRepository.createQueryBuilder('user')
        .where('user.lastLogin < :date OR user.lastLogin IS NULL', { date: thirdyDaysAgo })
        .getMany();
    }
}