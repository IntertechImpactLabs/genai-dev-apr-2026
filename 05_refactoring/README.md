# Refactoring Demo - Section 3A

## Prerequisites

- Node.js 18+
- SQLite3 (included in the course dev container)

## Setup

```bash
# Install dependencies
npm install

# Initialize the database with sample data
npm run init-db

# Start the server
npm start

# Or run in development mode with auto-reload
npm run dev
```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `GET /api/products` - Get all products (supports filtering by price and stock)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id/stock` - Update product stock
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders (supports filtering by user and status)
- `GET /api/orders/:id` - Get order by ID with items
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/orders/stats/summary` - Get order statistics

