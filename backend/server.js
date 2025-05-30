const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

// Payment route
app.post("/api/payment/create", async (req, res) => {
  try {
    console.log("Received payment request:", req.body);

    const paymentData = {
      amount: parseInt(req.body.amount),
      currency: "XAF",
      reference: `ORDER_${Date.now()}`,
      callback_url: req.body.callback_url,
      customer: {
        email: req.body.customer.email,
        name: req.body.customer.name,
        phone_number: req.body.customer.phone_number,
        city: req.body.customer.city,
      },
      metadata: {
        items: req.body.items,
      },
    };

    console.log("Sending to Nkwa API:", paymentData);

    const response = await fetch(process.env.NKWA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NKWA_API_KEY}`,
      },
      body: JSON.stringify(paymentData),
    });

    const responseText = await response.text();
    console.log("Nkwa API raw response:", responseText);

    if (!response.ok) {
      console.error("Nkwa API error status:", response.status);
      console.error("Nkwa API error response:", responseText);
      return res.status(response.status).json({
        error: "Payment initiation failed",
        details: responseText,
      });
    }

    const result = JSON.parse(responseText);
    console.log("Nkwa API parsed response:", result);

    res.json(result);
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend server is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
