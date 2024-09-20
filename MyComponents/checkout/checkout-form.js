import React, { useEffect, useState } from "react";
import Address from "./user-address";
import {
  handleBillingDifferentThanShipping,
  handleCreateAccount,
  handleOtherPaymentMethodCheckout,
  handleStripeCheckout,
  setStatesForCountry,
} from "@/Utils/checkout";
import CheckboxField from "./form-elements/checkbox-field";
import validateAndSanitizeCheckoutForm from "@/MyComponents/Validator/checkout";
import YourOrder from "./your-order";
import PaymentModes from "./payment-modes";

const shippingMethod = [
  {
    key: 0,
    name: "Standard (3-6 business days)",
    cost: 0,
    shipping_rate_key: "shr_1OhU3yECzMeyksLqvsWQNatz",
  },
  {
    key: 1,
    name: "Priority (1-3 business days)",
    cost: 1000,
    shipping_rate_key: "shr_1OhU4kECzMeyksLqwPsygPER",
  },
];

const defaultState = [
  {
    stateCode: "AL",
    stateName: "Alabama",
  },
  {
    stateCode: "AK",
    stateName: "Alaska",
  },
  {
    stateCode: "AZ",
    stateName: "Arizona",
  },
  {
    stateCode: "AR",
    stateName: "Arkansas",
  },
  {
    stateCode: "CA",
    stateName: "California",
  },
  {
    stateCode: "CO",
    stateName: "Colorado",
  },
  {
    stateCode: "CT",
    stateName: "Connecticut",
  },
  {
    stateCode: "DE",
    stateName: "Delaware",
  },
  {
    stateCode: "DC",
    stateName: "District Of Columbia",
  },
  {
    stateCode: "FL",
    stateName: "Florida",
  },
  {
    stateCode: "GA",
    stateName: "Georgia",
  },
  {
    stateCode: "HI",
    stateName: "Hawaii",
  },
  {
    stateCode: "ID",
    stateName: "Idaho",
  },
  {
    stateCode: "IL",
    stateName: "Illinois",
  },
  {
    stateCode: "IN",
    stateName: "Indiana",
  },
  {
    stateCode: "IA",
    stateName: "Iowa",
  },
  {
    stateCode: "KS",
    stateName: "Kansas",
  },
  {
    stateCode: "KY",
    stateName: "Kentucky",
  },
  {
    stateCode: "LA",
    stateName: "Louisiana",
  },
  {
    stateCode: "ME",
    stateName: "Maine",
  },
  {
    stateCode: "MD",
    stateName: "Maryland",
  },
  {
    stateCode: "MA",
    stateName: "Massachusetts",
  },
  {
    stateCode: "MI",
    stateName: "Michigan",
  },
  {
    stateCode: "MN",
    stateName: "Minnesota",
  },
  {
    stateCode: "MS",
    stateName: "Mississippi",
  },
  {
    stateCode: "MO",
    stateName: "Missouri",
  },
  {
    stateCode: "MT",
    stateName: "Montana",
  },
  {
    stateCode: "NE",
    stateName: "Nebraska",
  },
  {
    stateCode: "NV",
    stateName: "Nevada",
  },
  {
    stateCode: "NH",
    stateName: "New Hampshire",
  },
  {
    stateCode: "NJ",
    stateName: "New Jersey",
  },
  {
    stateCode: "NM",
    stateName: "New Mexico",
  },
  {
    stateCode: "NY",
    stateName: "New York",
  },
  {
    stateCode: "NC",
    stateName: "North Carolina",
  },
  {
    stateCode: "ND",
    stateName: "North Dakota",
  },
  {
    stateCode: "OH",
    stateName: "Ohio",
  },
  {
    stateCode: "OK",
    stateName: "Oklahoma",
  },
  {
    stateCode: "OR",
    stateName: "Oregon",
  },
  {
    stateCode: "PA",
    stateName: "Pennsylvania",
  },
  {
    stateCode: "RI",
    stateName: "Rhode Island",
  },
  {
    stateCode: "SC",
    stateName: "South Carolina",
  },
  {
    stateCode: "SD",
    stateName: "South Dakota",
  },
  {
    stateCode: "TN",
    stateName: "Tennessee",
  },
  {
    stateCode: "TX",
    stateName: "Texas",
  },
  {
    stateCode: "UT",
    stateName: "Utah",
  },
  {
    stateCode: "VT",
    stateName: "Vermont",
  },
  {
    stateCode: "VA",
    stateName: "Virginia",
  },
  {
    stateCode: "WA",
    stateName: "Washington",
  },
  {
    stateCode: "WV",
    stateName: "West Virginia",
  },
  {
    stateCode: "WI",
    stateName: "Wisconsin",
  },
  {
    stateCode: "WY",
    stateName: "Wyoming",
  },
  {
    stateCode: "AA",
    stateName: "Armed Forces (AA)",
  },
  {
    stateCode: "AE",
    stateName: "Armed Forces (AE)",
  },
  {
    stateCode: "AP",
    stateName: "Armed Forces (AP)",
  },
];

const defaultCutomerInfo = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  countries: "",
  country: "US",
  state: "",
  postcode: "",
  email: "",
  phone: "",
  company: "",
  errors: null,
};

const CheckoutForm = ({ countriesData }) => {
  const { billingCountries, shippingCountries } = countriesData || {};
  const initialState = {
    billing: {
      ...defaultCutomerInfo,
    },
    shipping: {
      ...defaultCutomerInfo,
    },
    createAccount: false,
    orderNotes: "",
    billingDifferentThanShipping: false,
    paymentMethod: "stripe",
  };

  const [cart, setCart] = useState(null);

  useEffect(() => {
    const existingCart = localStorage.getItem("forCart");
    if (existingCart) {
      const existingCartItems = JSON.parse(existingCart);
      setCart(existingCartItems);
    }
  }, []);

  const [input, setInput] = useState(initialState);
  const [requestError, setRequestError] = useState(null);
  const [theShippingStates, setTheShippingStates] = useState(defaultState);
  const [theBillingStates, setTheBillingStates] = useState(defaultState);
  const [isFetchingShippingStates, setIsFetchingShippingStates] =
    useState(false);
  const [isFetchingBillingStates, setIsFetchingBillingStates] = useState(false);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [createdOrderData, setCreatedOrderData] = useState({});

  const [selectedShippingOption, setSelectedShippingOption] = useState(
    shippingMethod[0]
  );

  const handleFormSubmit = async (event) => {
    event?.preventDefault();

    /**
     * Validate Billing and Shipping Details
     *
     * Note:
     * 1. If billing is different than shipping address, only then validate billing.
     * 2. We are passing theBillingStates?.length and theShippingStates?.length, so that
     * the respective states should only be mandatory, if a country has states.
     */
    const billingValidationResult = input?.billingDifferentThanShipping
      ? validateAndSanitizeCheckoutForm(
          input?.billing,
          theBillingStates?.length
        )
      : {
          errors: null,
          isValid: true,
        };
    const shippingValidationResult = validateAndSanitizeCheckoutForm(
      input?.shipping,
      theShippingStates?.length
    );

    setInput({
      ...input,
      billing: { ...input.billing, errors: billingValidationResult.errors },
      shipping: { ...input.shipping, errors: shippingValidationResult.errors },
    });

    // If there are any errors, return.
    if (!shippingValidationResult.isValid || !billingValidationResult.isValid) {
      return null;
    }

    // For stripe payment mode, handle the strip payment and thank you.
    if ("stripe" === input.paymentMethod) {
      const createdOrderData = await handleStripeCheckout(
        input,
        cart?.cartItems,
        setRequestError,
        setCart,
        setIsOrderProcessing,
        setCreatedOrderData,
        selectedShippingOption.shipping_rate_key
      );
      return null;
    }

    // For Any other payment mode, create the order and redirect the user to payment url.
    const createdOrderData = await handleOtherPaymentMethodCheckout(
      input,
      cart?.cartItems,
      setRequestError,
      setCart,
      setIsOrderProcessing,
      setCreatedOrderData
    );

    setRequestError(null);
  };

  const handleOnChange = async (
    event,
    isShipping = false,
    isBillingOrShipping = false
  ) => {
    const { target } = event || {};

    if ("createAccount" === target.name) {
      handleCreateAccount(input, setInput, target);
    } else if ("billingDifferentThanShipping" === target.name) {
      handleBillingDifferentThanShipping(input, setInput, target);
    } else if ("shippingOption" === target.name) {
      setSelectedShippingOption(
        shippingMethod.find((item) => Number(item.key) === Number(target.value))
      );
    } else if (isBillingOrShipping) {
      if (isShipping) {
        await handleShippingChange(target);
      } else {
        await handleBillingChange(target);
      }
    } else {
      const newState = { ...input, [target.name]: target.value };
      setInput(newState);
    }
  };

  const handleShippingChange = async (target) => {
    const newState = {
      ...input,
      shipping: { ...input?.shipping, [target.name]: target.value },
    };
    setInput(newState);
    await setStatesForCountry(
      target,
      setTheShippingStates,
      setIsFetchingShippingStates
    );
  };

  const handleBillingChange = async (target) => {
    const newState = {
      ...input,
      billing: { ...input?.billing, [target.name]: target.value },
    };
    setInput(newState);
    await setStatesForCountry(
      target,
      setTheBillingStates,
      setIsFetchingBillingStates
    );
  };

  return (
    <>
      {cart ? (
        <form
          onSubmit={handleFormSubmit}
          id="checkout-form"
          className="woo-next-checkout-form"
        >
          <div className="grid sm:px-10 lg:grid-cols-1 lg:px-20 xl:px-32">
            <div className="max-w-3xl justify-self-center mt-10 shadow-md px-4 pt-8 lg:mt-0">
              <p className="text-2xl font-medium pb-4">Payment Details</p>
              <p className="text-gray-400">
                Complete your order by providing your payment details.
              </p>

              {/* Shipping Details */}
              <div>
                <Address
                  states={theShippingStates}
                  countries={shippingCountries}
                  input={input?.shipping}
                  handleOnChange={(event) => handleOnChange(event, true, true)}
                  isFetchingStates={isFetchingShippingStates}
                  isShipping
                />
              </div>

              {/* Shipping Method */}
              <div className="py-4">
                <p className="text-base font-medium pb-4">Shipping Method</p>
                <div className="flex flex-col gap-2">
                  {shippingMethod.map((item, index) => (
                    <label className="cursor-pointer flex justify-between">
                      <div className="flex items-center">
                        <input
                          onChange={handleOnChange}
                          type="radio"
                          checked={selectedShippingOption.key === item.key}
                          value={item.key}
                          name="shippingOption"
                        ></input>
                        <span className="ml-2">{item.name || ""}</span>
                      </div>
                      <span className="font-medium">
                        {item.cost <= 0
                          ? "Free"
                          : `$${(item.cost / 100).toFixed(2)}`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <CheckboxField
                  name="billingDifferentThanShipping"
                  type="checkbox"
                  checked={input?.billingDifferentThanShipping}
                  handleOnChange={handleOnChange}
                  label="Billing different than shipping"
                  containerClassNames="mb-4 pt-4"
                />
              </div>

              {/* Billing Details */}
              {input?.billingDifferentThanShipping ? (
                <div className="billing-details">
                  <h2 className="text-xl font-medium mb-4">Billing Details</h2>
                  <Address
                    states={theBillingStates}
                    countries={
                      billingCountries.length
                        ? billingCountries
                        : shippingCountries
                    }
                    input={input?.billing}
                    handleOnChange={(event) =>
                      handleOnChange(event, false, true)
                    }
                    isFetchingStates={isFetchingBillingStates}
                    isShipping={false}
                    isBillingOrShipping
                  />
                </div>
              ) : null}

              {/* Order & Payments */}
              <div className="your-orders pt-4">
                {/* Order */}
                <h2 className="text-xl font-medium mb-4">Your Order</h2>
                <YourOrder
                  cart={cart}
                  shippingCost={(selectedShippingOption.cost / 100).toFixed(2)}
                />

                {/* Payment */}
                <PaymentModes
                  input={input}
                  handleOnChange={handleOnChange}
                  onClick={handleFormSubmit}
                  handleFormSubmit={handleFormSubmit}
                />

                {/* Checkout Loading */}
                {isOrderProcessing && <p>Processing Order...</p>}
              </div>
            </div>
          </div>
        </form>
      ) : null}
    </>
  );
};

export default CheckoutForm;
