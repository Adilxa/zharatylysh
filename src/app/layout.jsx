"use client"
import { Montserrat } from "next/font/google";
import Head from "next/head";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { GoogleAnalytics } from '@next/third-parties/google'

const montserrat = Montserrat({
  weight: ["400", "500", "600", "300", "100", "700"],
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const stripePromise = loadStripe('pk_test_51PMkfuBW0LwhajamdUs4Ih8OBBuqDXta6FmWUSfllgbf3qjNOWU6JIHi4cX3kVAkwsj7CRAkDluRYHJJ2aDKmnok00eHJPLw9B');

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
        <Elements stripe={stripePromise}>
          {children}
        </Elements>
        <ToastContainer />
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-3S6ZYM7VP6"/>
    </html>
  );
}