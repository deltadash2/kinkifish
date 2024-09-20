import Error from "./errors";
import { useEffect } from "react";
import paypalIcon from "public/assets/PayPal.svg";

const PaymentModes = ({ input, handleOnChange, onClick, handleFormSubmit }) => {
  const { errors, paymentMethod } = input || {};

  return (
    <div className="mt-3">
      <Error errors={errors} fieldName={"paymentMethod"} />

      <div className="form-check woo-next-payment-input-container mt-2 cursor-pointe md:w-1/3 w-full">
        <button className="bg-gray-900 font-semibold hover:bg-black py-3 text-sm text-white uppercase w-full">
          Proceed To Payment
        </button>
        <input
          onChange={handleOnChange}
          value="stripe"
          className="form-check-input mr-3 opacity-0"
          name="paymentMethod"
          type="radio"
          checked={"stripe" === paymentMethod}
        />
      </div>

      {/* <div className="flex items-center gap-5">
        <label className="form-check-label">
          <div className="form-check woo-next-payment-input-container mt-2">
            <img src="../assets/PayPal.svg" alt="" className="h-16 w-24" />
            <input
              onChange={handleOnChange}
              value="paypal"
              className="form-check-input mr-3 opacity-0"
              name="paymentMethod"
              type="radio"
              checked={"paypal" === paymentMethod}
            />
          </div>
        </label>
        <label className="form-check-label">
          <div className="form-check woo-next-payment-input-container mt-2">
            <img src="../assets/ApplePay.svg" alt="" className="h-16 w-24" />
            <input
              onChange={handleOnChange}
              value="cod"
              className="form-check-input mr-3 opacity-0"
              name="paymentMethod"
              type="radio"
              checked={"cod" === paymentMethod}
            />
          </div>
        </label>
        <label className="form-check-label relative">
          <div className="form-check woo-next-payment-input-container mt-2 cursor-pointer">
            <img src="../assets/stripe.png" alt="" className="h-16 w-24" />

            <input
              onChange={handleOnChange}
              value="stripe"
              className="form-check-input mr-3 opacity-0"
              name="paymentMethod"
              type="radio"
              checked={"stripe" === paymentMethod}
            />
          </div>
        </label>
      </div> */}
    </div>
  );
};

export default PaymentModes;
