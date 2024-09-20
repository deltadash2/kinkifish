import { buffer } from "micro";
const Stripe = require("stripe");
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});
const webhookSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

const api = new WooCommerceRestApi({
  url: "https://cms.kinkifish.com",
  consumerKey: "ck_0ed3103a7fbb4a62554f92237b5016ab79c51700",
  consumerSecret: "cs_ea78625e562eb856abf7ba6e5f336e2a18afe8e7",
  version: "wc/v3", // API version
});

/**
 * Update Order.
 *
 * Once payment is successful or failed,
 * Update Order Status to 'Processing' or 'Failed' and set the transaction id.
 *
 * @param {String} newStatus Order Status to be updated.
 * @param {String} orderId Order id
 * @param {String} transactionId Transaction id.
 *
 * @returns {Promise<void>}
 */
const updateOrder = async (newStatus, orderId, transactionId = "") => {
  let newOrderData = {
    status: newStatus,
  };

  if (transactionId) {
    newOrderData.transaction_id = transactionId;
  }

  try {
    const { data } = await api.put(`orders/${orderId}`, newOrderData);
  } catch (error) {
    console.error("Order creation error", error);
    throw error;
  }
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let stripeEvent;

    try {
      stripeEvent = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if ("checkout.session.completed" === stripeEvent.type) {
      const session = stripeEvent.data.object;
      try {
        await updateOrder("processing", session.metadata.orderId, session.id);
      } catch (error) {
        await updateOrder("failed", session.metadata.orderId);
        console.error("Update order error", error);
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;
