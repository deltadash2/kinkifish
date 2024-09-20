import MyImage from "../MyImage";
import { isEmpty } from "lodash";

const CheckoutCartItem = ({ item }) => {
  const productImg = item?.data?.images?.[0] ?? "";

  return (
    <>
      <tr className="woo-next-cart-item" key={item?.productId ?? ""}>
        <td className="woo-next-cart-element">
          <figure className="w-16 flex-none">
            <MyImage
              width={61}
              height={96}
              altText={productImg?.alt ?? ""}
              sourceUrl={!isEmpty(item.images[0].src) ? item.images[0].src : ""} // use normal <img> attributes as props
            />
          </figure>
        </td>
        <td className="woo-next-cart-element pr-2">{item.name ?? ""}</td>
        {/* <td className="woo-next-cart-element">{item.currency ?? ''}{item.line_subtotal ?? ''}</td> */}
        <td className="woo-next-cart-element text-right">
          ${Number(item.totalPrice).toFixed(2)}
        </td>
      </tr>
      <div className="h-2"></div>
    </>
  );
};

export default CheckoutCartItem;
