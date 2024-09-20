import PropTypes from "prop-types";
const { default: InputField } = require("./form-elements/input-field");
const { default: CountrySelection } = require("./country-selection");
const { default: StateSelection } = require("./states-selection");

const Address = ({
  input,
  countries,
  states,
  handleOnChange,
  isFetchingStates,
  isShipping,
}) => {
  const { errors } = input || {};

  return (
    <>
      <div className="flex flex-wrap overflow-hidden px-0 w-full">
        <InputField
          name="firstName"
          inputValue={input?.firstName}
          required
          handleOnChange={handleOnChange}
          label="First name"
          errors={errors}
          isShipping={isShipping}
          containerClassNames="w-full overflow-hidden sm:my-2 sm:pr-1 md:w-2/4"
        />
        <InputField
          name="lastName"
          inputValue={input?.lastName}
          required
          handleOnChange={handleOnChange}
          label="Last name"
          errors={errors}
          isShipping={isShipping}
          containerClassNames="w-full overflow-hidden sm:my-2 md:w-2/4"
        />
      </div>
      <div className="flex flex-wrap overflow-hidden px-0 w-full">
        <InputField
          name="email"
          type="email"
          inputValue={input?.email}
          required
          handleOnChange={handleOnChange}
          label="Email"
          errors={errors}
          isShipping={isShipping}
          containerClassNames="w-full overflow-hidden sm:my-2 sm:pr-1 md:w-2/4"
        />
        <InputField
          name="phone"
          inputValue={input?.phone}
          required
          handleOnChange={handleOnChange}
          label="Phone"
          errors={errors}
          isShipping={isShipping}
          containerClassNames="w-full overflow-hidden sm:my-2 md:w-2/4"
        />
      </div>
      {/* Country Selection*/}
      <CountrySelection
        input={input}
        handleOnChange={handleOnChange}
        countries={countries}
        isShipping={isShipping}
      />
      {/* State */}
      <StateSelection
        input={input}
        handleOnChange={handleOnChange}
        states={states}
        isShipping={isShipping}
        isFetchingStates={isFetchingStates}
      />
      <div className="flex flex-wrap overflow-hidden px-0 w-full">
        <InputField
          name="address1"
          inputValue={input?.address1}
          required
          handleOnChange={handleOnChange}
          label="Street address"
          placeholder="House number and street name"
          errors={errors}
          isShipping={isShipping}
          containerClassNames="w-full overflow-hidden sm:my-2 sm:pr-1 md:w-2/4"
        />
        <InputField
          name="address2"
          inputValue={input?.address2}
          handleOnChange={handleOnChange}
          label="Street address line two (Optional)"
          placeholder="Apartment floor unit building floor etc"
          errors={errors}
          isShipping={isShipping}
          containerClassNames="w-full overflow-hidden sm:my-2 md:w-2/4"
        />
      </div>
      <div className="flex flex-wrap overflow-hidden px-0 w-full">
        <InputField
          name="city"
          required
          inputValue={input?.city}
          handleOnChange={handleOnChange}
          label="Town/City"
          errors={errors}
          isShipping={isShipping}
          containerClassNames="w-full overflow-hidden sm:my-2 sm:pr-1 md:w-2/4"
        />
        <InputField
          name="postcode"
          inputValue={input?.postcode}
          required
          handleOnChange={handleOnChange}
          label="Post code"
          errors={errors}
          isShipping={isShipping}
          containerClassNames="w-full overflow-hidden sm:my-2 md:w-2/4"
        />
      </div>
    </>
  );
};

Address.propTypes = {
  input: PropTypes.object,
  countries: PropTypes.array,
  handleOnChange: PropTypes.func,
  isFetchingStates: PropTypes.bool,
  isShipping: PropTypes.bool,
};

Address.defaultProps = {
  input: {},
  countries: [],
  handleOnChange: () => null,
  isFetchingStates: false,
  isShipping: false,
};

export default Address;
