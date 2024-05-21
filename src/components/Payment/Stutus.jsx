import React, { useState, useEffect } from 'react';
import md5 from 'md5';

const PaymentStatus = ({ orderId, merchantId, paymentId, salt, secretKey }) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const signatureString = `get_status3.php;${merchantId};${orderId};${paymentId};${salt};${secretKey}`;
      const signature = md5(signatureString);

      const formData = new FormData();
      formData.append('pg_order_id', "321321312");
      formData.append('pg_merchant_id', "554252");
      formData.append('pg_payment_id', paymentId);
      formData.append('pg_salt', salt);
      formData.append('pg_sig', signature);

      try {
        const response = await fetch('https://api.freedompay.kz/get_status3.php', {
          method: 'POST',
          body: formData
        });

        const responseText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseText, 'application/xml');

        const pgStatus = xmlDoc.getElementsByTagName('pg_status')[0]?.textContent;
        const pgPaymentStatus = xmlDoc.getElementsByTagName('pg_payment_status')[0]?.textContent;

        setStatus({ pgStatus, pgPaymentStatus });
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    fetchStatus();
  }, [orderId, merchantId, paymentId, salt, secretKey]);

  if (!status) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Payment Status</h1>
      <p>Order ID: {orderId}</p>
      <p>Payment Status: {status.pgStatus}</p>
      <p>Payment Result: {status.pgPaymentStatus}</p>
    </div>
  );
};

export default PaymentStatus;
