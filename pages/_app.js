import { useEffect, useState } from "react";
import Layout from "../componentss/layouts";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import AppProvider from "@/componentss/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
useRouter;

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const Router = useRouter();

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    Router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  }, [Router.query]);

  return (
    <>
      <LoadingBar
        color="#000"
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer />
      {/* <Layout> */}
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
      {/* </Layout> */}
    </>
  );
}
