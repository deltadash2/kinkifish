import React from "react";
import Header from "@/MyComponents/Header";
import Footer from "@/MyComponents/Footer";
import Subscribekinki from "@/MyComponents/Subscribekinki";
import axios from "axios";

const PrivacyPolicy = ({ headerFooter }) => {
  return (
    <>
      <Header header={headerFooter} />
      <div className="w-full py-16">
        <div className="mt-12">
          <div className="flex flex-col justify-center items-center">
            <p className="uppercase text-3xl font-normal pb-4">
              Privacy Policy
            </p>
            <div className="w-20 border-t-2 border-t-gray-800"></div>
          </div>

          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              Thank you for visiting us. This Privacy Policy is designed to help
              you understand how we collect, use, disclose, and safeguard your
              personal information.
            </p>
          </div>
          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-black underline font-bold tracking-wider text-2xl text-center mb-4">
              Information We Collect
            </p>
            <p>
              We may collect various types of information, including but not
              limited to:
            </p>
            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              - <span className="font-bold">Personal Information:</span> We may
              collect personal information such as your name, email address, and
              other contact details when you voluntarily provide them.
            </p>
            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              -{" "}
              <span className="font-bold">
                Automatically Collected Information:
              </span>{" "}
              We may collect information about your visit to our website,
              including your IP address, browser type, device information, and
              browsing behavior.
            </p>
          </div>
          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-black underline font-bold tracking-wider text-2xl text-center mb-4">
              How We Use Your Information
            </p>
            <p>
              We may use the information we collect for various purposes,
              including:
            </p>
            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              - <span className="font-bold">Providing Services: </span> To
              deliver the services you request, process transactions, and
              respond to your inquiries.
            </p>
            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              - <span className="font-bold">Improving User Experience:</span> To
              enhance and personalize your experience on our website, and to
              understand how our users interact with our content.
            </p>
            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              - <span className="font-bold">Communication: </span> To
              communicate with you regarding updates, promotions, and other
              relevant information. You may opt-out of these communications at
              any time.
            </p>
          </div>
          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-black underline font-bold tracking-wider text-2xl text-center mb-4">
              Information Sharing
            </p>
            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this Privacy Policy or as required by law.
            </p>
          </div>

          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-black underline font-bold tracking-wider text-2xl text-center mb-4">
              Cookies and Similar Technologies
            </p>
            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              We may use cookies and similar technologies to collect information
              about your browsing behavior and preferences. You can manage your
              cookie preferences through your browser settings.
            </p>
          </div>

          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-black underline font-bold tracking-wider text-2xl text-center mb-4">
              Third-Party Links
            </p>
            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              Our website may contain links to third-party websites. We have no
              control over the content or privacy practices of these sites and
              encourage you to review their privacy policies.
            </p>
          </div>

          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-black underline font-bold tracking-wider text-2xl text-center mb-4">
              Security
            </p>
            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              We take reasonable measures to protect your personal information
              from unauthorized access, disclosure, alteration, and destruction.
            </p>
          </div>

          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-black underline font-bold tracking-wider text-2xl text-center mb-4">
              Changes to This Privacy Policy
            </p>
            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              We may update this Privacy Policy periodically. The date of the
              latest revision will be indicated at the top of the page. Your
              continued use of our website constitutes your acceptance of the
              updated Privacy Policy.
            </p>
          </div>

          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-black underline font-bold tracking-wider text-2xl text-center mb-4">
              Contact Us
            </p>
            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              If you have any questions or concerns about our Privacy Policy,
              please contact us at{" "}
              <a href="mailto:hello@kinkifish.com">hello@kinkifish.com</a>
            </p>
          </div>
        </div>
      </div>
      <Subscribekinki />
      <Footer />
    </>
  );
};

export default PrivacyPolicy;

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
