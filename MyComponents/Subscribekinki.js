import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Subscribekinki = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    setEmail(event.target.value);
    setIsValid(true);
  };

  const onClickSend = () => {
    if (validateEmail(email)) {
      axios
        .post("/api/subscribe", { email: email })
        .then((res) => {
          if (res.status === 200) {
            setEmail("");
            // toast.success("Please confirm your subscription with email."); // case of Double opt-in
            toast.success("Subscribed!"); // case of Single opt-in
          } else {
            toast.error("Failed");
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed");
        });
    } else {
      setIsValid(false);
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  return (
    <div className="pb-8 md:py-13 px-2">
      <h1 className="tracking-widest text-xl md:text-4xl font-semibold uppercase text-center">
        Subscribe, Get KINKI
      </h1>
      <div className="text-center py-5">
        <div className="md:w-96 mx-auto flex bg-white p-6 rounded-lg shadow-md shadow-gray-400">
          <div className="w-3/4 flex">
            <input
              type="text"
              placeholder="Add your email here"
              className="px-5 py-3 w-full outline-none rounded-l-lg"
              value={email}
              onChange={(event) => handleChange(event)}
            />
            {!isValid && (
              <span className="absolute mt-[50px] ml-2 text-sm text-red-500">
                Invalid email address
              </span>
            )}
          </div>
          <button
            className="px-5 py-3 bg-black text-white duration-200 hover:bg-white border border-black hover:text-black w-1/4 rounded-r-lg"
            onClick={() => onClickSend()}
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribekinki;
