const { products } = require("../models/dataStore");

function processCheckout({ productId, quantity, paymentMethod }) {
  const acceptedMethods = ["cash", "credit_card"];
  if (!acceptedMethods.includes(paymentMethod)) {
    throw new Error("Payment method must be cash or credit_card");
  }

  const product = products.find((item) => item.id === Number(productId));
  if (!product) {
    throw new Error("Product not found");
  }

  const qty = Number(quantity);
  if (!Number.isInteger(qty) || qty <= 0) {
    throw new Error("Quantity must be a positive integer");
  }

  const subtotal = product.price * qty;
  const discount = paymentMethod === "cash" ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return {
    product: {
      id: product.id,
      name: product.name,
      unitPrice: product.price
    },
    quantity: qty,
    paymentMethod,
    subtotal,
    discount,
    total
  };
}

module.exports = { processCheckout };
