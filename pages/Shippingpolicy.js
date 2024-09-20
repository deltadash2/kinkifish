import React from "react";
import Header from "@/MyComponents/Header";
import Footer from "@/MyComponents/Footer";
import Subscribekinki from "@/MyComponents/Subscribekinki";
import axios from "axios";

const Shippingpolicy = ({ headerFooter }) => {
  return (
    <>
      <Header header={headerFooter} />
      <div className="w-full py-16">
        <div className="mt-12">
          <div className="flex flex-col justify-center items-center">
            <p className="uppercase text-3xl font-normal pb-4">
              Shipping Policy
            </p>
            <div className="w-20 border-t-2 border-t-gray-800"></div>
          </div>
          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              At Kinki Fish, we try our best to fulfill every order as quickly
              as possible. Please allow 1-3 days for your order to be process,
              delivery days are quoted in business days. Once your order has
              been dispatched, please check for a confirmation email.
            </p>
          </div>
          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              For international orders, the costs and delivery fees displayed do
              not include taxes and duties which may be applied by customs or
              postal authorities in the country of delivery. Duty rates vary
              depending on the value of the goods. It is important to be aware
              of the ones that apply in your country in case you do get charged
            </p>
          </div>
          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="px-7 w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              Canada:{" "}
              <a href="#" className="underline">
                https://www.cbsa-asfc.gc.ca/import/postal-postale/dtytx-drttx-eng.html
                ·
              </a>
            </p>
          </div>
          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="px-7 w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              UK:{" "}
              <a href="#" className="underline">
                {" "}
                https://www.gov.uk/goods-sent-from-abroad/tax-and-duty ·
              </a>
            </p>
          </div>
          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="px-7 w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              Middle East:{" "}
              <a href="#" className="underline">
                https://istizada.com/guide-to-middle-east-import-laws-and-taxes/.
              </a>
            </p>
          </div>
          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="px-7 w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              Kinki Fish is not responsible for any lost or missing packages.
              Please contact your carrier to open a claim.
            </p>
          </div>
        </div>
      </div>
      <Subscribekinki />
      <Footer />
    </>
  );
};

export default Shippingpolicy;

export async function getStaticProps() {
  try {
    const { data: headerFooterData } = await axios.get(
      `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer`
    );

    return {
      props: {
        headerFooter: headerFooterData.data ?? {},
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error("An error occured while fetching data from server", error);
    return {
      props: {
        headerFooter: "Not found",
      },
    };
  }
}
