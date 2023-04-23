import { DataSource } from 'typeorm';
import { config } from './src/common/config/env.config';

export default new DataSource({
  type: 'postgres',
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DATABASE,
  entities: ['./src/modules/**/entities/*.{ts,js}'],
  migrations: ['./src/migrations/*.{ts,js}'],
});
