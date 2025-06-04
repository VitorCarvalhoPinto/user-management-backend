import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';
import { User } from "src/users/entities/user.entities";
import { JwtPayload } from "./strategies/jwt.strategy";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if(user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null
    }

    async login(user: User) {
        const payload: JwtPayload = {
            email: user.email,
            sub: user.id,
            role: user.role,
        }

        await this.usersService.updateLastLogin(user.id);

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        }
    }

    async register(registerDto: RegisterDto): Promise<User> {
        return this.usersService.create(registerDto);
    }
}