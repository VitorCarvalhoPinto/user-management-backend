import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "../entities/user.entities";
import CreateUserDto from "./create-user.dto";

export default class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ['email'] as const)
){}