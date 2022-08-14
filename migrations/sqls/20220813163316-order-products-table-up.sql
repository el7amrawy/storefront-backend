/* Replace with your SQL commands */
CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id)
)