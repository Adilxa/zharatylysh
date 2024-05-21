"use client"
import React from "react";
import scss from "./payment.module.scss"
import { useRouter } from "next/navigation";

const PaymentButton =({price , id}) =>{

  const router = useRouter()
  let priceWithProcent = price + price * 0.029

  const onClickPay = () => {
    router.push("/payment/" + id)
  }

 return (
  <section className="container flex  justify-center items-center mx-auto">
    <button onClick={onClickPay} className={scss.button}>
      Pay for tour {priceWithProcent}c
    </button>
  </section>
 )
}

export default PaymentButton