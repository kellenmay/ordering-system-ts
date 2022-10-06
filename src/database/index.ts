import { createPool } from 'mysql2/promise';

const pool = createPool({
  database: 'kellens_experiment',
  host: '127.0.0.1',
  password: 'jack',
  user: 'root',
  port: 3306,
  connectionLimit: 20,
  multipleStatements: true,
  dateStrings: true,
});

const connection = await pool.getConnection();

export { connection };
