import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTAuthGuard } from './guards/JwtAuth.Guard.js';

import { User } from '../user/domain/entity/User.Entitiy.js';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { AuthConfig, auth } from './util/auth.js';

@Module({
  imports: [
    ConfigModule.forFeature(auth),
    JwtModule.registerAsync({
    
      inject: [ConfigService],
      useFactory(config: ConfigService<AuthConfig>) {
        return config.getOrThrow('jwt');
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),

  ],
  providers: [
    JwtStrategy
  ],
  controllers: [],
})
export class AuthModule {}
