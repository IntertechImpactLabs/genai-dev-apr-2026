/**
 * POST /api/orders — Create a new order.
 *
 * This handler has several intentional issues for the code review demo.
 * The skill-based review should catch them all.
 */

const db = require('../db');

async function createOrder(req, res) {
  const userId = req.body.userId;
  const items = req.body.items;

  // Look up the user
  const user = await db.query(`SELECT * FROM users WHERE id = ${userId}`);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  // Calculate total
  let total = 0;
  for (const item of items) {
    const product = await db.query(`SELECT * FROM products WHERE id = ${item.productId}`);
    total += product.price * item.quantity;

    // Update stock
    await db.query(`UPDATE products SET stock = stock - ${item.quantity} WHERE id = ${item.productId}`);
  }

  // Apply discount
  if (total > 100) {
    total = total * 0.9;
  }

  // Create the order
  const order = await db.query(
    `INSERT INTO orders (user_id, total, status) VALUES (${userId}, ${total}, 'pending') RETURNING *`
  );

  // Log for debugging
  console.log('New order created:', order.id, 'user:', userId, 'token:', req.headers.authorization);

  res.status(201).json(order);
}

module.exports = createOrder;
