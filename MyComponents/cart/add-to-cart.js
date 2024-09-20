import React, { useContext, useState } from "react";
import { isEmpty } from "lodash";
import { addToCart } from "@/Utils";
import { AppContext } from "../../componentss/context";
import cx from "classnames";
import Link from "next/link";

const AddToCart = ({ product }) => {
  const [cart, setCart] = useContext(AppContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const addToCartBtnClasses = cx({
    "bg-white hover:bg-gray-100": !loading,
    "bg-gray-200": loading,
  });

  if (isEmpty(product)) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="px-6 font-semibold rounded-xl mx-auto"
        onClick={() =>
          addToCart(product.id ?? 0, 1, setCart, setIsAddedToCart, setLoading)
        }
        disabled={loading}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
      {isAddedToCart && !loading ? (
        <Link href="/MyCart">
          <button className="ml-2 px-6 font-semibold rounded-xl mx-auto">
            View Cart
          </button>
        </Link>
      ) : null}
    </>
  );
};

export default AddToCart;
