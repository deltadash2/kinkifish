const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
import { isEmpty } from "lodash";

const api = new WooCommerceRestApi({
  url: "https://cms.kinkifish.com",
  consumerKey: "ck_0ed3103a7fbb4a62554f92237b5016ab79c51700",
  consumerSecret: "cs_ea78625e562eb856abf7ba6e5f336e2a18afe8e7",
  version: "wc/v3", // API version
});

/**
 * Create order endpoint.
 *
 * @see http://woocommerce.github.io/woocommerce-rest-api-docs/?javascript#create-an-order
 *
 * @param {Object} req Request.
 * @param {Object} res Response.
 *
 * @return {Promise<{orderId: string, success: boolean, error: string}>}
 */
export default async function handler(req, res) {
  const responseData = {
    success: false,
    orderId: "",
    total: "",
    currency: "",
    error: "",
    paymentUrl: "",
  };

  if (isEmpty(req.body)) {
    responseData.error = "Required data not sent";
    return responseData;
  }

  const data = req.body;
  data.status = "pending";
  data.set_paid = false;

  try {
    const { data } = await api.post("orders", req.body);

    responseData.success = true;
    responseData.orderId = data.number;
    responseData.total = data.total;
    responseData.currency = data.currency;
    responseData.paymentUrl = data.payment_url;

    res.json(responseData);
  } catch (error) {
    console.error("error", error);
    /**
     * Request usually fails if the data in req.body is not sent in the format required.
     *
     * @see Data shape expected: https://stackoverflow.com/questions/49349396/create-an-order-with-coupon-lines-in-woocomerce-rest-api
     */
    responseData.error = error.message;
    res.status(500).json(responseData);
  }
}
