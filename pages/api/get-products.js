const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
	url: "https://cms.kinkifish.com",
  consumerKey: "ck_0ed3103a7fbb4a62554f92237b5016ab79c51700",
  consumerSecret: "cs_ea78625e562eb856abf7ba6e5f336e2a18afe8e7",
  version: "wc/v3", // API version
});

/**
 * Get Products.
 *
 * Endpoint /api/get-products or '/api/get-products?perPage=2'
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export default async function handler(req, res) {
	
	const responseData = {
		success: false,
		products: []
	}
	
	const { perPage } = req?.query ?? {};
	
	try {
		const { data } = await api.get(
			'products',
			{
				per_page: perPage || 50
			}
		);
		
		responseData.success = true;
		responseData.products = data;
		
		res.json( responseData );
		
	} catch ( error ) {
		responseData.error = error.message;
		res.status( 500 ).json( responseData  );
	}
}
