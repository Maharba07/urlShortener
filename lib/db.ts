import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,        // 'tu_usuario_de_base_de_datos'
  host: process.env.DB_HOST,        // 'localhost' o tu host de base de datos
  database: process.env.DB_NAME,    // 'tu_nombre_de_base_de_datos'
  password: process.env.DB_PASSWORD,// 'tu_contraseña_de_base_de_datos'
  port: parseInt(process.env.DB_PORT || '5432'), // '5432' o el puerto de tu base de datos
});

export default pool;
