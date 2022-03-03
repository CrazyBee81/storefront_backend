/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    user_id bigint REFERENCES users (id),
    status  VARCHAR(8)
)


