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

## Data Shapes
#### Product
-  id (id SERIAL PRIMARY KEY )
- name (VARCHAR(100))
- price (INTEGER)
- [OPTIONAL] category (VARCHAR(80))

#### User
- id (SERIAL PRIMARY KEY)
- firstName (VARCHAR(60))
- lastName (VARCHAR(60))
- password (VARCHAR(100))

#### Orders
- id (SERIAL PRIMARY KEY)
- user_id (bigint REFERENCES users (id))
- status of order (VARCHAR(8)) 

#### Order Products 
- id (SERIAL PRIMARY KEY)
- id of the order (bigint REFERENCES orders (id))
- id of the product in the order (bigint REFERENCES products (id))
- quantity of the product in the order (integer)
