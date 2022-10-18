/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(60),
    lastName VARCHAR(60),
    mail VARCHAR(60),
    password VARCHAR(100),
    address VARCHAR(60),
    city VARCHAR(60),
    zip INTEGER,
    state VARCHAR(60),
    card INTEGER ,
)
