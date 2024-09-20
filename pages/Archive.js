import Layout from "@/componentss/layouts";
import React from "react";
import Image from "next/image";
import Header from "@/MyComponents/Header";
import Footer from "@/MyComponents/Footer";
import MetallicDoublebikini from "../public/assets/images/shopitems/MetallicDoublebikini.jpg";
import MetallicShorts from "../public/assets/images/shopitems/MetallicShorts.jpg";
import Quittersneverwin from "../public/assets/images/shopitems/Quittersneverwin.jpg";
import Fishlogoshirt from "../public/assets/images/shopitems/Fishlogoshirt.jpg";
import Subscribekinki from "@/MyComponents/Subscribekinki";
import axios from "axios";

const Archive = ({ headerFooter }) => {
  const shopItems = [
    {
      id: 1,
      slug: "Acid_Spill_Metallic_Shorts",
      title: "Acid Spill Metallic Shorts",
      desc: "Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae exercitationem porro saepe ea harum corrupti vero id laudantium enim, libero blanditiis expedita cupiditate a est.",
      image: MetallicShorts,
      price: 150,
      totalprice: 150,
    },
    {
      id: 2,
      slug: "Two-Tone_Metallic_Double_Bottom_Bikini_Set",
      title: "Two-Tone Metallic Double Bottom Bikini Set",
      desc: "Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae exercitationem porro saepe ea harum corrupti vero id laudantium enim, libero blanditiis expedita cupiditate a est.",
      image: MetallicDoublebikini,
      price: 150,
      totalprice: 150,
    },
    {
      id: 3,
      slug: "Quitters_never_win",
      title: "Quitters never win",
      desc: "Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae exercitationem porro saepe ea harum corrupti vero id laudantium enim, libero blanditiis expedita cupiditate a est.",
      image: Quittersneverwin,
      price: 120,
      totalprice: 120,
    },
    {
      id: 4,
      slug: "FISH_LOGO_SHIRT",
      title: "FISH LOGO SHIRT",
      desc: "Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae exercitationem porro saepe ea harum corrupti vero id laudantium enim, libero blanditiis expedita cupiditate a est.",
      image: Fishlogoshirt,
      price: 60,
      totalprice: 60,
    },
  ];

  return (
    <>
      <Layout headerFooter={headerFooter || ""}>
        <div className="w-full px-3 py-32 overflow-hidden">
          <div className="bg-cover bg-center bg-fixed w-full 2xl:h-[50rem] xl:h-[45rem] lg:h-[40rem] max-h-screen relative overflow-hidden mb-3">
            <video
              muted
              controls
              className="mx-auto w-full object-fill lg:h-full"
              src="https://www.dropbox.com/scl/fi/fp2zeyybjfubby1rzilo1/Baby-tee-collection-campaign-video.mp4?rlkey=xtmevwkf7dwsyr5o87cwhke5p&raw=1"
            ></video>
          </div>
          <div className="bg-cover bg-center bg-fixed w-full 2xl:h-[50rem] xl:h-[45rem] lg:h-[40rem] max-h-screen relative overflow-hidden mb-3">
            <video
              muted
              controls
              className="mx-auto w-full object-fill lg:h-full"
              src="https://www.dropbox.com/scl/fi/n7l8m2rvuzupqghj3j7cg/bikini-video-main-2.MOV?rlkey=wvln60b3glohg25rcf8d9bg2d&raw=1"
            ></video>
          </div>
          <div className="bg-cover bg-center bg-fixed w-full 2xl:h-[50rem] xl:h-[45rem] lg:h-[40rem] max-h-screen relative overflow-hidden mb-3">
            <video
              muted
              controls
              className="mx-auto w-full object-fill lg:h-full"
              src="https://www.dropbox.com/scl/fi/fsa46utrmakyoi20bbhu2/kink-fish_Animation-Final.mp4?rlkey=nvm0bxtw8dl1p0h58bia9ufor&raw=1"
            ></video>
          </div>
          {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <p className="uppercase text-3xl font-bold text-center pt-14">
                Summer Arrival
              </p>
            </div>
            <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-12 pb-12">
              {shopItems.map((shopItems) => {
                return (
                  <button
                    className="bg-white cursor-pointer border-2 border-transparent rounded-xl duration-300 hover:border-gray-800"
                    key={shopItems.id}
                  >
                    <Image
                      src={shopItems.image}
                      height={370}
                      alt={shopItems.slug}
                    />
                    <div className="flex items-center justify-center mt-3">
                      <div>
                        <p className="font-semibold text-center">
                          {shopItems.title}
                        </p>
                        <p className="text-center font-semibold pb-3">
                          ${shopItems.price}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div> */}
        </div>
        <Subscribekinki />
      </Layout>
    </>
  );
};

export default Archive;

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
