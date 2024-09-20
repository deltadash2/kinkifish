import React from "react";
import Header from "@/MyComponents/Header";
import Footer from "@/MyComponents/Footer";
import Subscribekinki from "@/MyComponents/Subscribekinki";
import axios from "axios";

const Terms = ({ headerFooter }) => {
  return (
    <>
      <Header header={headerFooter} />
      <div className="w-full py-16">
        <div className="mt-12">
          <div className="flex flex-col justify-center items-center">
            <p className="uppercase text-3xl font-normal pb-4">
              Website Terms and Conditions of Use
            </p>
            <div className="w-20 border-t-2 border-t-gray-800"></div>
          </div>

          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-black underline font-bold tracking-wider text-2xl text-center mb-4">
              1. Terms
            </p>

            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              By accessing this Website, accessible from https://kinkifish.com/,
              you are agreeing to be bound by these Website Terms and Conditions
              of Use and agree that you are responsible for the agreement with
              any applicable local laws. If you disagree with any of these
              terms, you are prohibited from accessing this site. The materials
              contained in this Website are protected by copyright and trade
              mark law.
            </p>
          </div>

          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-black underline font-bold tracking-wider text-2xl text-center mb-4">
              2. Use License
            </p>

            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              Permission is granted to temporarily download one copy of the
              materials on kinkifish's Website for personal, non-commercial
              transitory viewing only. This is the grant of a license, not a
              transfer of title, and under this license you may not: <br />
              - modify or copy the materials; <br /> -use the materials for any
              commercial purpose or for any public display; <br /> -attempt to
              reverse engineer any software contained on kinkifish's Website;
              <br /> - remove any copyright or other proprietary notations from
              the materials; <br /> - or transferring the materials to another
              person or "mirror" the materials on any other server.
            </p>
          </div>

          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-black underline font-bold tracking-wider text-2xl text-center mb-4">
              3. Disclaimer
            </p>

            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              All the materials on kinkifish's Website are provided "as is".
              kinkifish makes no warranties, may it be expressed or implied,
              therefore negates all other warranties. Furthermore, kinkifish
              does not make any representations concerning the accuracy or
              reliability of the use of the materials on its Website or
              otherwise relating to such materials or any sites linked to this
              Website.
            </p>
          </div>

          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-black underline font-bold tracking-wider text-2xl text-center mb-4">
              4. Limitations
            </p>

            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              kinkifish or its suppliers will not be hold accountable for any
              damages that will arise with the use or inability to use the
              materials on kinkifish's Website, even if kinkifish or an
              authorize representative of this Website has been notified, orally
              or written, of the possibility of such damage. Some jurisdiction
              does not allow limitations on implied warranties or limitations of
              liability for incidental damages, these limitations may not apply
              to you.
            </p>
          </div>

          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-black underline font-bold tracking-wider text-2xl text-center mb-4">
              5. Revisions and Errata
            </p>

            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              The materials appearing on kinkifish's Website may include
              technical, typographical, or photographic errors. kinkifish will
              not promise that any of the materials in this Website are
              accurate, complete, or current. kinkifish may change the materials
              contained on its Website at any time without notice. kinkifish
              does not make any commitment to update the materials.
            </p>
          </div>

          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-black underline font-bold tracking-wider text-2xl text-center mb-4">
              6. Links
            </p>

            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              kinkifish has not reviewed all of the sites linked to its Website
              and is not responsible for the contents of any such linked site.
              The presence of any link does not imply endorsement by kinkifish
              of the site. The use of any linked website is at the user's own
              risk.
            </p>
          </div>

          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-black underline font-bold tracking-wider text-2xl text-center mb-4">
              7. Site Terms of Use Modifications
            </p>

            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              kinkifish may revise these Terms of Use for its Website at any
              time without prior notice. By using this Website, you are agreeing
              to be bound by the current version of these Terms and Conditions
              of Use.
            </p>
          </div>

          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-black underline font-bold tracking-wider text-2xl text-center mb-4">
              8. Your Privacy
            </p>

            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              Please read our Privacy Policy.
            </p>
          </div>

          <div className="text-center flex flex-col justify-center items-center mt-12">
            <p className="w-2/4 mx-auto text-black underline font-bold tracking-wider text-2xl text-center mb-4">
              9. Governing Law
            </p>

            <p className="w-2/4 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
              Any claim related to kinkifish's Website shall be governed by the
              laws of us without regards to its conflict of law provisions.
            </p>
          </div>
        </div>
      </div>
      <Subscribekinki />
      <Footer />
    </>
  );
};

export default Terms;

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
