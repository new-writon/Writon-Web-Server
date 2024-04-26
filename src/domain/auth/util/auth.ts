import type { JwtModuleOptions } from '@nestjs/jwt';

export type AuthConfig = ReturnType<typeof auth>;

export function auth() {


  return {
    jwt: {
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '30d',
      },
    } as JwtModuleOptions,
  };
}
