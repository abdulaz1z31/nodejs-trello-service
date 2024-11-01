import pool from "./db.js";

export const createTables = async () => {
  try {
    const tables = [
      `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY, 
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        )`,
    ];

    for (let table of tables) {
      await pool.query(table);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
