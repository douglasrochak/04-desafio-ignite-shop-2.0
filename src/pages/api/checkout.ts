import { stripe } from "@/src/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { Product } from "use-shopping-cart/core";
const { validateCartItems } = require("use-shopping-cart/utilities");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cartDetails } = req.body;

  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed" });
  }

  if (!cartDetails) {
    return res.status(400).json({ error: "No items in cart" });
  }

  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products: Product[] = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      description: product.description!,
      name: product.name,
      image: product.images[0],
      price: price.unit_amount!,
      currency: price.currency,
    };
  });

  try {
    const lineItems = validateCartItems(products, cartDetails);

    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;

    const cancelUrl = process.env.NEXT_URL;

    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: "payment",
      line_items: lineItems,
    });

    return res.status(201).json({
      checkoutUrl: checkoutSession.url,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong" });
  }
}
