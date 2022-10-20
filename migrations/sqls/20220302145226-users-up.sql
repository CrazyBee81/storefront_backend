/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(60),
    lastname VARCHAR(60),
    mail VARCHAR(60),
    password VARCHAR(100),
    address VARCHAR(60),
    city VARCHAR(60),
    zipCode INTEGER,
    state VARCHAR(60),
    creditcard INTEGER
)
