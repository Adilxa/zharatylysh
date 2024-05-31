import { Montserrat } from "next/font/google";
import Head from "next/head";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const montserrat = Montserrat({
  weight: ["400", "500", "600", "300", "100", "700"],
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Zharatylysh Travel</title>
        <meta name="description" content="Your website description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./icon.svg" />
      </Head>
      <body className={montserrat.className}>
        <Header />
        {children}
        <ToastContainer />
        <Footer />
      </body>
    </html>
  );
}