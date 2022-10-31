# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 'products' [GET] done
- Show 'products/:product_id' [GET] done
- Create [token required] 'products/' [POST] done
- [OPTIONAL] Top 5 most popular products 'most_popular_products' [GET]
- [OPTIONAL] Products by category (args: product category) 'products_by_category' [GET]

#### Users
- Index [token required] 'users' [GET] done
- Show [token required] 'users/:user_id' [GET] done
- Create N[token required] 'users' [POST] done

#### Orders
- Current Order by user (args: user id)[token required]  '/users/:userID/orders' [GET] done
- [OPTIONAL] Completed Orders by user (args: user id)[token required] '/users/:userID/orders_completed' [GET] done

## Data Shapes and Database Scheme
#### Product
-  id (id SERIAL PRIMARY KEY )
- name (VARCHAR(100))
- price (INTEGER)
- [OPTIONAL] category (VARCHAR(80))

**referenced by**: TABLE "orders_products" CONSTRAINT "orders_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

#### tabel_name: users
- id (SERIAL PRIMARY KEY)
- firstName (VARCHAR(60))
- lastName (VARCHAR(60))
- password (VARCHAR(100))
- mail VARCHAR(60)
- password VARCHAR(100)
- address VARCHAR(60)
- city VARCHAR(60)
- zipCode INTEGER
- state VARCHAR(60)
- creditcard INTEGER

**Referenced by**: TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

#### tabel_name: orders
- id (SERIAL PRIMARY KEY)
- user_id (bigint REFERENCES users (id))
- status of order (VARCHAR(8))
- total INTEGER 
- shipping INTEGER
  
**Referenced by**:TABLE "orders_products" CONSTRAINT "orders_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

#### tabel_name: order Products 
- id (SERIAL PRIMARY KEY)
- id of the order (bigint REFERENCES orders (id))
- id of the product in the order (bigint REFERENCES products (id))
- quantity of the product in the order (integer)
