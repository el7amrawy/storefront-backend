# Routes

- ## users
- ## products
- ## orders

# users route

## `/users` --> put

(create user)

req.body= {
first_name: "[string]",
last_name: "[string]",
password: "[string]"
}

## `/users` --> post

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

## `/products` --> put

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

## `/products` --> post

(return list of products filtered by category)

req.body={category: "[string]"}

# orders routes

## `/users/[user_id]/orders` --> put

(create order)

## `/users/[user_id]/orders` --> get

(return list of orders)

## `/users/[user_id]/orders/[order_id]` --> get

(return order)

## `/users/[user_id]/orders/[order_id]/products` --> put

(add product to an order)

req.body={
quantity: [number],
product_id: [number],
}

## `/users/[user_id]/orders/[order_id]/products` --> get

( return list of orders with its products)
