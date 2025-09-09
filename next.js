// api/webhooks/descope.js
import express from "express";

const router = express.Router();

router.post("/webhooks/descope", (req, res) => {
  const event = req.body;

  console.log(" Descope Webhook Event:", event);

  if (event.type === "user.created") {
    // Handle new user signup
  }

  if (event.type === "user.login") {
    // Handle login
  }

  res.status(200).send("ok");
});

export default router;
