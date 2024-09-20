import { useState, useEffect, useContext } from "react";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import Layout from "@/componentss/layouts";
import Loading from "@/componentss/loading";
import Bag from "@/componentss/icons/Bag";
import { AppContext } from "@/componentss/context";

const ThankYouContent = () => {
  const [cart, setCart] = useContext(AppContext);
  const [isSessionFetching, setSessionFetching] = useState(false);
  const [sessionData, setSessionData] = useState({});
  const session_id =
    typeof window !== "undefined" ? Router.query.session_id : null;

  useEffect(() => {
    setSessionFetching(true);
    if (typeof window !== "undefined") {
      localStorage.removeItem("forCart");
      setCart(null);

      if (session_id) {
        axios
          .get(`/api/get-stripe-session/?session_id=${session_id}`)
          .then((response) => {
            setSessionData(response?.data ?? {});
            setSessionFetching(false);
          })
          .catch((error) => {
            console.error(error);
            setSessionFetching(false);
          });
      }
    }
  }, [session_id]);

  return (
    <div className="mx-auto w-[50%] text-center">
      <div className=" mt-10 m-auto flex items-center justify-center flex-col">
        {isSessionFetching ? (
          <Loading />
        ) : (
          <>
            <h2 className="mb-6 text-xl">
              <Bag className="inline-block mr-1" />{" "}
              <span>Thank you for placing the order.</span>
            </h2>

            <Link
              href="/shop"
              className="bg-purple-600 text-white px-5 py-3 rounded-sm flex items-center justify-center w-44"
            >
              Shop more
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default function ThankYou({ headerFooter }) {
  return (
    <Layout headerFooter={headerFooter || {}}>
      <ThankYouContent />
    </Layout>
  );
}
