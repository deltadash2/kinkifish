import CheckoutCartItem from "./checkout-cart-item";
import { Fragment } from "react";

const YourOrder = ({ cart, shippingCost }) => {
  let totalPrice = cart?.cartItems?.reduce(
    (total, product) => total + product.totalPrice,
    0
  );

  return (
    <>
      {cart ? (
        <Fragment>
          {/*Product Listing*/}
          <table className="checkout-cart table table-hover w-full mb-10">
            <thead>
              <tr className="woo-next-cart-head-container text-left">
                <th className="woo-next-cart-heading-el" scope="col" />
                <th className="woo-next-cart-heading-el" scope="col">
                  Product
                </th>
                <th className="woo-next-cart-heading-el text-right" scope="col">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {cart?.cartItems?.length &&
                cart.cartItems.map((item, index) => (
                  <CheckoutCartItem
                    key={item?.productId ?? index}
                    item={item}
                  />
                ))}
              {/*Total*/}
              <tr className="bg-gray-200">
                <td className="" />
                <td className="woo-next-checkout-total font-medium">
                  Subtotal
                </td>
                <td className="woo-next-checkout-total font-medium text-right">
                  ${Number(totalPrice).toFixed(2) ?? ""}
                </td>
              </tr>
              <div className="h-2"></div>
              <tr>
                <td className="" />
                <td className="woo-next-checkout-total font-medium">
                  Shipping
                </td>
                <td className="woo-next-checkout-total text-right">
                  ${shippingCost ?? ""}
                </td>
              </tr>
              <div className="h-2"></div>
              <tr className="bg-gray-200">
                <td className="" />
                <td className="woo-next-checkout-total font-medium text-xl">
                  Total
                </td>
                <td className="woo-next-checkout-total font-bold text-xl text-right">
                  {/* {cart?.cartItems?.[0]?.currency ?? ""} */}$
                  {(Number(totalPrice) + Number(shippingCost)).toFixed(2) ?? ""}
                </td>
              </tr>
            </tbody>
          </table>
        </Fragment>
      ) : (
        ""
      )}
    </>
  );
};

export default YourOrder;
