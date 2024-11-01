CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS board (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    columns INT NOT NULL
);

CREATE TABLE IF NOT EXISTS column (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    boardId INT REFERENCES board(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS task (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    "order" INT NOT NULL,
    description TEXT,
    userId INT REFERENCES users(id) ON DELETE SET NULL,
    boardId INT REFERENCES board(id) ON DELETE CASCADE,
    columnId INT REFERENCES column(id)
);










INSERT INTO users (name, email, password) VALUES 
('John Doe', 'john@example.com', 'hashed_password_1'),
('Jane Smith', 'jane@example.com', 'hashed_password_2'),
('Alice Johnson', 'alice@example.com', 'hashed_password_3');

INSERT INTO board (title, columns) VALUES
('Project A', 3),
('Project B', 3),
('Project C', 3);

INSERT INTO board_columns (title, boardId) VALUES
('To Do', 1),
('In Progress', 1),
('Done', 1),
('To Do', 2),
('In Progress', 2),
('Done', 2),
('To Do', 3),
('In Progress', 3),
('Done', 3);

INSERT INTO task (title, "order", description, userId, boardId, columnId) VALUES
('Setup project structure', 1, 'Initialize the project repository and structure.', 1, 1, 1),
('Design database schema', 2, 'Plan and create the database schema.', 2, 1, 1),
('Implement authentication', 3, 'Setup user authentication using bcrypt.', 3, 1, 2),
('Create API endpoints', 1, 'Define and implement API routes.', 1, 2, 4),
('Write tests', 2, 'Write unit tests for the application.', 2, 2, 5),
('Deploy to production', 3, 'Deploy the application to the cloud.', NULL, 3, 9);


