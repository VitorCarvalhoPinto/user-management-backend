import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import CreateUserDto from "./dto/create-user.dto";
import { UserRole } from "./entities/user.entities";
import QueryUserDto from "./dto/query-user.dto";
import { get } from "http";
import UpdateUserDto from "./dto/update-user.dto";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Cria um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
    @ApiResponse({ status: 409, description: 'Email já existe' })
    create(@Body() CreateUserDto: CreateUserDto){
        return this.usersService.create(CreateUserDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Busca todos os usuários (admin)' })
    findAll(@Query() queryDto: QueryUserDto) {
        return this.usersService.findAll(queryDto);
    }

    @Get("profile")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Busca o usuário atual' })
    getProfile(@Request() req) {
        return this.usersService.findOne(req.user.userId);
    }

    @Get('inactive')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Busca usunários inativos (admin)' })
    findInactiveUsers() {
        return this.usersService.findInactiveUsers();
    }
    
    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Busca usuário por id (admin)' })
    findById(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Atualiza o usuário atual' })
    updateProfile(@Request() req, @Body() updateProfileDto: UpdateUserDto) {
        return this.usersService.update(req.user.userId, updateProfileDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Atualiza o usuário por id (admin)' })
    update(@Param('id') id: string, @Body() updateProfileDto: UpdateUserDto) {
        return this.usersService.update(id, updateProfileDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Deleta o usuário por id (admin)' })
    delete(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}