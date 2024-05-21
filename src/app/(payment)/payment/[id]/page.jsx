import PaymentTourUi from "./PaymentTourUi";
import $api from "@/api/http";

async function getPayment(id) {
    const res = await $api.get(`tour/${id}`)
    return res.data
}

export default async function PaymentTour({ params: { id } }) {


    const res = await getPayment(id)

    return (
        <PaymentTourUi tour={res}/>
    );
}

