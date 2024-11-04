import NewTop from "@/MyComponents/NewTop";
import Customizae from "@/MyComponents/Customizae";
import Newcollections from "@/MyComponents/Newcollections";
import Followinstagram from "@/MyComponents/Followinstagram";
import Followtiktok from "@/MyComponents/Followtiktok";
import Subscribekinki from "@/MyComponents/Subscribekinki";
import Productsbadgecustomizer from "@/MyComponents/Productsbadgecustomizer";
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { MultiBackend } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import Layout from "@/componentss/layouts";
import axios from "axios";
import { isEmpty } from "lodash";

export default function Home({ headerFooter, products }) {
  let reload = false;

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    reload = true;
    return () => {
      reload = false;
    };
  }, []);

  return (
    <Layout headerFooter={headerFooter}>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <Productsbadgecustomizer
          customizedProduct={
            !isEmpty(products)
              ? products.find((item) => item.slug === "customized-shirt")
              : {}
          }
        />
        <Newcollections products={products} />
        <Customizae />
        <div className="pt-24 pb-12 flex justify-evenly">
          <Followinstagram />
          <Followtiktok />
        </div>
        <Subscribekinki />
      </DndProvider>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const { data: headerFooterData } = await axios.get(
      `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer`
    );
    const { data: productsData } = await axios.get(
      `https://kinkifish.com/api/get-products`
    );

    return {
      props: {
        headerFooter: headerFooterData.data ?? {},
        products: productsData.products ?? {},
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error("An error occured while fetching data from server", error);
    return {
      props: {
        headerFooter: "Not found",
        products: 0,
      },
    };
  }
}
