# Database Schema

## Tables

- ## users
  | Column     | Type                   |
  | ---------- | ---------------------- |
  | id         | integer                |
  | first_name | character varying(100) |
  | last_name  | character varying(100) |
  | password   | character varying      |
- ## products
  | Column   | Type                   |
  | -------- | ---------------------- |
  | id       | integer                |
  | name     | character varying(100) |
  | price    | integer                |
  | category | character varying(100) |
- ## orders
  | Column  | Type                  |
  | ------- | --------------------- |
  | id      | integer               |
  | status  | character varying(50) |
  | user_id | bigint                |
- ## order_products
  | Column     | Type    |
  | ---------- | ------- |
  | id         | integer |
  | quantity   | integer |
  | order_id   | bigint  |
  | product_id | bigint  |

# Routes

- ## users
- ## products
- ## orders

# users route

## `/users` --> post

(create user)

req.body= {
first_name: "[string]",
last_name: "[string]",
password: "[string]"
}

## `/users/login` --> post

(authenticate)

req.body= {
id:"[number]",
password: "[string]"
}

## `/users/[user_id]` --> get

(return user)

## `/users` --> get

(return list of users)

# products routes

## `/products` --> post

(create product)

req.body={
name: "[string]",
price: [number],
category: "[string]"
}

## `/products/[product_id]` --> get

(return product)

## `/products` --> get

(return list of products)

## `/products/category` --> post

(return list of products filtered by category)

req.body={category: "[string]"}

# orders routes

## `/users/[user_id]/orders` --> post

(create order)

## `/users/[user_id]/orders` --> get

(return list of orders)

## `/users/[user_id]/orders/[order_id]` --> get

(return order)

## `/users/[user_id]/orders/[order_id]/products` --> post

(add product to an order)

req.body={
quantity: [number],
product_id: [number],
}

## `/users/[user_id]/orders/[order_id]/products` --> get

( return list of orders with its products)
