CREATE TABLE migrations(
    id              SERIAL PRIMARY KEY,
    index           INT UNIQUE,
    date_applied    TIMESTAMP
);