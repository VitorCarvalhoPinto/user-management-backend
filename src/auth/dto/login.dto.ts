import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, isString, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: 'joao@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @MinLength(6)
    password: string;
}