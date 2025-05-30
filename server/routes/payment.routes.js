import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
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

    const response = await fetch(process.env.NKWA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NKWA_API_KEY}`,
      },
      body: JSON.stringify(paymentData),
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Payment initiation failed",
        details: result,
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

export default router;
