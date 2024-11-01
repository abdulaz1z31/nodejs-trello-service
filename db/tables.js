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
      `CREATE TABLE IF NOT EXISTS board (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        columns INT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS board_columns (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        boardId INT REFERENCES board(id) ON DELETE CASCADE
      )`,
      `CREATE TABLE IF NOT EXISTS task (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        "order" INT NOT NULL,
        description TEXT,
        userId INT REFERENCES users(id) ON DELETE SET NULL,
        boardId INT REFERENCES board(id) ON DELETE CASCADE,
        columnId INT REFERENCES board_columns(id)
      )`,
    ];

    for (let table of tables) {
      await pool.query(table);
    }
  } catch (error) {
    console.error("Error creating tables:", error);
    process.exit(1);
  }
};
