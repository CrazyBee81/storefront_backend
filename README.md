# Storefront Backend Project

## Getting Started
This repo contains the modified start code for the storefront backend project. It consists of a basic Node and Express app, that I used to build up an API service for a real-life scenario.

To get started clone the project and execute `npm i ` in your CLI to install all dependencies necessary to run the project. Now you can start to setup a database by following these steps:
startup a PSQL terminal

* Create a user with by typing the command `CREATE USER storefront_admin WITH PASSWORD storefront_password`
* Create a live database and one for testing with `CREATE DATABASE storefront_backend;` and `CREATE DATABASE storefront_backend_test;`
* Grant all privileges to the user in both databases with `GRANT ALL PRIVILEGES ON DATABASE storefront_backend;` and `GRANT ALL PRIVILEGES ON DATABASE storefront_backend_test;`

Since the project is using the dotenv library, a .env file is needed. Below is an example of a working dotenv file based on the database name and user mentioned above. The port on **localhost is set to 5678**.

POSTGRES_HOST=localhost <br>
POSTGRES_PORT=5678 <br>
POSTGRES_DB=storefront_backend <br>
POSTGRES_USER=storefront_admin <br>
POSTGRES_PASSWORD=storefront_password <br>