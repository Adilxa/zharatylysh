import $api from "@/api/http";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
const useTours = () => {
  const [tours, setTours] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [criteries, setCriteries] = useState([]);
  const [filteredTours, setFilteredTours] = useState(null);
  // const searchParams = useSearchParams();
  // const search = searchParams.get("filter");

  const getTours = async () => {
    setLoading(true);
    try {
      const res = await $api.get("/tour");
      setTours(res?.data);
      const arr = res?.data.map((el) => el["location"]);
      setCriteries(arr);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const getByCriteries = (search) => {
    if (!tours) return;
    const filtered = tours.filter((tour) => tour.location === search);
    console.log(filtered);
    setFilteredTours(filtered);
  };

  return {
    getTours,
    getByCriteries,
    setFilteredTours,
    tours,
    isLoading,
    criteries,
    filteredTours,
  };
};

export default useTours;
