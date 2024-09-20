import "@/styles/globals.css";
import Header from "@/MyComponents/Header";
import Footer from "@/MyComponents/Footer";

export default function Layout({ children, headerFooter }) {
  const { header, footer } = headerFooter || {};
  return (
    <>
      <Header header={header} />
      <main className="w-full overflow-hidden">{children}</main>
      <Footer />
    </>
  );
}
