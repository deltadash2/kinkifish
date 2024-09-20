import React, { useContext, useState } from "react";
import { AppContext } from "@/componentss/context";
import Link from "next/link";
import CartItem from "./cart-item";
import { clearCart } from "@/Utils";

const CartItemsContainer = () => {
  const [cart, setCart] = useContext(AppContext);
  const { cartItems, totalPrice, totalQty } = cart || {};
  const [isClearCartProcessing, setClearCartProcessing] = useState(false);

  // Clear the entire cart.
  const handleClearCart = async (event) => {
    event.stopPropagation();

    if (isClearCartProcessing) {
      return;
    }

    await clearCart(setCart, setClearCartProcessing);
  };

  return (
    <div className="flex shadow-md my-10">
      <div className="w-3/4 bg-white px-10 py-10">
        <div className="flex justify-between border-b pb-8">
          <p className="font-semibold text-2xl">Shopping Cart</p>
          <p className="font-semibold text-2xl">4 Items</p>
        </div>
        <div className="flex mt-10 mb-5">
          <p className="font-semibold text-gray-600 text-xs uppercase w-2/5">
            Product Details
          </p>
          <p className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
            Quantity
          </p>
          <p className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
            Price
          </p>
          <p className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
            Total
          </p>
        </div>

        {/* {myCart.map((shopItems, index) => {
                return ( */}
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 rounded-xl">
          <div className="flex w-2/5">
            {/* <!-- product --> */}
            <div className="w-20">
              <img className="h-24" src="" alt="Empty Image" />
            </div>
            <div className="flex flex-col justify-center items-start ml-4 flex-grow">
              <span className="font-bold text-sm pb-3">Here is slug</span>
              {/* <span className="text-red-500 text-xs">Apple</span> */}
              <button className="font-semibold hover:text-red-500 text-gray-500 text-xs">
                Remove Item
              </button>
            </div>
          </div>
          <div className="flex justify-center w-1/5">
            {/* Substract quantity icon */}
            <svg
              className="fill-current text-gray-600 w-3 cursor-pointer"
              viewBox="0 0 448 512"
            >
              <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>

            <input
              className="mx-2 border text-center w-8"
              type="text"
              readOnly
              value={1}
            />

            {/* Add Quantity Icon */}
            <svg
              className="fill-current text-gray-600 w-3 cursor-pointer"
              viewBox="0 0 448 512"
            >
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">65</span>
          <span className="text-center w-1/5 font-semibold text-sm">130</span>
        </div>

        {/*Cart Items*/}
        {cart ? (
          <div className="woo-next-cart-table lg:col-span-2 mb-md-0 mb-5">
            {cartItems.length ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.product_id}
                  item={item}
                  products={cartItems}
                  setCart={setCart}
                />
              ))
            ) : (
              <CartItem item={1} />
            )}
          </div>
        ) : (
          ""
        )}

        {/*Cart Total*/}

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

      <div id="summary" className="w-1/4 px-8 py-10">
        <p className="font-semibold text-2xl border-b pb-8">Order Summary</p>
        <div className="flex justify-between mt-10 mb-5">
          <span className="font-semibold text-sm uppercase">Items: 1</span>
          <span className="font-semibold text-sm">$4</span>
        </div>
        <div>
          <label className="font-medium inline-block mb-3 text-sm uppercase">
            Shipping
          </label>
          <select className="block p-2 text-gray-600 w-full text-sm">
            <option>Standard shipping - $10.00</option>
          </select>
        </div>

        <div className="border-t mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>$200</span>
          </div>
          <button className="bg-gray-900 font-semibold hover:bg-black py-3 text-sm text-white uppercase w-full">
            <Link href="/Checkout">Checkout</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemsContainer;
