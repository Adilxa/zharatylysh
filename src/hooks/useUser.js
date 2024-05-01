import { useState } from "react";
import $api from "@/api/http";

const useUser = () => {
  const [isLoading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  const getMe = async () => {
    const id = localStorage.getItem("key");
    setLoading(true);
    try {
      const res = await $api.get("/user/" + id);
      setUser(res.data);
      setLoading(false);
      return res.data;
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const updateMe = async (data) => {
    const id = localStorage.getItem("key");
    try {
      const res = await $api.patch("/user/" + id, data); // Correctly using axios.patch
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  //   const SignUp = async ({ email, password, role }) => {
  //     setLoading(true);

  //     try {
  //       const res = await AuthService.signUp(email, password, role)
  //         .then((res) => localStorage.setItem("key", res.data.id))
  //         .finally(() => router.replace("/"));

  //       return res;
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  return {
    isLoading,
    user,
    getMe,
    updateMe,
    setLoading,
  };
};

export default useUser;
