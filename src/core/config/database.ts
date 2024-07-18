import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  };
});
