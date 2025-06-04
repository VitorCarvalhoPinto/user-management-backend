import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "../entities/user.entities";

export default class QueryUserDto {
    @ApiPropertyOptional({ enum: UserRole })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @ApiPropertyOptional({ enum: ['name', 'createdAt'] })
    @IsOptional()
    @IsIn(['name', 'createdAt'])
    sortBy?: string;

    @ApiPropertyOptional({ enum: ['asc', 'desc'] })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc';

}