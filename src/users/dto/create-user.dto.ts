import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "../entities/user.entities";

export default class CreateUserDto {
    @ApiProperty({ example: "João Silva" })
    @IsString()
    name: string;

    @ApiProperty({ example: "joaosilva@email.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "password123", minLength: 6 })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ enum: UserRole, default: UserRole.USER })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

}