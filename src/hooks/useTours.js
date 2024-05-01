import React, { useState } from "react";
import $api from "@/api/http";

const useTours = () => {
  const [tours, setTours] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const getTours = async () => {
    setLoading(true);
    try {
      const res = await $api.get("/tour");
      setTours(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return {
    getTours,
    tours,
    isLoading,
  };
};

export default useTours;
