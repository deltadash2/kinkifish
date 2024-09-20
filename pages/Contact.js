import React from "react";
import Image from "next/image";
import Header from "@/MyComponents/Header";
import Footer from "@/MyComponents/Footer";
import logo from "../public/assets/images/b02c1f10b5a65fb8c8cc58ae1c0a7231.png";
import Subscribekinki from "@/MyComponents/Subscribekinki";
import axios from "axios";

const Contact = ({ headerFooter }) => {
  return (
    <>
      <Header header={headerFooter} />
      <div className="w-full py-16">
        <div className="">
          <div className="flex flex-col justify-center items-center">
            <p className="uppercase text-3xl font-normal pb-4">Contact Us</p>
            <div className="w-20 border-t-2 border-t-gray-800"></div>
          </div>
        </div>
        <div className="flex 2xl:flex-row xl lg::flex-row md:flex-row flex-col justify-center items-center container mx-8 pt-12">
          <div className="2x:w-1/2 xl:w-1/2 lg:w-1/2 md:w-full w-full flex flex-col justify-center items-center py-12">
            <Image
              src={logo}
              className="max-h-[81px] 2xl:ml-28 xl:ml-0"
              height={90}
              alt="LogoImg"
            />
            <Image
              src={logo}
              className="max-h-[81px] 2xl:ml-28 xl:ml-0 opacity-60"
              height={90}
              alt="LogoImg"
            />
          </div>
          <div className="2x:w-1/2 xl:w-1/2 lg:w-1/2 md:w-full w-full border-l-2 border-l-gray-800">
            <div className="flex flex-col justify-center items-start pl-20 mb-7">
              <p className="uppercase text-2xl font-normal pb-2">
                CUSTOMER SERVICE
              </p>
              <div className="w-16 border-t border-t-gray-800"></div>
            </div>
            <div className="w-full 2xl:pl-20 xl:pl-20 lg:pl-20 md:pl-20 pl-1 grid grid-cols-2 gap-5 px-3">
              <input
                type="text"
                placeholder="Name"
                className="rounded-full bg-gray-100 text-black outline-none px-3 py-3"
              />
              <input
                type="email"
                placeholder="Email"
                className="rounded-full bg-gray-100 text-black outline-none px-3 py-3"
              />
              <textarea
                type="text"
                placeholder="Message"
                className="rounded-full bg-gray-100 text-black outline-none px-3 py-3 col-span-2"
              />
              <button className="rounded-full bg-black text-white font-semibold uppercase tracking-widest px-2 py-2 w-auto">
                Submit
              </button>
            </div>
          </div>
          <div></div>
        </div>
        <div className="pt-16 pb-8">
          <div className="flex flex-col justify-center items-center">
            <p className="uppercase text-2xl font-normal pb-2">
              PRESS & PR INQUIRIES
            </p>
            <div className="w-16 border-t-2 border-t-gray-800"></div>
          </div>
          <div className="text-center py-7">
            <span className="font-bold">contactus@kinkifish.com</span>
          </div>
        </div>

        <div className="pb-8">
          <div className="flex flex-col justify-center items-center">
            <p className="uppercase text-2xl font-normal pb-2">
              CUSTOMER SERVICE MAIL
            </p>
            <div className="w-16 border-t-2 border-t-gray-800"></div>
          </div>
          <div className="text-center py-7">
            <span className="font-bold">contactus@kinkifish.com</span>
          </div>
        </div>

        <div className="text-center flex flex-col justify-center items-center">
          <p className="w-96 mx-auto text-gray-900 font-normal tracking-wider text-center mb-4">
            For all customer service inquiries, including returns and exchanges
          </p>
          <p className="w-96 mx-auto text-gray-900 font-normal tracking-wider text-center">
            For all customer service inquiries, including returns and exchanges
          </p>
        </div>
      </div>
      <Subscribekinki />
      <Footer />
    </>
  );
};

export default Contact;

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
