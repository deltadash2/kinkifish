import React, { useEffect, useState, useContext } from "react";
import Layout from "@/componentss/layouts";
import axios from "axios";
import Link from "next/link";
import MyImage from "@/MyComponents/MyImage";
import { AppContext } from "@/componentss/context";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";

const validateCurrentCart = (currentCart) => {
  const updatedCartItems = [];
  let updatedTotalPrice = 0;
  let updatedTotalQty = 0;
  currentCart.cartItems.map((item) => {
    if (item.id) {
      updatedCartItems.push(item);
      updatedTotalPrice += item.stock_quantity * item.totalPrice;
      updatedTotalQty += 1;
    }
  });
  return {
    cartItems: updatedCartItems,
    totalPrice: updatedTotalPrice,
    totalQty: updatedTotalQty,
  };
};

const MyCart = ({ headerFooter }) => {
  const [myCart, setMyCart] = useState([]);
  const [finalCost, setFinalCost] = useState(0);
  const [MyProducts, setMyProducts] = useState([]);

  const [cart, setCart] = useContext(AppContext);

  useEffect(() => {
    const existingCart = localStorage.getItem("forCart");

    if (existingCart) {
      const existingCartItems = JSON.parse(existingCart);
      const validCartItems = validateCurrentCart(existingCartItems);
      localStorage.setItem("forCart", JSON.stringify(validCartItems));
      setMyCart(validCartItems);
      setMyProducts(validCartItems.cartItems);
    } else {
      setMyCart([]);
    }
  }, []);

  const removeItemFromCart = (itemIndex) => {
    const updatedCart = [...MyProducts];
    updatedCart.splice(itemIndex, 1);

    let newCartObj = {
      cartItems: updatedCart,
      totalQty: updatedCart.length || 0, // Update the totalQty accordingly
      totalPrice: 0, // Reset totalPrice or recalculate it if needed
    };

    setMyProducts(updatedCart); // Update MyProducts state with the modified cart
    setMyCart(newCartObj);
    localStorage.setItem("forCart", JSON.stringify(newCartObj));
  };

  const addQuantity = (itemIndex) => {
    const updatedCart = [...MyProducts];
    updatedCart[itemIndex].stock_quantity += 1;
    updatedCart[itemIndex].totalPrice =
      updatedCart[itemIndex].stock_quantity * updatedCart[itemIndex].price;

    const totalPrice = updatedCart.reduce(
      (total, product) => total + product.totalPrice,
      0
    );

    if (totalPrice) {
      let newCartObj = {
        cartItems: updatedCart,
        totalQty: updatedCart.length || 1,
        totalPrice: totalPrice,
      };
      setMyCart(newCartObj);
      localStorage.setItem("forCart", JSON.stringify(myCart));
    }
  };

  const subtractQuantity = (itemIndex) => {
    const updatedCart = [...MyProducts];
    if (updatedCart[itemIndex].stock_quantity > 1) {
      updatedCart[itemIndex].stock_quantity -= 1;
      updatedCart[itemIndex].totalPrice =
        updatedCart[itemIndex].stock_quantity * updatedCart[itemIndex].price;

      let newCartObj = {
        cartItems: updatedCart,
        totalQty: updatedCart.length || 1,
        totalPrice: 0,
      };
      setMyCart(newCartObj);
      localStorage.setItem("forCart", JSON.stringify(myCart));
    } else {
      removeItemFromCart(itemIndex);
      let newCartObj = {
        cartItems: updatedCart.filter((item, index) => index !== itemIndex),
        totalQty: updatedCart.length - 1 || 0,
        totalPrice: 0,
      };
      setCart(newCartObj);
      toast.success("Item has been removed from the cart!");
    }
  };

  useEffect(() => {
    const calculateTotalCost = () => {
      let total = 0;
      MyProducts?.forEach((item) => {
        if (item.totalPrice && !isNaN(parseFloat(item.totalPrice))) {
          total += parseFloat(item.totalPrice);
        }
      });

      return total;
    };
    setFinalCost(calculateTotalCost());
  }, [myCart]);

  return (
    <>
      <Layout headerFooter={headerFooter || ""}>
        <div className="w-full py-20 overflow-hidden px-5">
          <div className="container mx-auto mt-10">
            <div className="flex flex-wrap shadow-md my-10">
              <div className="lg:w-3/4 w-full bg-white px-2 lg:px-10 py-10 md:overflow-hidden overflow-x-auto">
                <div className="flex justify-between border-b pb-8">
                  <p className="font-semibold text-lg lg:text-2xl">
                    Shopping Cart
                  </p>
                  <p className="font-semibold text-lg lg:text-2xl">
                    {!isEmpty(MyProducts) ? MyProducts.length : 0} Items
                  </p>
                </div>
                <table className="w-full text-left mt-8 min-w-[350px]">
                  <thead>
                    <tr>
                      <th className="w-72 pb-6 pr-3">
                        <p className="font-semibold text-gray-600 text-xs uppercase">
                          Product Details
                        </p>
                      </th>
                      <th className="pb-6 pr-3">
                        <p className="font-semibold text-gray-600 text-xs uppercase text-center">
                          Quantity
                        </p>
                      </th>
                      <th className="pb-6 pr-3">
                        <p className="font-semibold text-gray-600 text-xs uppercase">
                          Price
                        </p>
                      </th>
                      <th className="pb-6">
                        <p className="font-semibold text-gray-600 text-xs uppercase w-1/5">
                          Total
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isEmpty(MyProducts) &&
                      MyProducts.map((shopItems, index) => (
                        <tr
                          className="hover:bg-gray-100 rounded-xl"
                          key={index}
                        >
                          <td className="pr-3">
                            {" "}
                            <div className="flex">
                              <div className="w-20 flex-none">
                                <MyImage
                                  className="h-24"
                                  sourceUrl={shopItems.images[0].src}
                                  altText="Empty Image"
                                  width={96}
                                  height={96}
                                />
                              </div>
                              <div className="flex flex-col justify-center items-start ml-4 flex-grow">
                                <span className="font-bold text-sm pb-3">
                                  {shopItems.name}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="pr-3">
                            <div className="flex justify-center">
                              <svg
                                className="fill-current text-gray-600 w-3 cursor-pointer"
                                viewBox="0 0 448 512"
                                onClick={() => subtractQuantity(index)}
                              >
                                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                              </svg>

                              <input
                                className="mx-2 border text-center w-12"
                                type="text"
                                readOnly
                                value={shopItems.stock_quantity}
                              />
                              <svg
                                className="fill-current text-gray-600 w-3 cursor-pointer"
                                viewBox="0 0 448 512"
                                onClick={() => addQuantity(index)}
                              >
                                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                              </svg>
                            </div>
                          </td>
                          <td className="pr-3">
                            <span className="font-semibold text-sm">
                              ${Number(shopItems.price).toFixed(2)}
                            </span>
                          </td>
                          <td>
                            <span className="font-semibold text-sm">
                              $
                              {Number(
                                shopItems.totalPrice
                                  ? shopItems.totalPrice
                                  : shopItems.price
                              ).toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <Link href="/Shop">
                  <button className="flex font-semibold text-black text-sm mt-10">
                    <svg
                      className="fill-current mr-2 text-black w-4"
                      viewBox="0 0 448 512"
                    >
                      <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                    </svg>
                    Continue Shopping
                  </button>
                </Link>
              </div>

              <div id="summary" className="lg:w-1/4 w-full px-8 py-10">
                <p className="font-semibold text-lg lg:ext-2xl border-b pb-8 whitespace-nowrap">
                  Order Summary
                </p>
                <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm uppercase">
                    Items: {myCart.length}
                  </span>
                  <span className="font-semibold text-sm">
                    {!isEmpty(MyProducts) ? MyProducts.length : 0}
                  </span>
                </div>

                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span>${finalCost != 0 ? finalCost.toFixed(2) : ""}</span>
                  </div>
                  <button className="bg-gray-900 font-semibold hover:bg-black py-3 text-sm text-white uppercase w-full">
                    <Link className="text-sm" href="/Checkout">
                      Proceed To Checkout
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default MyCart;

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
