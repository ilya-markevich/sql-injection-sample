# SQL injection samples
![](https://github.com/ilya-markevich/sql-injection-sample/workflows/Sql%20injection%20sample%20building/badge.svg)

## Prerequisites
To run the samples you need to create .env file in the project root folder (or just rename [.env.example](.env.example) to .env) 

Next stuff should be installed on a local machine: 
- NodeJS & npm
- docker
- docker-compose

## Start server using docker-compose only
- ````npm install````
- ````docker-compose up -d````
- go to http://localhost:3000

Server logs: ````docker-compose logs -f````

## Start server with a database in a container 
- ````npm install````
- ````docker-compose -f docker-compose-development.yml up -d````
- ````npm run start````
- go to http://localhost:3000

## Database structure
2 simple tables are used in the samples: [product](src/db/migrations/create-products-table.js) and [user](src/db/migrations/create-user-table.js)

## The goal of the samples
The goal is to show how SQL injection can be used in the query to `product` table to get all users from `user` table.
