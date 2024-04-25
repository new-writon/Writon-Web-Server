import { registerAs } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const dataSourceOptions: DataSourceOptions = {
  type: "mysql" ,
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_SCHEMA,
  entities: [`${join(__dirname, '../../')}/domain/**/*.{js,ts}`],
  synchronize: false,
};

export const dataSource = registerAs('data-source', () => {

  
  return {
    type: process.env.TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    synchronize: false,
    autoLoadEntities: true,
    entities: [`${join(__dirname, '../../')}/domain/**/*.{js,ts}`]
  } as TypeOrmModuleOptions;
});

export default new DataSource(dataSourceOptions);
