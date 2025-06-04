import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "src/users/entities/user.entities";

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
 type: 'postgres',
 host: configService.get('DB_HOST'),
 port: parseInt(configService.get('DB_PORT') ?? '5432', 10),
 username: configService.get('DB_USERNAME'),
 password: configService.get('DB_PASSWORD'),
 database: configService.get('DB_DATABASE'),
//  entities: [__dirname + '/../**/*.entities{.ts,.js}'],
 entities: [User],
//  synchronize: configService.get('NODE_DEV') === 'development',
 synchronize: true, 
 logging: configService.get('NODE_DEV') === 'development'
})