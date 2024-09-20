import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import InnerImageZoom from "react-inner-image-zoom";
import Layout from "@/componentss/layouts";
import Subscribekinki from "@/MyComponents/Subscribekinki";
import MetallicDoublebikini from "../../public/assets/images/shopitems/MetallicDoublebikini.jpg";
import MetallicShorts from "../../public/assets/images/shopitems/MetallicShorts.jpg";
import Quittersneverwin from "../../public/assets/images/shopitems/Quittersneverwin.jpg";
import Fishlogoshirt from "../../public/assets/images/shopitems/Fishlogoshirt.jpg";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { AppContext } from "@/componentss/context";
import { isEmpty } from "lodash";

const CHOOSE_AN_OPTION = "Choose an option";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Page({ headerFooter }) {
  const router = useRouter();

  const [cart, setCart] = useContext(AppContext);

  const [activeTab, setActiveTab] = useState("Description");
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const [attributeOption, setAttributeOption] = useState([]);
  const [attributeIndex, setAttributeIndex] = useState([]);

  const handleAttributeChange = (e, attributeName, propIndex) => {
    if (e.target.value === CHOOSE_AN_OPTION) {
      setSelectedAttributes((prevState) => {
        const newState = { ...prevState };
        delete newState[attributeName];
        return newState;
      });
      setAttributeIndex((prevState) =>
        prevState.map((item, index) => (index === propIndex ? -1 : item))
      );
    } else {
      setSelectedAttributes({
        ...selectedAttributes,
        [attributeName]: e.target.value,
      });
      setAttributeIndex((prevState) =>
        prevState.map((item, index) =>
          index === propIndex ? e.target.selectedIndex - 1 : item
        )
      );
    }
  };

  const tabs = [
    { name: "Description", current: activeTab === "Description" },
    {
      name: "SIZE CHART",
      current: activeTab === "SIZE CHART",
    },
  ];

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    product ? product.images[0].src : ""
  );

  useEffect(() => {
    const fetchData = async () => {
      const products = JSON.parse(localStorage.getItem("productsData") || "[]");
      if (products && products.length > 0) {
        const cartData = products.find(
          (item) => item.slug === router.query.slug
        );

        localStorage.setItem("forAddToCart", JSON.stringify(cartData));

        await setProduct({ ...cartData, original_name: cartData.name });
        if (cartData && cartData.images && cartData.images.length > 0) {
          setSelectedImage(cartData.images[0].src);
        }

        if (cartData.attributes) {
          const tempOption = [];
          const tempIndex = [];
          cartData.attributes.map((item, index) => {
            tempOption.push(item.options.length);
            tempIndex.push(-1);
          });

          let i = 1;

          setAttributeOption(
            tempOption
              .reverse()
              .map((item) => {
                i *= item;
                return i / item;
              })
              .reverse()
          );
          setAttributeIndex(tempIndex);
        }

        if (router.query.slug === "customized-shirt") {
          const pinSet = JSON.parse(
            localStorage.getItem("selectedCustomizedPinSet")
          );

          if (Array.isArray(pinSet)) {
            const selectedPins = pinSet.reduce((obj, value, index) => {
              obj["Pin " + (index + 1)] = value;
              return obj;
            }, {});

            setSelectedAttributes(selectedPins);
          }

          localStorage.removeItem("selectedCustomizedPinSet");
        }
      }
    };

    fetchData();
  }, [router.query.slug]);

  const handleAddingtoCart = async (product) => {
    let variableIndex = 0;
    let productAttr = " (";
    product.attributes.map((item, index) => {
      variableIndex += attributeIndex[index] * attributeOption[index];
      if (product.attributes.length <= 1) {
        productAttr += `${item.options[attributeIndex[index]]}`;
      } else {
        productAttr += `${item.name}-${item.options[attributeIndex[index]]}`;
        if (index < product.attributes.length - 1) {
          productAttr += ", ";
        }
      }
    });
    productAttr += ")";
    if (product.slug === "customized-shirt") {
      product.id = product.variations[attributeIndex[0]];
    } else if (productAttr === " ()") {
      productAttr = "";
    } else {
      product.id = product.variations[variableIndex];
    }
    product.name += productAttr;

    product.selectedBra = selectedAttributes?.BRA;
    product.selectedBottom = selectedAttributes?.BOTTOM;
    const existingCart = JSON.parse(localStorage.getItem("forCart") || null);

    if (!isEmpty(existingCart)) {
      let existingCartItem;

      const updatedCart = existingCart.cartItems;

      if (updatedCart.length === 1 || updatedCart.length === undefined) {
        if (updatedCart.length === undefined) {
          updatedCart.push(product);
          let newCartObj = {
            cartItems: updatedCart,
            totalQty: updatedCart.length || 1,
            totalPrice: updatedCart.length * product.price,
          };

          localStorage.setItem("forCart", JSON.stringify(newCartObj));
          setCart(newCartObj);

          toast.success("Item has been added to your cart!");
          product.name = product.original_name;
        } else {
          existingCartItem = updatedCart[0].id === product.id;
          if (existingCartItem === true) {
            toast.error("This Product is already added to your cart");
            product.name = product.original_name;
          } else {
            product.stock_quantity = 1;
            product.totalPrice = parseInt(product.price);
            product.selectedBra = selectedAttributes?.BRA;
            product.selectedBottom = selectedAttributes?.BOTTOM;
            updatedCart.push(product);

            let newCartObj = {
              cartItems: updatedCart,
              totalQty: updatedCart.length || 1,
              totalPrice: updatedCart.length * product.price,
            };
            localStorage.setItem("forCart", JSON.stringify(newCartObj));
            setCart(newCartObj);

            toast.success("Item has been added to your cart!");
            product.name = product.original_name;
          }
        }
      } else {
        existingCartItem = updatedCart.find((item) => item.id === product.id);

        if (existingCartItem) {
          toast.error("This Product is already added to your cart");
          product.name = product.original_name;
        } else {
          product.stock_quantity = 1;
          product.totalPrice = parseInt(product.price);
          product.selectedBra = selectedAttributes?.BRA;
          product.selectedBottom = selectedAttributes?.BOTTOM;
          updatedCart.push(product);
          let newCartObj = {
            cartItems: updatedCart,
            totalQty: updatedCart.length || 1,
            totalPrice: updatedCart.length * product.price,
          };
          localStorage.setItem("forCart", JSON.stringify(newCartObj));
          setCart(newCartObj);

          toast.success("Item has been added to your cart!");
          product.name = product.original_name;
        }
      }
    } else {
      product.stock_quantity = 1;
      product.totalPrice = parseInt(product.price);
      product.selectedBra = selectedAttributes?.BRA;
      product.selectedBottom = selectedAttributes?.BOTTOM;
      let newCartObj = {
        cartItems: [product],
        totalQty: product.length || 1,
        totalPrice: product.stock_quantity * product.price,
      };
      localStorage.setItem("forCart", JSON.stringify(newCartObj));
      setCart(newCartObj);

      toast.success("Item has been added to your cart!");
    }
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  let isBikni = product?.categories?.find((i) => i.name === "Swimwear");
  let isShirt = product?.categories?.find((i) => i.name === "Tops");
  let isSizeChart = product?.attributes?.find((i) => i.name === "Size");

  return (
    <>
      <Layout headerFooter={headerFooter || ""}>
        <div className="container mx-auto px-2 sm:px-4 lg:px-5 py-8">
          <div className="border-r border-r-[#dddddd] md:pr-[60px] w-full md:w-[70%] my-4">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              {/* image part */}
              <div className="flex flex-col">
                <div className="mb-[15px]">
                  <InnerImageZoom
                    src={selectedImage}
                    hasSpacer={true}
                    zoomSrc={selectedImage}
                    zoomType="hover"
                    zoomPreload={true}
                    fullscreenOnMobile={true}
                  />
                </div>
                {/* other image */}
                <div className="flex items-center flex-wrap gap-[15px]">
                  {product &&
                    product?.images.map((item) => (
                      <img
                        src={item.src}
                        onClick={() => handleImageClick(item.src)}
                        className="w-[calc(25%-0.75em)] h-[87px] cursor-pointer"
                        style={{
                          opacity: selectedImage === item.src ? "1" : ".4",
                        }}
                      />
                    ))}
                </div>
              </div>
              {/* form part */}
              <div>
                <h1 className="my-[15px] text-[2rem] leading-[1.2] text-[#3a3a3a]">
                  {product?.original_name}
                </h1>
                <p className="text-[#4B4F58] text-[1.5rem] font-bold">
                  $
                  {product != null
                    ? Number(product.price).toFixed(2)
                    : "Loading.."}
                </p>

                {product?.attributes?.map((item, index) => (
                  <div className="mt-4" key={index}>
                    <label
                      htmlFor={item?.name}
                      className="block font-bold !leading-[2em] text-gray-600"
                    >
                      {item?.name}
                    </label>
                    <select
                      id={item?.name}
                      name={item?.name}
                      className="mt-2 block w-full rounded-md border-0 py-4 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-gray-300 text-[1rem]"
                      value={selectedAttributes[item?.name] || ""}
                      onChange={(e) =>
                        handleAttributeChange(e, item?.name, index)
                      }
                    >
                      <option>{CHOOSE_AN_OPTION}</option>
                      {item.options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                <button
                  type="button"
                  className={`py-[10px] px-[20px] border border-[#323232] font-semibold bg-[#000000] hover:bg-[#3a3a3a] mt-4 text-white  ${
                    Object.keys(selectedAttributes).length <
                      (product ? product.attributes.length : 0) ||
                    product?.stock_status !== "instock"
                      ? "cursor-not-allowed"
                      : ""
                  }`}
                  disabled={
                    Object.keys(selectedAttributes).length <
                      (product ? product.attributes.length : 0) ||
                    product?.stock_status !== "instock"
                  }
                  onClick={() => handleAddingtoCart(product)}
                >
                  Add to Cart
                </button>

                {/* avbail */}
                <p className="font-bold text-[1em] mt-4">
                  Availability:{" "}
                  <span
                    className={`${
                      product?.stock_status === "instock"
                        ? "text-[#77a464]"
                        : "text-red-400"
                    } font-normal`}
                  >
                    {product?.stock_status === "instock"
                      ? "In Stock"
                      : "Out Of Stock"}
                  </span>
                </p>

                {/* divider */}
              </div>
            </div>

            {/* below */}
            <div className="tabs- mt-24">
              <div className="">
                <div className="border-t border-gray-200">
                  <nav className="-mt-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        className={classNames(
                          tab.current
                            ? "border-black"
                            : "border-transparent hover:border-gray-300",
                          "whitespace-nowrap border-t-4 py-4 px-1 text-sm cursor-pointer font-bold text-[#515151]"
                        )}
                        onClick={() => handleTabClick(tab.name)}
                      >
                        {tab.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              {/* tab content */}
              {activeTab === "Description" && (
                <p
                  className="text-gray-500 space-y-5 mt-3"
                  dangerouslySetInnerHTML={{
                    __html: product?.description ?? "",
                  }}
                />
              )}
              {activeTab === "SIZE CHART" && (
                <div>
                  {isBikni && (
                    <>
                      <div className="flex items-center border border-gray-300">
                        <p className="border-r p-3 w-32">BRA</p>
                        <p className="p-3">
                          {product?.attributes?.[0]?.options.map(
                            (item, index) => (
                              <span key={index}>
                                {item}
                                {index <
                                  product.attributes[0].options.length - 1 &&
                                  ", "}
                              </span>
                            )
                          )}
                        </p>
                      </div>
                      <div className="flex items-center border-r border-l border-b border-gray-300">
                        <p className="border-r p-3 w-32">BOTTOM</p>
                        <p className="p-3">
                          {product?.attributes?.[0]?.options.map(
                            (item, index) => (
                              <span key={index}>
                                {item}
                                {index <
                                  product.attributes[0].options.length - 1 &&
                                  ", "}
                              </span>
                            )
                          )}
                        </p>
                      </div>
                      {isSizeChart && (
                        <div className="flex items-center border-l border-r border-b border-gray-300">
                          <p className="border-r p-3 w-32">SIZE CHART</p>
                          <p className="p-3">
                            {isSizeChart.options.map((item, index) => (
                              <span key={index}>
                                {item}
                                {index < isSizeChart.options.length - 1 && (
                                  <br />
                                )}
                              </span>
                            ))}
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {isShirt && (
                    <>
                      <div className="flex items-center border border-gray-300">
                        <p className="border-r p-3 w-32">size</p>
                        <p className="p-3">
                          {product?.attributes?.[0]?.options.map(
                            (item, index) => (
                              <span key={index}>
                                {item}
                                {index <
                                  product.attributes[0].options.length - 1 &&
                                  ", "}
                              </span>
                            )
                          )}
                        </p>
                      </div>
                      {isSizeChart && (
                        <div className="flex items-center border-l border-r border-b border-gray-300">
                          <p className="border-r p-3 w-32">SIZE CHART</p>
                          <p className="p-3">
                            {isSizeChart.options.map((item, index) => (
                              <span key={index}>
                                {item}
                                {index < isSizeChart.options.length - 1 && (
                                  <br />
                                )}
                              </span>
                            ))}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* related products */}
            <h2 className="text-[1.5rem] mt-6">Related Products</h2>
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
          </div>
        </div>

        <Subscribekinki />
      </Layout>
    </>
  );
}

export const shopItems = [
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

export async function getStaticPaths() {
  try {
    const { data: products } = await axios.get(
      `https://kinkifish.com/api/get-products`
    );

    const paths = products.map((product) => ({
      params: { slug: product.slug },
    }));

    return { paths, fallback: "blocking" };
  } catch (error) {
    console.error("An error occured while fetching products", error);
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps({}) {
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
