CREATE DATABASE pern_pomodorro;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE study_sessions(
    session_id SERIAL PRIMARY KEY,
    duration INTEGER NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL
);
