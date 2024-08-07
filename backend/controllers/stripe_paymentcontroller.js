// Ensure you have required dotenv for environment variables
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);


const createpayment = async (req, res) => {
    const { product_id, vender_id, address, quantity, total, paymentmethod, status } = req.body;
  
    try {
      const line_items = [
        {
          price_data: {
            currency: "pkr",
            product_data: {
              name: "Product Name",
              description: "Product Description",
              images: ["https://example.com/image.jpg"],
            },
            unit_amount: Math.round(total * 100), // Amount in cents
          },
          quantity: quantity, // Quantity of this item
        }
      ];
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: line_items,
        mode: "payment",
        success_url: "http://localhost:3000/order",
        cancel_url: "http://localhost:3000/order"
      });
  
      console.log("Session:", session); // Log the session object
      res.json({ id: session.id }); // Send JSON response with session ID
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  };
  
  module.exports = {
    createpayment,
  };
  