/* Replace with your SQL commands */
CREATE TABLE orders (
                        id SERIAL PRIMARY KEY,
                        user_id bigint REFERENCES users (id),
                        status  VARCHAR(8),
                        total INTEGER ,
                        shipping INTEGER
)

