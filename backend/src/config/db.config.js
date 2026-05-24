import dotenv from 'dotenv';

dotenv.config();

export default {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'project_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};
