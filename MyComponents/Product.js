import React from "react";
import Link from "next/link";
import MyImage from "@/MyComponents/MyImage";
import { isEmpty } from "lodash";

const Product = ({ product, i, publishedCnt }) => {
  if (isEmpty(product)) {
    return null;
  }

  const handleAddingtoCart = (product) => {
    localStorage.setItem("forAddToCart", JSON.stringify(product));
  };

  return (
    <Link href={`/product/${product?.slug}`}>
      <div
        className="bg-white cursor-pointer border-2 border-transparent rounded-xl duration-300 hover:border-gray-800 text-center"
        onClick={() => handleAddingtoCart(product)}
      >
        <div className="min-h-[330px] flex flex-col">
          <MyImage
            sourceUrl={product?.images[0].src ?? ""}
            altText={product?.images[0].alt ?? ""}
            width={250}
            height={370}
            className="mx-auto min-h-[225px]"
          />
          <div className={`flex items-center justify-center mt-4`}>
            <div>
              <p className="font-semibold text-center">
                {product?.name ?? "Product name here..."}
              </p>
              {(product.stock_status === "instock" ||
                i < publishedCnt - 10) && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: product?.price_html ?? "",
                  }}
                  className="text-center font-semibold pb-3"
                />
              )}
              {product.stock_status === "outofstock" && (
                <p className="font-semibold text-center text-red-500 pb-3">
                  OUT OF STOCK
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
