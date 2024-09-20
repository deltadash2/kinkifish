import React from "react";

import Layout from "@/componentss/layouts";
import {
  HEADER_FOOTER_ENDPOINT,
  WOOCOMMERCE_COUNTRIES_ENDPOINT,
} from "@/Utils/constants/endpoints";
import axios from "axios";
import CheckoutForm from "@/MyComponents/checkout/checkout-form";

const Checkout = ({ headerFooter, countries }) => {
  return (
    <>
      <Layout headerFooter={headerFooter || ""}>
        <div className="w-full py-32 overflow-hidden px-5">
          <CheckoutForm countriesData={countries} />
        </div>
      </Layout>
    </>
  );
};

export default Checkout;

export async function getStaticProps() {
  try {
    const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
    const { data: countries } = await axios.get(WOOCOMMERCE_COUNTRIES_ENDPOINT);

    return {
      props: {
        headerFooter: headerFooterData?.data ?? {},
        countries: countries || {},
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error(
      "An error occured while fetching header and details for checkout from server",
      error
    );
    return {
      props: {
        headerFooter: "Not found",
      },
      revalidate: 1,
    };
  }
}
