import HomePage from "@/components/HomePage";
import Head from 'next/head';
import CheckoutForm from '@/components/CheckoutForm';

export default function Home() {
  return (
    <>

      
      <HomePage />

      <main>
        <h1>Stripe Payment Example</h1>
        <CheckoutForm />
      </main>

    </>
  );
}
