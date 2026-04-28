const { processCheckout } = require("../services/checkoutService");

function checkout(req, res) {
  try {
    const { productId, quantity, paymentMethod } = req.body;
    if (!productId || !quantity || !paymentMethod) {
      return res.status(400).json({
        message: "productId, quantity and paymentMethod are required"
      });
    }

    const result = processCheckout({ productId, quantity, paymentMethod });
    return res.status(200).json({ message: "Checkout completed", order: result });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = { checkout };
