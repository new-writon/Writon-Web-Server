import { registerAs } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {type DataSourceOptions } from 'typeorm';
import * as path from 'path';


// const dataSourceLocal: DataSourceOptions = {
//   type: "mysql",
//   host: "127.0.0.1",
//   port: 3306,
//   username: "root",
//   password: "Cn37rqww@@!",
//   database: "Writon-Data",
//   entities:[path.join(__dirname, '../entity/*.{js,ts}')],
//   synchronize: false,
// };


export const dataSource = registerAs('data-source', () => {
  return {
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    synchronize: false,
    autoLoadEntities: true,
    entities:[path.join(__dirname, '../../domain/**/entity/*.{js,ts}')],
    logging: ['error']
  } as TypeOrmModuleOptions;
});

