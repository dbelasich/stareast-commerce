# Stareast Commerce API

## Description
Simple REST API for an e-commerce flow using JavaScript and Express.  
It supports user registration/login with JWT and authenticated checkout.

## Installation
```bash
npm install
```

## How to Run
```bash
npm start
```

Server runs at `http://localhost:3000`.

Swagger UI: `http://localhost:3000/api-docs`

## Rules
- API has only 4 business endpoints:
  - `POST /register`
  - `POST /login`
  - `POST /checkout`
  - `GET /healthcheck`
- Checkout payment methods allowed:
  - `cash`
  - `credit_card`
- `cash` gives 10% discount.
- Only authenticated users can perform checkout.
- Everything runs in memory (no database).

## Data Already Existent
Initial users:
- `{ "id": 1, "name": "Alice", "email": "alice@example.com", "password": "alice123" }`
- `{ "id": 2, "name": "Bob", "email": "bob@example.com", "password": "bob123" }`
- `{ "id": 3, "name": "Carol", "email": "carol@example.com", "password": "carol123" }`

Initial products:
- `{ "id": 1, "name": "Laptop", "price": 1200 }`
- `{ "id": 2, "name": "Mouse", "price": 40 }`
- `{ "id": 3, "name": "Keyboard", "price": 80 }`

## How to Use the Rest API
1. Register a user (optional if using existing users):
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Dave","email":"dave@example.com","password":"dave123"}'
```

2. Login to get JWT:
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"alice123"}'
```

3. Checkout with token:
```bash
curl -X POST http://localhost:3000/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"productId":1,"quantity":1,"paymentMethod":"cash"}'
```

4. Healthcheck:
```bash
curl http://localhost:3000/healthcheck
```
