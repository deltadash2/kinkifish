const fetch = require("node-fetch");

const PRIVATE_API_KEY = "pk_ee8525bbae98f9214103c4c089ec57270d";
const LIST_ID = "UKy6ZG";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    const url = `https://a.klaviyo.com/api/v2/list/${LIST_ID}/subscribe?api_key=${PRIVATE_API_KEY}`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        profiles: [{ email: email }],
      }),
    };

    fetch(url, options)
      .then((response) => res.json(response))
      .catch((err) => {
        console.error("error:", err);
        res.json(err);
      });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
