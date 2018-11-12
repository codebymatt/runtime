--  Presupposes database has already been created

CREATE TABLE users (
    id          SERIAL UNIQUE NOT NULL,
    email       TEXT PRIMARY KEY,
    first_name  TEXT,
    last_name   TEXT,
    password    TEXT,
    date_joined TIMESTAMP
);